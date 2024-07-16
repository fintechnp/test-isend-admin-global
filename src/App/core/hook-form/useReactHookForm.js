import { useForm, useFormContext } from "react-hook-form";

const useReactHookForm = (props) => {
    const methods = useForm({
        mode: "onBlur",
        reValidateMode: "onChange",
        shouldFocusError: true,
        shouldUnregister: false,
        ...props,
    });

    const setErrors = (errors) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(errors)) {
            // TODO: This casing issue in normally must be fixed in backend but it is fixed in frontend
            const nestedNames = key.split(".");
            const name = nestedNames.map((n) => `${n.charAt(0).toLowerCase()}${n.substring(1)}`).join(".");
            methods.setError(name, {
                type: "manual",
                message: value[0],
            });
        }
    };

    const setValues = (values) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(values)) {
            methods.setValue(key, value);
        }
    };

    return {
        ...methods,
        setErrors,
        setValues,
    };
};

export default useReactHookForm;

export const useReactHookFormContext = () => {
    const methods = useFormContext();

    const setErrors = (errors) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(errors)) {
            // TODO: This casing issue in normally must be fixed in backend but it is fixed in frontend
            const nestedNames = ke.split(".");
            const name = nestedNames.map((n) => `${n.charAt(0).toLowerCase()}${n.substring(1)}`).join(".");
            methods.setError(name, {
                type: "manual",
                message: value[0],
            });
        }
    };

    const setValues = (values) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(values)) {
            methods.setValue(key, value);
        }
    };

    return {
        ...methods,
        setErrors,
        setValues,
    };
};
