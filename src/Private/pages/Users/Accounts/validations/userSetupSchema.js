import * as Yup from "yup";
import YupPassword from "yup-password";

import { GenderString } from "App/data/Gender";

YupPassword(Yup);

export const createUserSetupSchema = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    gender: Yup.string().oneOf(Object.values(GenderString)),
    phone_number: Yup.string()
        .required("Required")
        .max(15, "Max 15 digits")
        .test("is-valid-phone", "Invalid phone number", (value) => {
            // Define your custom phone number validation logic here
            // For example, you might check if the phone number format is valid
            // or if it matches a specific pattern
            // This is a simplified example checking for a numeric value
            return /^\d+$/.test(value); // Check if value consists only of digits
        }),
    email: Yup.string().required("Required"),
    password: Yup.string()
        .required("Password is required")
        .min(8, "Password must contain 8 or more characters")
        .minLowercase(1, "Password must contain at least 1 lower case letter")
        .minUppercase(1, "Password must contain at least 1 upper case letter")
        .minNumbers(1, "Password must contain at least 1 number")
        .minSymbols(1, "Password must contain at least 1 special character"),
    confirm_password: Yup.string()
        .required("Please retype your password.")
        .oneOf([Yup.ref("password")], "Your passwords do not match."),
    is_active: Yup.bool().required("Required"),
    user_profile: Yup.array(Yup.string()).required("Required"),
});

export const updateUserSetupSchema = Yup.object().shape({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    gender: Yup.string().oneOf(Object.values(GenderString)),
    phone_number: Yup.string()
        .required("Required")
        .max(15, "Max 15 digits")
        .test("is-valid-phone", "Invalid phone number", (value) => {
            // Define your custom phone number validation logic here
            // For example, you might check if the phone number format is valid
            // or if it matches a specific pattern
            // This is a simplified example checking for a numeric value
            return /^\d+$/.test(value); // Check if value consists only of digits
        }),
    email: Yup.string().required("Required"),
    is_active: Yup.bool().required("Required"),
    user_profile: Yup.array(Yup.string()).required("Required"),
});
