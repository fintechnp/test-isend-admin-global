import * as Yup from "yup";

export const createPromoCodeSchema = Yup.object().shape({
    campaign: Yup.object().shape({
        campaignName: Yup.string().required("Campaign name is required"),
        campaignType: Yup.number().required("Campaign type is required").integer(),
        validCountry: Yup.string().required("Valid country is required"),
        startDate: Yup.date().required("Start date is required"),

        endDate: Yup.date().required("End date is required"),
        status: Yup.number().required("Status is required").integer(),
        budget: Yup.number().required("Budget is required").min(0),
    }),
    triggerCriteria: Yup.number().required("Trigger criteria is required").integer(),
    trigger: Yup.array()
        .of(
            Yup.object().shape({
                attribute: Yup.number().required("Attribute is required").integer(),
                criteria: Yup.number().optional(),
                currency: Yup.string().optional(),
                amount: Yup.number().optional().min(0),
            }),
        )
        .optional(),
    reward: Yup.array().of(
        Yup.object().shape({
            minimumAmount: Yup.number().required("Minimum amount is required").min(0),
            maximumAmount: Yup.number()
                .required("Maximum amount is required")
                .when("minimumAmount", {
                    is: (min) => min != null,
                    then: Yup.number().moreThan(
                        Yup.ref("minimumAmount"),
                        "Maximum amount must be greater than minimum amount",
                    ),
                }),

            rewardOn: Yup.number().required("Reward on is required").integer(),
            rewardType: Yup.number().required("Reward type is required").integer(),
            rewardValue: Yup.number().required("Reward value is required").min(0),
            rewardLimit: Yup.number().required("Reward limit is required").min(0),
        }),
    ),
    displayMechanism: Yup.number().required("Display mechanism is required").integer(),
    limitPerUser: Yup.number().required("Limit per user is required").min(0),
    limitPerPromo: Yup.number().required("Limit per promo is required").min(0),
    termsAndCondition: Yup.string().required("Terms and conditions are required"),
    webImage: Yup.string().optional(),
    mobileImage: Yup.string().optional(),
    description: Yup.string().required("Description is required"),
});
