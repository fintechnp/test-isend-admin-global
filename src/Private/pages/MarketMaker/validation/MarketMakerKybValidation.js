import * as yup from "yup";

export const marketMakerKybValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    registrationNo: yup.string().required("Registration No is required"),
    registereddate: yup.string().required(),
    brandName: yup.string().required(),
    registeredCountryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    registeredEntity: yup.string().required(),
    businessType: yup.string().required(),
    country: yup.string().required(),
    postCode: yup.string().required().max(15, "Post code must be less than 15 characters"),
    unit: yup.string().required(),
    state: yup.string().required(),
    street: yup.string().required(),
    city: yup.string().required(),
    address: yup.string().required(),
    documents: yup
        .array()
        .of(
            yup.object().shape({
                documentTypeId: yup.number().required(),
                documentId: yup.string().required("Document name is required"),
                documentName: yup.string().required(),
            }),
        )
        .required("Document is required"),
});
