import * as Yup from "yup";

import { campaignEventTypes } from "../data/campaignEventTypesEnums";
import { rewardTypeEnums } from "../data/rewardTypeEnums";

const attributeConditionsSchema = Yup.object().shape({
    attribute: Yup.number().required("Attribute is required").integer(),
    criteria: Yup.number().required("Criteria is required").integer(),
    currency: Yup.string().test("currency-required", "Currency is required", function (value) {
        const { attribute } = this.parent;
        return attribute == campaignEventTypes.AMOUNT ? value && value.length > 0 : true;
    }),
    amount: Yup.number().test("amount-required", "Amount is required", function (value) {
        const { attribute } = this.parent;
        if (
            [
                campaignEventTypes.AMOUNT,
                campaignEventTypes.COUNT,
                campaignEventTypes.BENEFICIARY_COUNTRY,
                campaignEventTypes.BENEFICIARY_RELATION,
            ].includes(attribute)
        ) {
            return value !== undefined && value >= 0;
        }
        return true;
    }),
});

const rewardsSchema = Yup.object().shape({
    minimumAmount: Yup.number().required("Minimum amount is required").min(0.1),
    maximumAmount: Yup.number()
        .required("Maximum amount is required")
        .min(Yup.ref("minimumAmount"), "Maximum amount must be greater than minimum amount"),
    rewardOn: Yup.number().required("Reward on is required").integer(),
    rewardType: Yup.number().required("Reward type is required").integer(),
    rewardValue: Yup.number().required("Reward value is required").min(0.1),
    rewardLimit: Yup.number().when("rewardType", {
        is: (value) => value === rewardTypeEnums.PERCENTAGE,
        then: (schema) => schema.required("Reward limit Must be at least 1").min(0.1),
        otherwise: (schema) => schema.nullable().optional(),
    }),
});

const referralFamilyConditionSchema = Yup.object().shape({
    referrerneedkyc: Yup.boolean().required("Referrer KYC is required"),
    referrerleasttransactions: Yup.number().required("Referrer least transactions are required").min(0),
    refereeneedkyc: Yup.boolean().required("Referee KYC is required"),
    refereeleasttransactions: Yup.number().required("Referee least transactions are required").min(0),
});

export const createPromoCodeSchema = Yup.object().shape({
    Campaign: Yup.object().shape({
        CampaignName: Yup.string().required("Campaign name is required"),
        CampaignType: Yup.number().required("Campaign type is required"),
        ValidCountry: Yup.string().required("Valid country is required"),
        StartDate: Yup.string().required("Start date is required"),
        EndDate: Yup.string().required("End date is required"),
        Status: Yup.number().required("Status is required").integer(),
        Budget: Yup.number().required("Budget is required").min(0.1),
    }),
    Rewards: Yup.array().of(rewardsSchema),
    DisplayMechanism: Yup.number().required("Display mechanism is required").integer(),
    LimitPerUser: Yup.mixed().optional(),
    LimitPerPromo: Yup.mixed().optional(),
    WebImage: Yup.string().nullable(),
    MobileImage: Yup.string().nullable(),
    Description: Yup.string().required("Description is required"),
    AttributeConditions: Yup.array().of(attributeConditionsSchema),
    ReferralFamilyCondition: Yup.array().of(referralFamilyConditionSchema),
});

export const updatePromoCodeSchema = Yup.object().shape({
    Campaign: Yup.object().shape({
        StartDate: Yup.string().required("Start date is required"),
        EndDate: Yup.string().required("End date is required"),
        Budget: Yup.number().required("Budget is required").min(0.1),
        Status: Yup.number().required("Status is required").integer(),
    }),
    LimitPerUser: Yup.mixed().optional(),
    LimitPerPromo: Yup.mixed().optional(),
    Description: Yup.string().required("Description is required"),
    TermsAndCondition: Yup.string().required("Terms and conditions are required"),
    WebImage: Yup.string().nullable(),
    MobileImage: Yup.string().nullable(),
});
