import * as Yup from "yup";

export const updatePromoCodeSchema = Yup.object().shape({
    Campaign: Yup.object().shape({
        Status: Yup.number().required("Status is required").integer(),
        Budget: Yup.number().required("Budget is required").min(0),
    }),

    LimitPerUser: Yup.number().required("Limit per user is required").min(0),
    LimitPerPromo: Yup.number().required("Limit per promo is required").min(0),
    TermsAndCondition: Yup.string().required("Terms and conditions are required"),
    WebImage: Yup.string().optional(),
    MobileImage: Yup.string().optional(),
    Description: Yup.string().required("Description is required"),
});
