import * as yup from "yup";

const schema = yup.object().shape({
    name: yup.string().required("Required"),
    registrationNo: yup.string().required("Required"),
    registeredDate: yup.string().required("Required"),
    brandName: yup.string().required("Required"),
    registeredCountryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    address: yup.object().shape({
        countryId: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .required("Required"),
        postCode: yup.string().required().max(10, "Post code must be less than 15 characters"),
        unit: yup.string().nullable(),
        state: yup.string().required("Required"),
        street: yup.string().required("Required"),
        city: yup.string().required("Required"),
        address: yup.string().required("Required"),
    }),
    documents: yup.array().of(
        yup.object().shape({
            documentTypeId: yup.number().optional().nullable(),
            documentId: yup.string().optional().nullable(),
            documentName: yup.string().optional().nullable(),
            isRequired: yup.boolean().optional().nullable(),
        }),
    ),
});

export const createOrganizationStakeholderSchema = schema;

export const updateOrganizationStakeholderSchema = schema;
