import * as Yup from "yup";

export const createPromoCodeSchema = Yup.object().shape({
    Campaign: Yup.object().shape({
        CampaignName: Yup.string().required("Campaign name is required"),
        CampaignType: Yup.number().required("Campaign type is required").integer(),
        ValidCountry: Yup.string().required("Valid country is required"),
        Status: Yup.number().required("Status is required").integer(),
        Budget: Yup.number().required("Budget is required").min(0),
    }),
    TriggerCriteria: Yup.number().required("Trigger criteria is required").integer(),

    Rewards: Yup.array().of(
        Yup.object().shape({
            minimumAmount: Yup.number().required("Minimum amount is required").min(0),
            maximumAmount: Yup.number()
                .required("Maximum amount is required")
                .test(
                    "is-greater-than-minimumAmount",
                    "Maximum amount must be greater than minimum amount",
                    function (value) {
                        const { minimumAmount } = this.parent;
                        return value > minimumAmount;
                    },
                ),
            rewardOn: Yup.number().required("Reward on is required").integer(),
            rewardType: Yup.number().required("Reward type is required").integer(),
            rewardValue: Yup.number().required("Reward value is required").min(0),
            rewardLimit: Yup.number().required("Reward limit is required").min(0),
        }),
    ),
    DisplayMechanism: Yup.number().required("Display mechanism is required").integer(),
    LimitPerUser: Yup.number().required("Limit per user is required").min(0),
    LimitPerPromo: Yup.number().required("Limit per promo is required").min(0),
    TermsAndCondition: Yup.string().required("Terms and conditions are required"),
    WebImage: Yup.string().optional(),
    MobileImage: Yup.string().optional(),
    Description: Yup.string().required("Description is required"),
});
