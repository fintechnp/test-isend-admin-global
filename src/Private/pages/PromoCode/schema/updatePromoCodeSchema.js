import * as Yup from "yup";

export const updatePromoCodeSchema = Yup.object().shape({
    campaign: Yup.object().shape({
        startDate: Yup.date().required("Start date is required"),

        endDate: Yup.date().required("End date is required"),
        status: Yup.number().required("Status is required").integer(),
        budget: Yup.number().required("Budget is required").min(0),
    }),

    limitPerUser: Yup.number().required("Limit per user is required").min(0),
    limitPerPromo: Yup.number().required("Limit per promo is required").min(0),
    TermsAndCondition: Yup.string().required("Terms and conditions are required"),
    WebImage: Yup.string().optional(),
    MobileImage: Yup.string().optional(),
    description: Yup.string().required("Description is required"),
});
