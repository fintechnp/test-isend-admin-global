import * as yup from "yup";

export const refundPaymentSchema = yup.object().shape({
    webhookId: yup.string().required("Amount is required"),
    amount: yup.string().required("Amount is required"),
    remarks: yup.string().required("Remarks is required"),
});
