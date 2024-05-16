import * as yup from "yup";

const makePaymentSchema = yup.object().shape({
    transactionRefNo: yup.string().required("Required"),
    amount: yup.number().required("Required"),
    remarks: yup.string().required("Required"),
});

const RefundPaymentSchema = yup.object().shape({
    webhookId: yup.string().required("Amount is required"),
    amount: yup.string().required("Amount is required"),
    remarks: yup.string().required("Remarks is required"),
});

export { makePaymentSchema, RefundPaymentSchema };
