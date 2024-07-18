import * as yup from "yup";

export const marketMakerValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    registrationNo: yup.string().required("Registration No is required"),
    registereddate: yup.string().required(),
    brandName: yup.string().required(),
    registeredCountryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    currencyId: yup.string().required(),
    email: yup.string().email().required("Email is required"),
    loginEmail: yup.string().email().required("Login email is required"),
    contactNo: yup.string().required(),
    website: yup
        .string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            "Enter correct url!",
        )
        .required("Please enter website"),
    allowedCountryIds: yup
        .array()
        .min(1, "Allowed countries must contain at least one number")
        .of(yup.number().typeError("Must be a number"))
        .required("Array of numbers is required"),
    address: yup.object().shape({
        countryId: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .required("Required"),
        postCode: yup.string().required().max(10, "Post code must be less than 10 characters"),
        unit: yup.string().required(),
        state: yup.string().required(),
        street: yup.string().required(),
        city: yup.string().required(),
        address: yup.string().required(),
    }),
    contactPerson: yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required("Required"),
        mobileNo: yup.string().required().max(15, "Mobile no must be less than 15 characters"),
        phoneNo: yup.string().required().max(15, "Phone no must be less than 15 characters"),
        extension: yup.string().required(),
        designationId: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .required("Required"),
        countryId: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .required("Required"),
    }),
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

export const editMarketMakerValidationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    registrationNo: yup.string().required("Registration No is required"),
    registereddate: yup.string().required(),
    brandName: yup.string().required(),
    registeredCountryId: yup
        .number()
        .transform((value) => (Number.isNaN(value) ? null : value))
        .nullable()
        .required("Required"),
    currencyId: yup.string().required(),
    email: yup.string().email().required("Email is required"),
    contactNo: yup.string().required(),
    website: yup
        .string()
        .matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            "Enter correct url!",
        )
        .required("Please enter website"),
    allowedCountryIds: yup
        .array()
        .min(1, "Allowed countries must contain at least one number")
        .of(yup.number().typeError("Must be a number"))
        .required("Array of numbers is required"),
    address: yup.object().shape({
        countryId: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .required("Required"),
        postCode: yup.string().required().max(10, "Post code must be less than 10 characters"),
        unit: yup.string().required(),
        state: yup.string().required(),
        street: yup.string().required(),
        city: yup.string().required(),
        address: yup.string().required(),
    }),
    contactPerson: yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required("Required"),
        mobileNo: yup.string().required().max(15, "Mobile no must be less than 15 characters"),
        phoneNo: yup.string().required().max(15, "Phone no must be less than 15 characters"),
        extension: yup.string().required(),
        designationId: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .required("Required"),
        countryId: yup
            .number()
            .transform((value) => (Number.isNaN(value) ? null : value))
            .nullable()
            .required("Required"),
    }),
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
