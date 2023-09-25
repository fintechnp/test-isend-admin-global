import * as yup from "yup";

export const marketMakerKybValidationSchema = yup.object().shape({
    name: yup.string().required("Required"),
    registrationNo: yup.string().required("Required"),
    registereddate: yup.string().required("Required"),
    brandName: yup.string().required("Required"),
    registeredCountryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    countryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    postCode: yup.string().required().max(15, "Post code must be less than 15 characters"),
    unit: yup.string().required("Required"),
    state: yup.string().required("Required"),
    street: yup.string().required("Required"),
    city: yup.string().required("Required"),
    address: yup.string().required("Required"),
    documents: yup
        .array()
        .of(
            yup.object().shape({
                documentTypeId: yup.number().required(),
                documentId: yup.string().required("Document name is required"),
                documentName: yup.string().required(),
            }),
        )
        .required("Documents is required"),
});
