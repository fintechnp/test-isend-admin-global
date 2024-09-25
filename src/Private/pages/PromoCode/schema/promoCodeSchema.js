import * as Yup from "yup";

import { campaignEventTypes } from "../data/campaignEventTypesEnums";
import { rewardTypeEnums } from "../data/rewardTypeEnums";

const attributeConditionsSchema = Yup.object().shape({
    attribute: Yup.number().typeError("Attribute is required").required("Attribute is required").integer(),

    criteria: Yup.number().required("Criteria is required").typeError("Criteria is required").integer(),
    attributeTypeValue: Yup.number().optional().nullable(),
    currency: Yup.string().optional().nullable(),
    amount: Yup.number().test("required", "This field is required", function (value, context) {
        const { attributeTypeValue } = context.parent;
        if (
            attributeTypeValue === campaignEventTypes.AMOUNT ||
            attributeTypeValue === campaignEventTypes.BENEFICIARY_COUNTRY ||
            attributeTypeValue === campaignEventTypes.BENEFICIARY_RELATION
        ) {
            if (value <= 0 || !value) {
                return false;
            }
            return true;
        }
    }),
});

const rewardsSchema = Yup.object().shape({
    minimumAmount: Yup.number().typeError("Required").required("Required").min(0.1, "Required"),
    maximumAmount: Yup.number()
        .typeError("Required")
        .required("Required")
        .min(Yup.ref("minimumAmount"), "Maximum amount must be greater than minimum amount"),
    rewardOn: Yup.number().typeError("Reward on is required").required("Reward on is required").integer(),
    rewardType: Yup.number().typeError("Reward Type is required").required("Reward type is required").integer(),
    rewardCategory: Yup.number()
        .typeError("Reward Category is required")
        .required("Reward category is required")
        .integer(),
    rewardValue: Yup.number()
        .typeError("Reward value is required")
        .required("Reward value is required")
        .min(0.1, "Required"),
    rewardLimit: Yup.number().when("rewardType", {
        is: (value) => value === rewardTypeEnums.PERCENTAGE,
        then: (schema) => schema.required("Required").typeError("Required").min(0.1, "Required"),
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
    LimitPerUser: Yup.mixed().optional(),
    LimitPerPromo: Yup.mixed().optional(),
    WebImage: Yup.string().nullable(),
    MobileImage: Yup.string().nullable(),
    Description: Yup.string().required("Description is required"),
    AttributeConditions: Yup.array().of(attributeConditionsSchema),
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
    LimitPerUser: Yup.mixed().optional(),
    LimitPerPromo: Yup.mixed().optional(),
    Description: Yup.string().required("Description is required"),
    TermsAndCondition: Yup.string().required("Terms and conditions are required"),
    WebImage: Yup.string().nullable(),
    MobileImage: Yup.string().nullable(),
});
