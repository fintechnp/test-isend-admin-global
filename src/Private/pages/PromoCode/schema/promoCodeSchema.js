import * as Yup from "yup";

import { rewardTypeEnums } from "../data/rewardTypeEnums";

const attributeConditionsSchema = Yup.object().shape({
    attribute: Yup.number().typeError("Attribute is required").required("Attribute is required").integer(),

    criteria: Yup.number().required("Criteria is required").typeError("Criteria is required").integer(),
    attributeTypeValue: Yup.number().optional().nullable(),
    currency: Yup.string().optional().nullable(),
});

const rewardsSchema = Yup.object().shape({
    minimumAmount: Yup.number()
        .typeError("Minimum amount is required")
        .required("Minimum amount is required")
        .min(0.1, "Must be greater than or equal to 0.1"),
    maximumAmount: Yup.number()
        .typeError("Maximum Amount is required")
        .required("Maximum amount is required")
        .min(Yup.ref("minimumAmount"), "Must be greater than minimum amount"),
    rewardOn: Yup.number().typeError("Reward on is required").required("Reward on is required").integer(),
    rewardType: Yup.number().typeError("Reward Type is required").required("Reward type is required").integer(),
    rewardCategory: Yup.number()
        .typeError("Reward Category is required")
        .required("Reward category is required")
        .integer(),
    rewardValue: Yup.number()
        .typeError("Reward value is required")
        .required("Reward value is required")
        .min(0.1, "Must be greater than or equal to 0.1"),
    rewardLimit: Yup.number().when("rewardType", {
        is: (value) => value === rewardTypeEnums.PERCENTAGE,
        then: (schema) =>
            schema
                .required("Reward limit must be at least 1")
                .typeError("Reward limit must be greater than or equal to 0.1")
                .min(0.1, "Must be greater than or equal to 0.1"),
        otherwise: (schema) => schema.nullable().optional(),
    }),
});

const referralFamilyConditionSchema = Yup.object().shape({
    referrerneedkyc: Yup.boolean().required("Referrer KYC is required"),
    referrerleasttransactions: Yup.number()
        .required("Referrer least transactions are required")
        .typeError("Referrer least transactions are required")
        .min(0),
    minimumreferrer: Yup.number()
        .required("Minimum Referee is required")
        .typeError("Minimum Referee is required")
        .min(0),
    refereeneedkyc: Yup.boolean().required("Referee KYC is required"),
    refereeleasttransactions: Yup.number()
        .required("Referee least transactions are required")
        .typeError("Referee least transactions are required")
        .min(0),
});

export const createAttributePromoCodeSchema = Yup.object().shape({
    Campaign: Yup.object().shape({
        CampaignName: Yup.string().required("Campaign Name is required"),
        CampaignType: Yup.number().required("Campaign Type is required"),
        ValidCountry: Yup.string().required("Valid Country is required"),
        StartDate: Yup.string().required("Start Date is required"),
        EndDate: Yup.string().required("End Date is required"),
        Status: Yup.number().required("Status is required").integer(),
        Budget: Yup.number().typeError("Budget is required").required("Budget is required").min(0),
    }),
    Rewards: Yup.array().of(rewardsSchema),
    DisplayMechanism: Yup.number().required("Display mechanism is required").integer(),
    LimitPerUser: Yup.number().typeError("Limit Per User is required").required("Limit Per User is required"),
    LimitPerPromo: Yup.number().typeError("Total Redemptions is required").required("Total Redemptions is required"),
    WebImage: Yup.string().nullable(),
    MobileImage: Yup.string().nullable(),
    Description: Yup.string().required("Description is required"),
    AttributeConditions: Yup.array().of(attributeConditionsSchema),
    TermsAndCondition: Yup.string().required("Terms and conditions are required"),
});

export const createReferralPromoCodeSchema = Yup.object().shape({
    Campaign: Yup.object().shape({
        CampaignName: Yup.string().required("Campaign Name is required"),
        CampaignType: Yup.number().required("Campaign Type is required"),
        ValidCountry: Yup.string().required("Valid Country is required"),
        StartDate: Yup.string().required("Start Date is required"),
        EndDate: Yup.string().required("End Date is required"),
        Status: Yup.number().required("Status is required").integer(),
        Budget: Yup.number().typeError("Budget is required").required("Budget is required").min(0),
    }),
    Rewards: Yup.array().of(rewardsSchema),
    DisplayMechanism: Yup.number().required("Display mechanism is required").integer(),
    LimitPerUser: Yup.number().typeError("Limit Per User is required").required("Limit Per User is required"),
    LimitPerPromo: Yup.number().typeError("Total Redemptions is required").required("Total Redemptions is required"),
    WebImage: Yup.string().nullable(),
    MobileImage: Yup.string().nullable(),
    Description: Yup.string().required("Description is required"),
    ReferralFamilyCondition: Yup.array().of(referralFamilyConditionSchema),
    TermsAndCondition: Yup.string().required("Terms and conditions are required"),
});

export const updatePromoCodeSchema = Yup.object().shape({
    Campaign: Yup.object().shape({
        StartDate: Yup.string().required("Start date is required"),
        EndDate: Yup.string().required("End date is required"),
        Budget: Yup.number().typeError("Budget is required").required("Budget is required").min(0),
        Status: Yup.number().required("Status is required").integer(),
    }),
    LimitPerUser: Yup.number().typeError("Limit Per User is required").required("Limit Per User is required").integer(),
    LimitPerPromo: Yup.number()
        .typeError("Total Redemptions is required")
        .required("Total Redemptions is required")
        .integer(),
    Description: Yup.string().required("Description is required"),
    TermsAndCondition: Yup.string().required("Terms and conditions are required"),
    WebImage: Yup.string().nullable(),
    MobileImage: Yup.string().nullable(),
});
