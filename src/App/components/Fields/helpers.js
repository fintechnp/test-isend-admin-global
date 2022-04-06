import React from "react";
import { FormHelperText } from "@mui/material";

export const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return;
    } else {
        return (
            <FormHelperText style={{ color: "red" }}>
                {touched && error}
            </FormHelperText>
        );
    }
};
