const validators = {
    emailValidator: (value) => {
        if (!value) {
            return "This field is required";
        }
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
            return "Invalid email address";
        }
        return undefined;
    },
    emptyValidator: (value) =>
        value || value === 0 ? undefined : "This field is required",
    passwordValidator: (value) => {
        if (!value) {
            return "This field is required";
        }
        if ((value && value.length < 8) || value.length > 20) {
            return "The Password must be at least 8 and at max 20 characters long.";
        }
        if (
            value &&
            !/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,20}$/.test(
                value
            )
        ) {
            return "Must contain at least one lowercase and one uppercase, one symbol and one number.";
        }
        return undefined;
    },
    confirmValidator: (value, values) => {
        if (value === undefined) {
            return "This field is required";
        }
        return value !== undefined &&
            value !== "" &&
            (value === values.password || value === values.new_password)
            ? undefined
            : `Make sure this field matches with Password Field`;
    },
    branchValidator: (value, reg) => {
        const string = "^" + reg.description;
        const matcher = RegExp(`${string}`);
        if (value === undefined) {
            return "This field is required";
        }
        if (value && !matcher.test(value)) {
            return `The ${reg.value} code is incorrect.`;
        }
        return undefined;
    },
    mobileValidator: (value) => {
        if (!value) {
            return undefined;
        }
        if (value && !/^\d{8,12}$/.test(value)) {
            return "Invalid Mobile Number";
        }
        return undefined;
    },
    integerValidator: (value) =>
        /^\+?(0|[1-9]\d*)$/.test(value)
            ? undefined
            : "Only integers are accepted",
    oneValidator: (value) =>
        value >= 1 ? undefined : "Cannot send less than 1 Singapore dollar.",
    maxLength1: (value) =>
        value && value.length > 1 ? `Must be 1 characters or less` : undefined,
    maxLength2: (value) =>
        value && value.length > 2 ? `Must be 2 characters or less` : undefined,
    maxLength3: (value) =>
        value && value.length > 3 ? `Must be 3 characters or less` : undefined,
    maxLength5: (value) =>
        value && value.length > 5 ? `Must be 5 characters or less` : undefined,
    maxLength7: (value) =>
        value && value.length > 7 ? `Must be 7 characters or less` : undefined,
    maxLength10: (value) =>
        value && value.length > 10
            ? `Must be 10 characters or less`
            : undefined,
    maxLength20: (value) =>
        value && value.length > 20
            ? `Must be 20 characters or less`
            : undefined,
    maxLength50: (value) =>
        value && value.length > 50
            ? `Must be 50 characters or less`
            : undefined,
    maxLength100: (value) =>
        value && value.length > 100
            ? `Must be 100 characters or less`
            : undefined,
    maxLength160: (value) =>
        value && value.length > 160
            ? `Must be 160 characters or less`
            : undefined,
    minValue1: (value) =>
        value && value.length < 1 ? `Must be at least 1` : undefined,
    minValue3: (value) =>
        value && value.length < 3 ? `Must be at least 3` : undefined,
    minValue8: (value) =>
        value && value.length < 8 ? `Must be at least 8` : undefined,
};

export default validators;
