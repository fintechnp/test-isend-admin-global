import * as yup from "yup";

export const ledgerValidationSchema = yup.object().shape({
    narration: yup.string().required("Title to is required"),
    createLedgerDetail: yup.array().of(
        yup
            .object()
            .shape({
                accountId: yup.string().required("Account Id is required"),
                transactionType: yup.string().required("Transaction Type is required"),
                amount: yup.string().required("Amount is required"),
                remarks: yup.string().required("Remarks is required"),
            })
            .required("Required"),
    ),
});
