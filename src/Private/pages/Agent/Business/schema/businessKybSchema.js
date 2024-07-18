import * as yup from "yup";

export const createBusinessKybSchema = yup.object().shape({
    name: yup.string().required("Required"),
    registrationNo: yup.string().required("Required"),
    registeredDate: yup.string().required("Required"),
    brandName: yup.string().required("Required"),
    phoneNo: yup.string().required("Required").max(15, "Phone number must be less than 15 characters"),
    email: yup.string().email().required("Required"),
    website: yup.string().url().nullable(),
    registeredCountryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    addressCountry: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    addressPostCode: yup.string().max(10, "Post code must be less than 10 characters").nullable(),
    addressUnit: yup.string().nullable(),
    addressState: yup.string().required("Required"),
    addressStreet: yup.string().required("Required"),
    addressCity: yup.string().required("Required"),
    address: yup.string().required("Required"),
    contactPersonName: yup.string().required("Required"),
    contactPersonMobileNumber: yup
        .string()
        .required("Required")
        .max(15, "Mobile number must be less than 15 characters"),
    contactPersonPhoneNumber: yup.string().required("Required").max(15, "Phone number must be less than 15 characters"),
    contactPersonExtension: yup.string().required("Required"),
    contactPersonDesignationId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    typeOfBusinessId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    documents: yup.array().of(
        yup.object().shape({
            documentTypeId: yup.number().optional().nullable(),
            documentId: yup.string().optional().nullable(),
            documentName: yup.string().optional().nullable(),
            isRequired: yup.boolean().optional().nullable(),
        }),
    ),
});
