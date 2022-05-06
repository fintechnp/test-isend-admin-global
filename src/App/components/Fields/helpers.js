import React from "react";
import { FormHelperText } from "@mui/material";

export const renderFromHelper = ({ touched, error }) => {
    if (!(touched && error)) {
        return;
    } else {
        return (
            <FormHelperText sx={{ color: "warning.main" }}>
                {touched && error}
            </FormHelperText>
        );
    }
};
