import * as yup from "yup";

export const addUserKycValidationSchema = yup.object().shape({
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
        .required("Identity expiry date is required")
        .test(
            "is-expiry-greater-than-issued",
            "Expiry date must be greater than issued date",
            function (expiryDate) {
                const issuedDate = this.resolve(yup.ref("identityIssuedDate"));
                if (!issuedDate || !expiryDate) {
                    return true;
                }
                return new Date(expiryDate) > new Date(issuedDate);
            },
            "Expiry date must be greater than issued date",
        ),
    designationId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),

    temporaryAddressCountryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    temporaryAddressUnit: yup.string().required("Unit is required"),
    temporaryAddressStreet: yup.string().required("Street is required"),
    temporaryAddressCity: yup.string().required("City is required"),
    temporaryAddressState: yup.string().required("State is required"),
    temporaryAddressPostCode: yup
        .string()
        .required("Post code is required")
        .max(10, "Post code must be less than 15 characters"),
    temporaryAddressAddress: yup.string().required("Address is required"),
    permanentAddressCountryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    permanentAddressUnit: yup.string().required("Unit is required"),
    permanentAddressStreet: yup.string().required("Street is required"),
    permanentAddressCity: yup.string().required("City is required"),
    permanentAddressState: yup.string().required("State is required"),
    permanentAddressPostCode: yup
        .string()
        .required("Post code is required")
        .max(10, "Post code must be less than 15 characters"),
    permanentAddressAddress: yup.string().required("Address is required"),

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
