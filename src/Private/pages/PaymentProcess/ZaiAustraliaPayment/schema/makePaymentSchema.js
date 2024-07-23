import * as yup from "yup";

export const makePaymentSchema = yup.object().shape({
    transactionId: yup.string().required("Required"),
    webhookId: yup.string().required("Required"),
    paymentAmount: yup.number().required("Required").typeError("Enter a amount"),
    remarks: yup.string().required("Required").typeError("Enter a remarks"),
});
