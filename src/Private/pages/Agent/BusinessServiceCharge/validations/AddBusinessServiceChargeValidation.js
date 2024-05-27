import * as yup from "yup";

export const businessChargeValidationSchema = yup.object().shape({
    relatedTo: yup.string().required("Related to is required"),
    sendingCountry: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    receivingCountry: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    relatedId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    chargeDetailRules: yup.array().of(
        yup
            .object()
            .shape({
                min_no_of_txn: yup.string().required("Min no of txn is required"),
                max_no_of_txn: yup.string().required("Max no of txn is required"),
                flat_amount: yup.string().required("Flat amount is required"),
            })
            .required("Required"),
    ),
});
