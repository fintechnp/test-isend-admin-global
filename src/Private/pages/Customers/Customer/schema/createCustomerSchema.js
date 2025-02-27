import * as Yup from "yup";
import dayjs from "dayjs";

import { AUSTRALIA_ISO3, UNITED_STATES_ISO3 } from "App/data/SendingCountry";
import { CustomerDocumentSide } from "../data/CustomerDocumentSide";

export const createCustomerFormStep1Schema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required").max(50, "Maximum 50 characters allowed"),
    middle_name: Yup.string().nullable().max(50, "Maximum 50 characters allowed"),
    last_name: Yup.string().nullable().max(50, "Maximum 50 characters allowed"),
    birth_country: Yup.string().required("Birth country is required"),
    citizenship_country: Yup.string().required("Nationality is required"),
    date_of_birth: Yup.string()
        .required("Date of birth required")
        .test("is-18", "Must be at least 18 years old", (value) => {
            if (!value) return false;
            const birthDate = dayjs(value);
            const today = dayjs();
            return today.diff(birthDate, "year") >= 18;
        }),
    mobile_number: Yup.string()
        .required("Phone Number is required")
        .min(8, "Invalid phone number")
        .test({
            name: "valid_phone_number",
            message: "Invalid phone number",
            test: (value, context) => {
                return new RegExp(context.parent.phone_code_regex).test(value ?? "");
            },
        }),
    email: Yup.string().email().required(),
    gender: Yup.string()
        .required("Gender is required")
        .matches(/^[A-Za-z]{1,1}$/),
    occupation: Yup.string()
        .required("Occupation is required")
        .max(100)
        .matches(/^[A-Za-z0-9_ (@#,&/)-]{1,100}$/),
    source_of_income: Yup.string()
        .required("Source of income is required")
        .max(100)
        .matches(/^[A-Za-z0-9_ (@#,&/)-]{1,100}$/),
    country: Yup.string().required("Select a country"),
    ssn_number: Yup.string().when("country", {
        is: (value) => value?.toUpperCase() === UNITED_STATES_ISO3,
        then: (schema) => schema.length(9, "SSN Number must be exactly 9 digits").required("SSN Number is required"),
        otherwise: (schema) => schema.nullable().optional(),
    }),
    register_agent_id: Yup.string().required("Select a agent"),
});

export const POSTAL_CODE_REGEX = "POSTAL_CODE_REGEX";
export const IS_STATE_REQUIRED = "IS_STATE_REQUIRED";

export const createCustomerFormStep2Schema = createCustomerFormStep1Schema.shape({
    postcode: Yup.string()
        .required("Postal Code is required")
        .test({
            name: "valid_postal_code",
            message: "Invalid Postal Code",
            test: (value, context) => {
                return new RegExp(context.parent[POSTAL_CODE_REGEX] ?? "").test(value ?? "");
            },
        }),
    unit: Yup.string().optional().max(50),
    street: Yup.string().required("Street is required").max(50),
    city: Yup.string().required("City is required").max(50),
    state: Yup.string().when(IS_STATE_REQUIRED, {
        is: (value) => value === true,
        then: (schema) => schema.required("State is required"),
        otherwise: (schema) => schema.nullable().optional(),
    }),
    language: Yup.string().optional().max(2),
    street_type: Yup.string().when("country", {
        is: (value) => value?.toUpperCase() === AUSTRALIA_ISO3,
        then: (schema) => schema.required("Street Type is required").max(50),
        otherwise: (schema) => schema.nullable().optional(),
    }),
    street_no: Yup.string().when("country", {
        is: (value) => value?.toUpperCase() === AUSTRALIA_ISO3,
        then: (schema) => schema.required("Street Number is required"),
        otherwise: (schema) => schema.nullable().optional(),
    }),
    address: Yup.string().required("Address is required"),
    [IS_STATE_REQUIRED]: Yup.bool(),
    register_agent_id: Yup.string().required("Select a partner"),
});

export const createCustomerFormStep3Schema = createCustomerFormStep2Schema.shape({
    id_issued_country: Yup.string().required("Required"),
    id_type: Yup.string().required("Required"),
    id_number: Yup.string().required("Required"),
    id_issue_date: Yup.string().required("Required"),
    id_expiry_date: Yup.string().when("id_type", {
        is: (documentType) => documentType?.toLowerCase() !== "citizenship",
        then: (schema) => schema.required("Required"),
    }),
    customer_documents: Yup.array().of(
        Yup.object().shape({
            side: Yup.string().required("Required"),
            document: Yup.mixed().when("side", {
                is: (side) => side !== CustomerDocumentSide.BACK,
                then: (schema) =>
                    schema
                        .required("Document is required")
                        .test({
                            message: "Please provide a supported file type jpeg, png",
                            test: (file, context) => {
                                const isValid = ["png", "jpeg", "jpg"].includes(file?.name?.split(".").pop());
                                if (!isValid) context?.createError();
                                return isValid;
                            },
                        })
                        .test("fileSize", "The file is too large", (value) => {
                            if (!value.length) return true;
                            return value[0].size <= 2000000;
                        }),
                otherwise: (schema) => schema.notRequired(),
            }),
        }),
    ),
});
