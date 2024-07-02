import * as yup from "yup";

const schema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    dateOfBirth: yup.string().required("Date of birth is required"),
    birthCountryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    mobileNumber: yup.string().required("Mobile number is required"),
    gender: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    identityTypeId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    identityNo: yup.string().required("Identity number is required"),
    identityIssuedBy: yup.string().required("Identity issued by is required"),
    identityIssuedCountryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    identityIssuedDate: yup.string().required("Identity issued date is required"),
    identityExpiryDate: yup
        .string()
        .test("is-expiry-greater-than-issued", "Expiry date must be greater than issued date", function (expiryDate) {
            if (!expiryDate) {
                return true; // If expiry date is not provided, skip this validation
            }
            const issuedDate = this.resolve(yup.ref("identityIssuedDate"));
            if (!issuedDate) {
                return true; // If issued date is not provided, skip this validation
            }
            return new Date(expiryDate) > new Date(issuedDate);
        }),
    designationId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    temporaryAddress: yup.object().shape({
        countryId: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .required("Required"),
        unit: yup.string().nullable(),
        street: yup.string().required("Street is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        postCode: yup.string().required("Post code is required").max(10, "Post code must be less than 15 characters"),
        address: yup.string().required("Address is required"),
    }),
    permanentAddress: yup.object().shape({
        countryId: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .required("Required"),
        unit: yup.string(),
        street: yup.string().required("Street is required"),
        city: yup.string().required("City is required"),
        state: yup.string().required("State is required"),
        postCode: yup
            .string()
            .required("Post code is required")
            .max(10, "Post code must be less than 15 characters"),
        address: yup.string().required("Address is required"),
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

export const createIndividualStakeholderSchema = schema;

export const updateIndividualStakeholderSchema = schema;
