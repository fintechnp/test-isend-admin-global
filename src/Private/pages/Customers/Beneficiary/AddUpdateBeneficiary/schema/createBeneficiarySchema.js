import isEmpty from "App/helpers/isEmpty";
import * as Yup from "yup";

export const form1Schema = Yup.object().shape({
    relation: Yup.string().required("Relation is required"),
    first_name: Yup.string().required("First Name is required").max(50, "Maximum 50 characters allowed"),
    middle_name: Yup.string().nullable().max(50, "Maximum 50 characters allowed"),
    last_name: Yup.string().nullable().max(50, "Maximum 50 characters allowed"),
});

export const form2Schema = form1Schema.concat(
    Yup.object().shape({
        country: Yup.string().required("Country is required"),
        city: Yup.string().required("City is required"),
        street: Yup.string().required("Street is required"),
        mobile_number: Yup.string()
            .required("Phone Number is required")
            .matches(/^\d{8,12}$/, "Invalid Mobile Number")
            .nullable(),
        date_of_birth: Yup.string().required("Date of birth is required"),
    }),
);

export const form3Schema = form2Schema.concat(
    Yup.object().shape({
        delivery_option_id: Yup.string().required("Deliver Option is required"),
        account_number: Yup.string().when("delivery_option_id", {
            is: (value) => {
                return !isEmpty(value) && +value === 3;
            },
            then: (schema) => schema.required("Account number is required"),
        }),
        branch_identifier_type: Yup.string().nullable(),
        branch_identifier_value: Yup.string().when("branch_identifier_type", {
            is: (value) => {
                return !isEmpty(value);
            },
            then: (schema) =>
                schema.required("Required").test({
                    name: "valid_identifier_value",
                    message: "Invalid Branch Identifier ",
                    test: (value, context) => {
                        return new RegExp(context.parent.beneficiary_form_payout_branch_identifier_value_regex).test(
                            value ?? "",
                        );
                    },
                }),
            otherwise: (schema) => schema.nullable(),
        }),
    }),
);

const createBeneficiarySchema = form3Schema;

export default createBeneficiarySchema;
