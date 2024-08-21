import { marked } from "marked";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";

import routePaths from "Private/config/routePaths";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextArea from "App/core/hook-form/FormTextArea";
import FormTextField from "App/core/hook-form/FormTextField";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import { rewardOnEnums, rewardOnOptions } from "./data/rewardOnEnums";
import FormDateTimePicker from "App/core/hook-form/FormDateTimePicker";
import attributeFamilyActions from "Private/features/attributeFamily/attributeFamilyActions";

import TriggerForm from "./TriggerForm";
import { rewardTypeOptions } from "./data/rewardTypeEnums";
import { campaignStatusOptions } from "./data/campaignStatus";
import { campaignEventTypes } from "./data/campaignEventTypesEnums";
import countryActions from "Private/features/countries/countryActions";
import { displayMechanismsOptions } from "./data/displayMechanismEnums";
import { campaignCodesOptions, campaignCodes } from "./data/campaignCodes";
import { campaignTriggerCriteriaOptions } from "./data/campaignTriggerCriteria";
import { triggerAttributeTypes, triggerAttributeTypesOptionsDisabled } from "./data/triggerAttributeTypesEnums";

const CellContainer = styled(Box)(() => ({
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    div: {
        flex: 1,
    },
}));

export default function PromoCodeForm({ isLoading, handleSubmit }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { response } = useSelector((state) => state.get_countries);

    const { response: getAttributeFamilyList } = useSelector((state) => state.get_attribute_family_list);

    const mappedAttributeList =
        getAttributeFamilyList?.data?.data?.map((item) => ({
            label: item.attributeName,
            value: item.attributeFamilyId,
        })) ?? [];

    const initialTriggerValue = mappedAttributeList.length > 0 ? mappedAttributeList[0].value : 0;

    useEffect(() => {
        dispatch(countryActions.get_countries());
    }, [dispatch]);

    useEffect(() => {
        dispatch(attributeFamilyActions.get_attribute_family_list());
    }, [dispatch]);

    const countryData = response?.data?.map((c) => ({ value: c.iso3, label: c.country }));

    const countryCurrency = response?.data?.map((c) => ({ value: c.currency, label: c.currency }));

    const methods = useForm({
        defaultValues: {
            campaign: {
                campaignName: "",
                campaignType: campaignCodes.PROMO,
                validCountry: "",
                startDate: "",
                endDate: "",
                status: 0,
                budget: 0,
            },
            trigger: [],
            triggerReferrer: [],
            reward: [
                {
                    minimumAmount: 0,
                    maximumAmount: 0,
                    rewardOn: rewardOnEnums.SERVICE_CHARGE,
                    rewardType: 0,
                    rewardValue: 0,
                    rewardLimit: 0,
                },
            ],
        },
    });

    const { watch, setValue } = methods;

    const campaignType = watch("campaign.campaignType");
    const campaign = watch("campaign");

    const getDefaultCriteria = (attributeFamilyTypeId) => {
        switch (attributeFamilyTypeId) {
            case campaignEventTypes.DATE:
                return triggerAttributeTypes.GREATER_THAN;
            case campaignEventTypes.DATE_RANGE:
                return triggerAttributeTypes.BETWEEN;
            default:
                return triggerAttributeTypes.ON_SAME_DAY;
        }
    };

    useEffect(() => {
        if (campaignType === campaignCodes.PROMO) {
            setValue("trigger", [
                {
                    attribute: campaignEventTypes.DATE,
                    currency: "",
                    amount: 0,
                },
            ]);
            setValue("triggerReferrer", []);
        } else if (campaignType === campaignCodes.REFERRAL) {
            setValue("triggerReferrer", [
                {
                    referrerneedkyc: true,
                    referrerleasttransactions: 0,
                    refereeneedkyc: true,
                    refereeleasttransactions: 0,
                    minimumreferrer: 0,
                    kycverifyingdays: 0,
                },
            ]);
            setValue("trigger", []);
        }
    }, [campaign.campaignType, campaignCodes, initialTriggerValue, setValue]);

    const { control } = methods;

    const {
        fields: triggerFields,
        append: addTriggerFields,
        remove: removeTriggerFields,
    } = useFieldArray({
        control,
        name: "trigger",
    });

    const {
        fields: rewardFields,
        append: addRewardFields,
        remove: removeRewardFields,
    } = useFieldArray({
        control,
        name: "reward",
    });

    const {
        fields: triggerReferrerFields,
        append: addtriggerReferrerFields,
        remove: removetriggerReferrerFields,
    } = useFieldArray({
        control,
        name: "triggerReferrer",
    });

    const onSubmit = (data) => {
        const { campaignType } = data.campaign;

        const formattedData = {
            campaign: {
                campaignName: data.campaign.campaignName,
                campaignType: data.campaign.campaignType,
                validCountry: data.campaign.validCountry,
                startDate: data.campaign.startDate,
                endDate: data.campaign.endDate,
                status: data.campaign.status,
                budget: +data.campaign.budget,
            },

            reward: data.reward.map((field) => ({
                minimumAmount: field.minimumAmount,
                maximumAmount: field.maximumAmount,
                rewardOn: field.rewardOn,
                rewardType: field.rewardType,
                rewardValue: field.rewardValue,
                rewardLimit: field.rewardLimit,
            })),

            displayMechanism: data.displayMechanism,
            limitPerUser: data.limitPerUser,
            limitPerPromo: data.limitPerPromo,
            termsAndCondition: marked(data.termsAndCondition),
            triggerCriteria: data.triggerCriteria,
            webImage: data.webImage,
            mobileImage: data.mobileImage,
            description: data.description,
        };

        if (campaignType === campaignCodes.PROMO) {
            formattedData.trigger = data.trigger.map((field) => {
                return {
                    attribute: field.attribute,
                    criteria: field.criteria,
                    currency: field.currency,
                    amount: field.amount,
                };
            });
        }

        if (campaignType === campaignCodes.REFERRAL) {
            formattedData.triggerReferrer = data.triggerReferrer.map((field) => ({
                referrerneedkyc: field.referrerneedkyc,
                referrerleasttransactions: field.referrerleasttransactions,
                refereeneedkyc: field.refereeneedkyc,
                refereeleasttransactions: field.refereeleasttransactions,
            }));
        }

        handleSubmit(formattedData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container>
                    {/* CAMPAIGN FIELDS */}

                    <Grid container spacing="16px">
                        <Grid item xs={12} md={6} lg={3}>
                            <FormTextField name="campaign.campaignName" label="Campaign Name" required />
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormSelect
                                type="number"
                                name="campaign.campaignType"
                                label="Campaign Type"
                                options={campaignCodesOptions}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormSelect
                                type="number"
                                name="campaign.status"
                                label="Status"
                                options={campaignStatusOptions}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormSelect
                                name="campaign.validCountry"
                                label="Valid Country"
                                options={countryData}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormDateTimePicker name="campaign.startDate" label="Start Date Time" />

                            {/* <FormTextField name="campaign.startDate" label="Start Date Time" /> */}
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormDateTimePicker name="campaign.endDate" label="End Date Time" />

                            {/* <FormTextField name="campaign.endDate" label="End Date Time" /> */}
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormTextField type="number" name="campaign.budget" label="Budget in" />
                        </Grid>
                    </Grid>

                    <Divider />

                    {/* TRIGGER FIELDS */}
                    {campaign.campaignType === campaignCodes.PROMO ? (
                        <Grid item xs={12}>
                            {/* <Grid marginTop={3} marginBottom={2} item xs={12}>
                                <Typography variant="h6">Trigger</Typography>
                            </Grid> */}

                            <Grid marginTop={3} marginBottom={2} display="flex">
                                <Grid item xs={12}>
                                    <Typography variant="h6">Trigger</Typography>
                                </Grid>
                                <Grid item xs={12} md={6} lg={3}>
                                    <FormSelect
                                        options={campaignTriggerCriteriaOptions}
                                        name="triggerCriteria"
                                        label="Trigger Criteria"
                                        required
                                    />
                                </Grid>
                            </Grid>

                            {triggerFields.map((field, index) => {
                                return (
                                    <Grid container key={field.id}>
                                        <TriggerForm
                                            index={index}
                                            mappedAttributeList={mappedAttributeList}
                                            triggerAttributeTypesOptionsDisabled={triggerAttributeTypesOptionsDisabled}
                                            countryCurrency={countryCurrency}
                                            allAttributeList={getAttributeFamilyList?.data?.data}
                                        />

                                        <Grid item xs={12}>
                                            <ButtonWrapper>
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="primary"
                                                    onClick={() =>
                                                        addTriggerFields({
                                                            attribute: field.attribute,
                                                            criteria: field.criteria,
                                                            currency: field.currency,
                                                            amount: field.amount,
                                                        })
                                                    }
                                                >
                                                    Add
                                                </Button>

                                                {index > 0 ? (
                                                    <Button
                                                        onClick={() => removeTriggerFields(index)}
                                                        variant="outlined"
                                                        size="small"
                                                        color="error"
                                                    >
                                                        Remove
                                                    </Button>
                                                ) : (
                                                    <Button variant="outlined" size="small" color="error" disabled>
                                                        Remove
                                                    </Button>
                                                )}
                                            </ButtonWrapper>
                                        </Grid>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    ) : campaign.campaignType === campaignCodes.REFERRAL ? (
                        <Grid container spacing={2}>
                            <Grid marginTop={3} marginBottom={2} item xs={12}>
                                <Typography variant="h6">Trigger Configuration</Typography>
                            </Grid>
                            {triggerReferrerFields.map((field, index) => (
                                <Grid container spacing={2} item key={`${field.id}_field`}>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormSelect
                                            label="Referrer Need KYC?"
                                            name={`triggerReferrer.${index}.referrerneedkyc`}
                                            options={[
                                                { value: true, label: "True" },
                                                { value: false, label: "False" }, // Fix typo
                                            ]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormTextField
                                            type="number"
                                            label="Referrer Least Transactions"
                                            name={`triggerReferrer.${index}.referrerleasttransactions`}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormSelect
                                            label="Referee Need KYC?"
                                            name={`triggerReferrer.${index}.refereeneedkyc`}
                                            options={[
                                                { value: true, label: "True" },
                                                { value: false, label: "False" }, // Fix typo
                                            ]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormTextField
                                            type="number"
                                            label="Referee Least Transactions"
                                            name={`triggerReferrer.${index}.refereeleasttransactions`}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormTextField
                                            type="number"
                                            label="Minimum Referrer"
                                            name={`triggerReferrer.${index}.minimumreferrer`}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={3}>
                                        <FormTextField
                                            type="number"
                                            label="KYC Verifying Days"
                                            name={`triggerReferrer.${index}.kycverifyingdays`}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ButtonWrapper>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                onClick={() => {
                                                    addtriggerReferrerFields({
                                                        referrerneedkyc: "",
                                                        referrerleasttransactions: 0,
                                                        refereeneedkyc: "",
                                                        refereeleasttransactions: 0,
                                                        minimumreferrer: 0,
                                                        kycverifyingdays: 0,
                                                    });
                                                }}
                                            >
                                                Add Condition
                                            </Button>
                                            {index > 0 ? (
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="error"
                                                    onClick={() => removetriggerReferrerFields(index)}
                                                >
                                                    <ClearOutlinedIcon />
                                                </Button>
                                            ) : (
                                                <Button variant="contained" size="small" color="error" disabled>
                                                    <ClearOutlinedIcon />
                                                </Button>
                                            )}
                                        </ButtonWrapper>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    ) : null}

                    {/* Reward Configuration */}

                    <Grid item xs={12}>
                        <Grid marginTop={3} marginBottom={2} display="flex">
                            <Grid item xs={12}>
                                <Typography variant="h6">Reward Configuration </Typography>
                            </Grid>
                        </Grid>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell width={450}>Minimum Amount</TableCell>
                                    <TableCell width={450}>Maximum Amount</TableCell>
                                    <TableCell width={450}>Reward On</TableCell>
                                    <TableCell width={450}>Reward Type</TableCell>
                                    <TableCell width={450}>Value</TableCell>
                                    <TableCell width={450}>Limit</TableCell>
                                    <TableCell width={200}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rewardFields.map((field, index) => (
                                    <TableRow key={`${field.id}_field`}>
                                        <TableCell>
                                            <CellContainer>
                                                <FormTextField
                                                    label="Minimum Amount"
                                                    type="number"
                                                    name={`reward.${index}.minimumAmount`}
                                                    required
                                                />
                                            </CellContainer>
                                        </TableCell>

                                        <TableCell>
                                            <CellContainer>
                                                <FormTextField
                                                    label="Maximum Amount"
                                                    type="number"
                                                    name={`reward.${index}.maximumAmount`}
                                                    required
                                                />
                                            </CellContainer>
                                        </TableCell>

                                        <TableCell>
                                            <CellContainer>
                                                <FormSelect
                                                    name={`reward.${index}.rewardOn`}
                                                    options={rewardOnOptions}
                                                />
                                            </CellContainer>
                                        </TableCell>

                                        <TableCell>
                                            <CellContainer>
                                                <FormSelect
                                                    name={`reward.${index}.rewardType`}
                                                    options={rewardTypeOptions}
                                                />
                                            </CellContainer>
                                        </TableCell>

                                        <TableCell>
                                            <CellContainer>
                                                <FormTextField
                                                    label="Value"
                                                    type="number"
                                                    name={`reward.${index}.rewardValue`}
                                                />
                                            </CellContainer>
                                        </TableCell>

                                        <TableCell>
                                            <CellContainer>
                                                <FormTextField
                                                    label="Limit"
                                                    type="number"
                                                    name={`reward.${index}.rewardLimit`}
                                                />
                                            </CellContainer>
                                        </TableCell>

                                        <TableCell>
                                            <CellContainer
                                                sx={{
                                                    gap: 2,
                                                }}
                                            >
                                                {index > 0 ? (
                                                    <Button
                                                        size="small"
                                                        color="error"
                                                        variant="contained"
                                                        onClick={() => removeRewardFields(index)}
                                                    >
                                                        <CloseOutlinedIcon />
                                                    </Button>
                                                ) : (
                                                    <Button size="small" color="error" variant="contained" disabled>
                                                        <CloseOutlinedIcon />
                                                    </Button>
                                                )}
                                            </CellContainer>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <Button
                                onClick={() =>
                                    addRewardFields({
                                        minimumAmount: 0,
                                        maximumAmount: 0,
                                        rewardOn: 0,
                                        rewardType: 0,
                                        rewardValue: 0,
                                        rewardLimit: 0,
                                    })
                                }
                                sx={{
                                    marginTop: 2,
                                }}
                                variant="contained"
                                size="large"
                            >
                                <AddOutlinedIcon fontSize="medium" />
                            </Button>
                        </Table>
                    </Grid>

                    {/* Last Part */}

                    <Grid container spacing={2} marginY={2}>
                        <Grid item xs={12} md={4} lg={3}>
                            <FormSelect
                                name="displayMechanism"
                                label="Display Mechanism"
                                options={displayMechanismsOptions}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} md={4} lg={4}>
                            <FormTextField type="number" name="limitPerUser" label="Limit Per User" />
                        </Grid>

                        <Grid item xs={12} md={4} lg={4}>
                            <FormTextField type="number" name="limitPerPromo" label="Limit Per Promo" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginY={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <FormTextArea name="description" label="Description" />
                        </Grid>

                        <Grid
                            sx={{
                                display: "flex",
                                textAlign: "center",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            item
                            xs={12}
                            md={6}
                            lg={6}
                        >
                            <Grid container spacing={2} direction="column">
                                <Grid item>
                                    <FormTextField name="webImage" label="Web Image" type="text" />
                                </Grid>
                                <Grid item>
                                    <FormTextField name="mobileImage" label="Mobile Image" type="text" />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <FormTextArea name="termsAndCondition" label="Terms and Conditions" required />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWrapper>
                            <CancelButton onClick={() => navigate(routePaths.ListPromoCode)}>Cancel</CancelButton>
                            <SubmitButton type="submit" disabled={isLoading}>
                                Submit
                            </SubmitButton>
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
}
