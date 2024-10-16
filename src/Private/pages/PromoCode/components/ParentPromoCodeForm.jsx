import { marked } from "marked";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import routePaths from "Private/config/routePaths";
import FormSelect from "App/core/hook-form/FormSelect";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import { rewardOnEnums, rewardOnOptions } from "../data/rewardOnEnums";
import countryActions from "Private/features/countries/countryActions";
import attributeFamilyActions from "Private/features/attributeFamily/attributeFamilyActions";

import CampaignPromoForm from "./Form/CampaignPromoForm";
import { rewardTypeOptions } from "../data/rewardTypeEnums";
import { campaignStatusOptions } from "../data/campaignStatus";
import CampaignReferralForm from "./Form/CampaignReferralForm";
import CampaignInformationForm from "./Form/CampaignInformationForm";
import RewardConfigurationForm from "./Form/RewardConfigurationForm";
import { campaignCodes, campaignCodesOptions } from "../data/campaignCodes";
import { CampaignConfigurationForm } from "./Form/CampaignConfigurationForm";
import { campaignRewardCatogoryEnums } from "../data/campaignRewardCatogoryEnums";
import RefereeRewardConfigurationForm from "./Form/RefereeRewardConfigurationForm";
import {
    updatePromoCodeSchema,
    createAttributePromoCodeSchema,
    createReferralPromoCodeSchema,
} from "../schema/promoCodeSchema";
import { DisplayMechanismEnums, displayMechanismsOptions } from "../data/displayMechanismEnums";
import { campaignTriggerCriteria, campaignTriggerCriteriaOptions } from "../data/campaignTriggerCriteria";

export default function ParentPromoCodeForm({ isSubmitting = false, handleSubmit, initialValues, isAddMode }) {
    const dispatch = useDispatch();

    const getCampaignConditionSchema = (campaignType) => {
        return campaignType === campaignCodes.PROMO ? createAttributePromoCodeSchema : createReferralPromoCodeSchema;
    };

    const [schema, setSchema] = useState(getCampaignConditionSchema(campaignCodes.PROMO));
    const navigate = useNavigate();

    const [webImage, setWebImage] = useState(null);
    const [mobileImage, setMobileImage] = useState(null);

    const { response } = useSelector((state) => state.get_countries);

    const { response: getAttributeFamilyList } = useSelector((state) => state.get_attribute_family_list);

    const mappedAttributeList =
        getAttributeFamilyList?.data?.data?.map((item) => ({
            label: item.attributeName,
            value: item.attributeFamilyId,
        })) ?? [];

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
                          attribute: "",
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
                          rewardCategory: campaignRewardCatogoryEnums.Referrer,
                      },
                  ],

                  RefereeRewards: [
                      {
                          minimumAmount: 0,
                          maximumAmount: 0,
                          rewardOn: rewardOnEnums.SERVICE_CHARGE,
                          rewardType: 0,
                          rewardValue: 0,
                          rewardLimit: 0,
                          rewardCategory: campaignRewardCatogoryEnums.Referee,
                      },
                  ],
                  TriggerCriteria: campaignTriggerCriteria.ALL_CONDITIONS_ARE_TRUE,
                  DisplayMechanism: DisplayMechanismEnums.ALWAYS_ON_DISPLAY,
                  LimitPerUser: 0,
                  LimitPerPromo: 0,
                  TermsAndCondition: "",
                  WebImage: "",
                  MobileImage: "",
                  Description: "",
              }
            : {
                  LimitPerUser: initialValues?.LimitPerUser || 0,
                  LimitPerPromo: initialValues?.LimitPerPromo || 0,
                  TriggerCriteria: initialValues?.TriggerCriteria || 0,
                  ReferralFamilyCondition: initialValues?.ReferralFamilyCondition || [],
                  Rewards: initialValues?.Rewards || [
                      {
                          minimumAmount: initialValues?.minimumAmount || 0,
                          maximumAmount: initialValues?.maximumAmount || 0,
                          rewardOn: initialValues?.rewardOnEnums?.SERVICE_CHARGE || rewardOnEnums?.SERVICE_CHARGE,
                          rewardType: initialValues?.rewardType || 0,
                          rewardValue: initialValues?.rewardValue || 0,
                          rewardLimit: initialValues?.rewardLimit || 0,
                          rewardCategory: initialValues?.rewardCategory || 0,
                      },
                  ],
              },
        resolver: yupResolver(isAddMode ? schema : updatePromoCodeSchema),
        mode: "onSubmit",
    });

    const {
        watch,
        setValue,
        reset,
        control,
        formState: { errors },
    } = methods;

    const CampaignType = watch("Campaign.CampaignType");
    const Campaign = watch("Campaign");

    useEffect(() => {
        const newSchema = getCampaignConditionSchema(CampaignType);
        setSchema(newSchema);
    }, [CampaignType]);

    useEffect(() => {
        if (!isAddMode) {
            setValue("Campaign.CampaignName", initialValues?.CampaignName);
            setValue("Campaign.ValidCountry", initialValues?.ValidCountry);
            setValue("Campaign.StartDate", initialValues?.StartDate);
            setValue("Campaign.EndDate", initialValues?.EndDate);
            setValue("Campaign.Status", initialValues?.Status);
            setValue("Campaign.Budget", initialValues?.Budget);
            setValue("LimitPerUser", initialValues?.LimitPerUser ?? 0);
            setValue("LimitPerPromo", initialValues?.LimitPerPromo ?? 0);
            setValue("TermsAndCondition", initialValues?.TermsAndCondition);
            setValue("Description", initialValues?.Description);
        }
    }, [initialValues]);

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
        fields: refereeRewardFields,
        append: addRefereeRewardFields,
        remove: removeRefereeRewardFields,
    } = useFieldArray({
        control,
        name: "RefereeRewards",
    });

    const {
        fields: triggerReferrerFields,
        append: addtriggerReferrerFields,
        remove: removetriggerReferrerFields,
    } = useFieldArray({
        control,
        name: "ReferralFamilyCondition",
    });

    const attributeFamilyTypeId = getAttributeFamilyList?.data?.data;

    // const attributeFamilyCompare = getAttributeFamilyList?.data?.data?.map((attribute) => ({
    //     attributeFamilyId: attribute.attributeFamilyId,
    //     attributeName: attribute.attributeName,
    // }));

    const attributeFamilyCompare =
        attributeFamilyTypeId && Array.isArray(attributeFamilyTypeId)
            ? attributeFamilyTypeId?.map((item) => item.attributeFamilyId)
            : [];

    const onSubmit = (data) => {
        const { CampaignType } = data.Campaign;

        let combinedRewards = [];

        if (CampaignType === campaignCodes.PROMO) {
            combinedRewards = Array.isArray(data.Rewards) ? data.Rewards : [];
        } else if (CampaignType === campaignCodes.REFERRAL) {
            combinedRewards = [
                ...(Array.isArray(data.Rewards) ? data.Rewards : []),
                ...(Array.isArray(data.RefereeRewards) ? data.RefereeRewards : []),
            ];
        }

        combinedRewards = combinedRewards.map((field) => ({
            minimumAmount: field.minimumAmount,
            maximumAmount: field.maximumAmount,
            rewardOn: field.rewardOn,
            rewardType: field.rewardType,
            rewardValue: field.rewardValue,
            rewardLimit: field.rewardLimit,
            rewardCategory: field.rewardCategory,
        }));

        const formattedData = {
            "Campaign.CampaignName": data.Campaign.CampaignName,
            "Campaign.CampaignType": data.Campaign.CampaignType,
            "Campaign.ValidCountry": data.Campaign.ValidCountry,
            "Campaign.StartDate": data.Campaign.StartDate,
            "Campaign.EndDate": data.Campaign.EndDate,
            "Campaign.Status": data.Campaign.Status,
            "Campaign.Budget": data.Campaign.Budget,
            Rewards: combinedRewards,
            DisplayMechanism: data.DisplayMechanism,
            TriggerCriteria: data.TriggerCriteria,
            LimitPerUser: data.LimitPerUser ?? 0,
            LimitPerPromo: data.LimitPerPromo ?? 0,
            TermsAndCondition: marked(data.TermsAndCondition),
            AttributeConditions: Array.isArray(data.AttributeConditions)
                ? data.AttributeConditions.map((field) => ({
                      attribute: field?.attribute,
                      criteria: field?.criteria,
                      currency: field?.currency ?? "",
                      amount: field?.amount ?? 0,
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
                      currency: field.currency ?? "",
                      amount: field.amount ?? 0,
                  }))
                : [];
        }

        if (CampaignType === campaignCodes.REFERRAL) {
            formattedData.ReferralFamilyCondition = Array.isArray(data.ReferralFamilyCondition)
                ? data.ReferralFamilyCondition.map((field) => ({
                      referrerneedkyc: field.referrerneedkyc ?? "",
                      referrerleasttransactions: field.referrerleasttransactions ?? "",
                      refereeneedkyc: field.refereeneedkyc ?? "",
                      refereeleasttransactions: field.refereeleasttransactions ?? "",
                  }))
                : [];
        }

        const { WebImage, MobileImage, ...rest } = formattedData;

        const formData = new FormData();

        for (const key in rest) {
            if (Array.isArray(rest[key])) {
                rest[key].forEach((item, index) => {
                    for (const itemKey in item) {
                        formData.append(`${key}[${index}].${itemKey}`, item[itemKey]);
                    }
                });
            } else {
                formData.append(key, rest[key]);
            }
        }
        formData.append("WebImage", webImage);
        formData.append("MobileImage", mobileImage);

        handleSubmit(formData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <Grid container>
                    {/* CAMPAIGN FIELDS */}

                    <CampaignInformationForm
                        isAddMode={isAddMode}
                        campaignCodesOptions={campaignCodesOptions}
                        countryData={countryData}
                        campaignStatusOptions={campaignStatusOptions}
                    />

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
                                                required
                                                options={campaignTriggerCriteriaOptions}
                                                name="TriggerCriteria"
                                                label="Trigger Criteria"
                                            />
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <CampaignPromoForm
                                            triggerFields={triggerFields}
                                            mappedAttributeList={mappedAttributeList}
                                            countryCurrency={countryCurrency}
                                            allAttributeList={getAttributeFamilyList?.data?.data}
                                            addTriggerFields={addTriggerFields}
                                            removeTriggerFields={removeTriggerFields}
                                        />
                                    </Grid>
                                </Grid>
                            ) : Campaign.CampaignType === campaignCodes.REFERRAL ? (
                                <CampaignReferralForm
                                    addtriggerReferrerFields={addtriggerReferrerFields}
                                    removetriggerReferrerFields={removetriggerReferrerFields}
                                    triggerReferrerFields={triggerReferrerFields}
                                />
                            ) : (
                                <></>
                            )}
                        </>
                    )}
                    {/* Reward Configuration */}

                    {isAddMode && (
                        <Grid item xs={12}>
                            <Grid marginTop={3} marginBottom={2} display="flex">
                                <Grid item xs={12}>
                                    <Typography variant="h6">
                                        {Campaign.CampaignType === campaignCodes.PROMO
                                            ? "Reward Configuration"
                                            : "Referrer Reward Configuration"}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <RewardConfigurationForm
                                rewardFields={rewardFields}
                                rewardOnOptions={rewardOnOptions}
                                rewardTypeOptions={rewardTypeOptions}
                                addRewardFields={addRewardFields}
                                removeRewardFields={removeRewardFields}
                            />

                            {Campaign.CampaignType === campaignCodes.REFERRAL && (
                                <Grid>
                                    <Grid marginTop={3} marginBottom={2} display="flex">
                                        <Grid item xs={12}>
                                            <Typography variant="h6">Referee Reward Configuration</Typography>
                                        </Grid>
                                    </Grid>

                                    <RefereeRewardConfigurationForm
                                        refereeRewardFields={refereeRewardFields}
                                        addRefereeRewardFields={addRefereeRewardFields}
                                        removeRefereeRewardFields={removeRefereeRewardFields}
                                        rewardOnOptions={rewardOnOptions}
                                        rewardTypeOptions={rewardTypeOptions}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    )}

                    {/* Last Part */}

                    <Grid container marginY={2}>
                        <CampaignConfigurationForm
                            initialValues={initialValues}
                            isAddMode={isAddMode}
                            displayMechanismsOptions={displayMechanismsOptions}
                            setMobileImage={setMobileImage}
                            setWebImage={setWebImage}
                        />
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
