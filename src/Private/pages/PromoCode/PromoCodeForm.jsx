import { marked } from "marked";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { rewardTypeOptions } from "./data/rewardTypeEnums";
import { campaignStatusOptions } from "./data/campaignStatus";
import { campaignEventTypes } from "./data/campaignEventTypesEnums";
import countryActions from "Private/features/countries/countryActions";
import { createPromoCodeSchema } from "./schema/createPromoCodeSchema";
import { updatePromoCodeSchema } from "./schema/updatePromoCodeSchema";
import { displayMechanismsOptions } from "./data/displayMechanismEnums";
import { campaignCodesOptions, campaignCodes } from "./data/campaignCodes";
import { campaignTriggerCriteriaOptions } from "./data/campaignTriggerCriteria";
import { FormHelperText, FormLabel } from "@mui/material";
import FormFileField from "App/core/hook-form/FormFileField";
import { triggerAttributeTypes } from "./data/triggerAttributeTypesEnums";
import isEmpty from "App/helpers/isEmpty";

const CellContainer = styled(Box)(() => ({
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    div: {
        flex: 1,
    },
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: "green",
    },
    "&:hover": {
        backgroundColor: "red",
        cursor: "pointer",
    },
}));

export default function PromoCodeForm({ isSubmitting = false, handleSubmit, initialValues, isAddMode }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

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
        defaultValues: isAddMode
            ? {
                  Campaign: {
                      CampaignName: "",
                      CampaignType: campaignCodes.PROMO,
                      ValidCountry: "",
                      StartDate: "",
                      EndDate: "",
                      Status: 0,
                      Budget: 0,
                  },
                  AttributeConditions: [
                      {
                          attribute: campaignEventTypes.BIRTH_DATE,
                          criteria: triggerAttributeTypes.ON_SAME_DAY,
                          currency: "",
                          amount: 0,
                      },
                  ],
                  ReferralFamilyCondition: [
                      {
                          referrerneedkyc: true,
                          referrerleasttransactions: 0,
                          refereeneedkyc: true,
                          refereeleasttransactions: 0,
                          minimumreferrer: 0,
                          kycverifyingdays: 0,
                      },
                  ],
                  Rewards: [
                      {
                          minimumAmount: 0,
                          maximumAmount: 0,
                          rewardOn: rewardOnEnums.SERVICE_CHARGE,
                          rewardType: 0,
                          rewardValue: 0,
                          rewardLimit: 0,
                      },
                  ],
                  LimitPerUser: 0,
                  LimitPerPromo: 0,
                  TermsAndCondition: "",
                  WebImage: "",
                  MobileImage: "",
                  Description: "",
              }
            : {
                  TriggerCriteria: initialValues?.TriggerCriteria || [],
                  ReferralFamilyCondition: initialValues?.ReferralFamilyCondition || [],
                  Rewards: initialValues?.Rewards || [
                      {
                          minimumAmount: initialValues?.minimumAmount || 0,
                          maximumAmount: initialValues?.maximumAmount || 0,
                          rewardOn: initialValues?.rewardOnEnums?.SERVICE_CHARGE || rewardOnEnums?.SERVICE_CHARGE,
                          rewardType: initialValues?.rewardType || 0,
                          rewardValue: initialValues?.rewardValue || 0,
                          rewardLimit: initialValues?.rewardLimit || 0,
                      },
                  ],
              },
        //  resolver: yupResolver(isAddMode ? createPromoCodeSchema : updatePromoCodeSchema),
        mode: "onSubmit",
    });

    const {
        watch,
        setValue,
        reset,
        control,
        formState: { errors },
    } = methods;

    useEffect(() => {
        reset();
    }, []);

    useEffect(() => {
        if (!isAddMode) {
            setValue("Campaign.CampaignName", initialValues?.CampaignName || "");
            setValue("Campaign.CampaignType", initialValues?.CampaignType || campaignCodes.PROMO);
            setValue("Campaign.ValidCountry", initialValues?.ValidCountry || "");
            setValue("Campaign.StartDate", initialValues?.StartDate || "");
            setValue("Campaign.EndDate", initialValues?.EndDate || "");
            setValue("Campaign.Status", initialValues?.Status || "");
            setValue("Campaign.Budget", initialValues?.Budget || "");
            setValue("LimitPerUser", initialValues?.LimitPerUser || "");
            setValue("LimitPerPromo", initialValues?.LimitPerPromo || "");
            setValue("TermsAndCondition", initialValues?.TermsAndCondition || "");
            setValue("WebImage", initialValues?.WebImage || "");
            setValue("MobileImage", initialValues?.MobileImage || "");
            setValue("Description", initialValues?.Description || "");
        }
    }, [initialValues]);

    const CampaignType = watch("Campaign.CampaignType");
    const Campaign = watch("Campaign");

    useEffect(() => {
        if (CampaignType === campaignCodes.PROMO) {
            setValue("AttributeConditions");
        } else if (CampaignType === campaignCodes.REFERRAL) {
            setValue("ReferralFamilyCondition");
        }
    }, [Campaign?.CampaignType, campaignCodes, initialTriggerValue, setValue, location.pathname]);

    const {
        fields: triggerFields,
        append: addTriggerFields,
        remove: removeTriggerFields,
    } = useFieldArray({
        control,
        name: "AttributeConditions",
    });

    const {
        fields: rewardFields,
        append: addRewardFields,
        remove: removeRewardFields,
    } = useFieldArray({
        control,
        name: "Rewards",
    });

    const {
        fields: triggerReferrerFields,
        append: addtriggerReferrerFields,
        remove: removetriggerReferrerFields,
    } = useFieldArray({
        control,
        name: "ReferralFamilyCondition",
    });

    const onSubmit = (data) => {
        const { CampaignType } = data.Campaign;

        const formattedData = {
            "Campaign.CampaignName": data.Campaign.CampaignName,
            "Campaign.CampaignType": data.Campaign.CampaignType,
            "Campaign.ValidCountry": data.Campaign.ValidCountry,
            "Campaign.StartDate": data.Campaign.StartDate,
            "Campaign.EndDate": data.Campaign.EndDate,
            "Campaign.Status": data.Campaign.Status,
            "Campaign.Budget": data.Campaign.Budget,

            Rewards: Array.isArray(data.Rewards)
                ? data.Rewards.map((field) => ({
                      minimumAmount: field.minimumAmount,
                      maximumAmount: field.maximumAmount,
                      rewardOn: field.rewardOn,
                      rewardType: field.rewardType,
                      rewardValue: field.rewardValue,
                      rewardLimit: field.rewardLimit,
                  }))
                : [],
            DisplayMechanism: data.DisplayMechanism,
            LimitPerUser: data.LimitPerUser,
            LimitPerPromo: data.LimitPerPromo,
            TermsAndCondition: marked(data.TermsAndCondition),
            AttributeConditions: Array.isArray(data.AttributeConditions)
                ? data.AttributeConditions.map((field) => ({
                      attribute: field.attribute,
                      criteria: field.criteria,
                      currency: field.currency,
                      amount: field.amount,
                  }))
                : [],
            WebImage: data.WebImage,
            MobileImage: data.MobileImage,
            Description: data.Description,
        };

        if (CampaignType === campaignCodes.PROMO) {
            formattedData.AttributeConditions = Array.isArray(data.AttributeConditions)
                ? data.AttributeConditions.map((field) => ({
                      attribute: field.attribute,
                      criteria: field.criteria,
                      currency: field.currency,
                      amount: field.amount,
                  }))
                : [];
        }

        if (CampaignType === campaignCodes.REFERRAL) {
            formattedData.ReferralFamilyCondition = Array.isArray(data.ReferralFamilyCondition)
                ? data.ReferralFamilyCondition.map((field) => ({
                      referrerneedkyc: field.referrerneedkyc,
                      referrerleasttransactions: field.referrerleasttransactions,
                      refereeneedkyc: field.refereeneedkyc,
                      refereeleasttransactions: field.refereeleasttransactions,
                  }))
                : [];
        }

        const formData = new FormData();

        Object.keys(formattedData).forEach((key) => {
            if (Array.isArray(formattedData[key])) {
                formattedData[key].forEach((item, index) => {
                    Object.keys(item).forEach((subKey) => {
                        formData.append(`${key}[${index}][${subKey}]`, item[subKey]);
                    });
                });
            } else {
                formData.append(key, formattedData[key]);
            }
        });

        handleSubmit(formData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container>
                    {/* CAMPAIGN FIELDS */}

                    <Grid container spacing="16px">
                        {isAddMode && (
                            <>
                                <Grid item xs={12} md={6} lg={3}>
                                    <FormTextField name="Campaign.CampaignName" label="Campaign Name" />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <FormSelect
                                        type="number"
                                        name="Campaign.CampaignType"
                                        label="Campaign Type"
                                        options={campaignCodesOptions}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6} lg={3}>
                                    <FormSelect
                                        name="Campaign.ValidCountry"
                                        label="Valid Country"
                                        options={countryData}
                                    />
                                </Grid>
                            </>
                        )}

                        <Grid item xs={12} md={6} lg={3}>
                            <FormDateTimePicker name="Campaign.StartDate" label="Start Date Time" />
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormDateTimePicker name="Campaign.EndDate" label="End Date Time" />
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormTextField type="number" name="Campaign.Budget" label="Budget" />
                        </Grid>

                        <Grid item xs={12} md={6} lg={3}>
                            <FormSelect
                                type="number"
                                name="Campaign.Status"
                                label="Status"
                                options={campaignStatusOptions}
                            />
                        </Grid>
                    </Grid>

                    <Divider />

                    {/* TRIGGER FIELDS */}
                    {isAddMode && (
                        <>
                            {Campaign.CampaignType === campaignCodes.PROMO ? (
                                <Grid item xs={12}>
                                    <Grid marginTop={3} marginBottom={2} display="flex">
                                        <Grid item xs={12}>
                                            <Typography variant="h6">Trigger</Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6} lg={3}>
                                            <FormSelect
                                                options={campaignTriggerCriteriaOptions}
                                                name="TriggerCriteria"
                                                label="Trigger Criteria"
                                            />
                                        </Grid>
                                    </Grid>

                                    {triggerFields.map((field, index) => {
                                        return (
                                            <Grid container key={field.id}>
                                                <TriggerForm
                                                    index={index}
                                                    mappedAttributeList={mappedAttributeList}
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
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                color="error"
                                                                disabled
                                                            >
                                                                Remove
                                                            </Button>
                                                        )}
                                                    </ButtonWrapper>
                                                </Grid>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            ) : Campaign.CampaignType === campaignCodes.REFERRAL ? (
                                <Grid container spacing={2}>
                                    <Grid marginTop={3} marginBottom={2} item xs={12}>
                                        <Typography variant="h6">Trigger Configuration</Typography>
                                    </Grid>
                                    {triggerReferrerFields.map((field, index) => (
                                        <Grid container spacing={2} item key={`${field.id}_field`}>
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormSelect
                                                    label="Referrer Need KYC?"
                                                    name={`ReferralFamilyCondition.${index}.referrerneedkyc`}
                                                    options={[
                                                        { value: true, label: "True" },
                                                        { value: false, label: "False" },
                                                    ]}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormTextField
                                                    type="number"
                                                    label="Referrer Least Transactions"
                                                    name={`ReferralFamilyCondition.${index}.referrerleasttransactions`}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormSelect
                                                    label="Referee Need KYC?"
                                                    name={`ReferralFamilyCondition.${index}.refereeneedkyc`}
                                                    options={[
                                                        { value: true, label: "True" },
                                                        { value: false, label: "False" },
                                                    ]}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormTextField
                                                    type="number"
                                                    label="Referee Least Transactions"
                                                    name={`ReferralFamilyCondition.${index}.refereeleasttransactions`}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormTextField
                                                    type="number"
                                                    label="Minimum Referrer"
                                                    name={`ReferralFamilyCondition.${index}.minimumreferrer`}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={6} lg={3}>
                                                <FormTextField
                                                    type="number"
                                                    label="KYC Verifying Days"
                                                    name={`ReferralFamilyCondition.${index}.kycverifyingdays`}
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
                        </>
                    )}
                    {/* Reward Configuration */}

                    {isAddMode && (
                        <>
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
                                            <TableRow>
                                                <TableCell>
                                                    <CellContainer>
                                                        <FormTextField
                                                            label="Minimum Amount"
                                                            type="number"
                                                            name={`Rewards.${index}.minimumAmount`}
                                                        />
                                                    </CellContainer>
                                                </TableCell>

                                                <TableCell>
                                                    <CellContainer>
                                                        <FormTextField
                                                            label="Maximum Amount"
                                                            type="number"
                                                            name={`Rewards.${index}.maximumAmount`}
                                                        />
                                                    </CellContainer>
                                                </TableCell>

                                                <TableCell>
                                                    <CellContainer>
                                                        <FormSelect
                                                            name={`Rewards.${index}.rewardOn`}
                                                            options={rewardOnOptions}
                                                        />
                                                    </CellContainer>
                                                </TableCell>

                                                <TableCell>
                                                    <CellContainer>
                                                        <FormSelect
                                                            name={`Rewards.${index}.rewardType`}
                                                            options={rewardTypeOptions}
                                                        />
                                                    </CellContainer>
                                                </TableCell>

                                                <TableCell>
                                                    <CellContainer>
                                                        <FormTextField
                                                            label="Value"
                                                            type="number"
                                                            name={`Rewards.${index}.rewardValue`}
                                                        />
                                                    </CellContainer>
                                                </TableCell>

                                                <TableCell>
                                                    <CellContainer>
                                                        <FormTextField
                                                            label="Limit"
                                                            type="number"
                                                            name={`Rewards.${index}.rewardLimit`}
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
                                                            <Button
                                                                size="small"
                                                                color="error"
                                                                variant="contained"
                                                                disabled
                                                            >
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
                        </>
                    )}

                    {/* Last Part */}

                    <Grid container spacing={2} marginY={2}>
                        {isAddMode && (
                            <Grid item xs={12} md={4} lg={3}>
                                <FormSelect
                                    name="DisplayMechanism"
                                    label="Display Mechanism"
                                    options={displayMechanismsOptions}
                                />
                            </Grid>
                        )}

                        <Grid item xs={12} md={4} lg={4}>
                            <FormTextField type="number" name="LimitPerUser" label="Limit Per User" />
                        </Grid>

                        <Grid item xs={12} md={4} lg={4}>
                            <FormTextField type="number" name="LimitPerPromo" label="Limit Per Promo" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} marginY={2}>
                        <Grid item xs={12} md={6} lg={6}>
                            <FormTextArea name="Description" label="Description" />
                        </Grid>

                        <Grid
                            sx={{
                                display: "flex",
                                textAlign: "center",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            item
                            xs={12}
                            md={6}
                            lg={6}
                        >
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={6}>
                                    {!isAddMode && (
                                        <Box display="flex" alignItems="center">
                                            {!isEmpty(initialValues.WebImage) ? (
                                                <img
                                                    src={initialValues.WebImage}
                                                    alt="Web"
                                                    height={40}
                                                    width={40}
                                                    style={{ marginRight: "8px" }}
                                                />
                                            ) : (
                                                <Typography>No Web Image Available. Upload New</Typography>
                                            )}
                                        </Box>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel htmlFor="WebImage" component="label">
                                        Web Image
                                    </FormLabel>
                                    <FormFileField name="WebImage" accept="image/*" />
                                </Grid>

                                <Grid item xs={6}>
                                    {!isAddMode && (
                                        <Box display="flex" alignItems="center">
                                            {!isEmpty(initialValues.MobileImage) ? (
                                                <img
                                                    src={initialValues.MobileImage}
                                                    alt="Mobile"
                                                    height={40}
                                                    width={40}
                                                    style={{ marginRight: "8px" }}
                                                />
                                            ) : (
                                                <Typography>No Mobile Image Available. Upload New</Typography>
                                            )}
                                        </Box>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <FormLabel htmlFor="MobileImage" component="label">
                                        Mobile Image
                                    </FormLabel>
                                    <FormFileField name="MobileImage" accept="image/*" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <FormTextArea name="TermsAndCondition" label="Terms and Conditions" />
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonWrapper>
                            <CancelButton onClick={() => navigate(routePaths.ListPromoCode)}>Cancel</CancelButton>
                            <SubmitButton disabled={isSubmitting} type="submit">
                                {isAddMode ? "Add Campaign" : "Update Campaign"}
                            </SubmitButton>
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </form>
        </FormProvider>
    );
}
