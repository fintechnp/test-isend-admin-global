import React from "react";
import PropTypes from "prop-types";
import { FormProvider } from "react-hook-form";

export default function HookForm({ children, onSubmit, encType, ...rest }) {
    return (
        <FormProvider {...rest}>
            <form onSubmit={rest?.handleSubmit(onSubmit)} {...{ encType: encType }}>
                {children}
            </form>
        </FormProvider>
    );
}

HookForm.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    onSubmit: PropTypes.func,
    enctype: PropTypes.oneOf(["multipart/form-data", "application/x-www-form-urlencoded", "text/plain"]),
};
