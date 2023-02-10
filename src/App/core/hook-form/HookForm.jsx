import React from "react";
import PropTypes from "prop-types";
import { FormProvider } from "react-hook-form";

export default function HookForm({ children, onSubmit, ...rest }) {
    return (
        <FormProvider {...rest}>
            <form onSubmit={rest?.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
}

HookForm.propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
    onSubmit: PropTypes.func,
};
