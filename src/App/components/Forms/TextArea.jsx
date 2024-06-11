import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";

// References: https://mui.com/base-ui/react-textarea-autosize/
export default function TextArea({ error, style, ...rest }) {
    const theme = useTheme();

    return (
        <textarea
            rows={6}
            {...rest}
            style={{
                boxSizing: "border-box",
                width: "100%",
                padding: "8px 12px",
                borderRadius: "4px",
                border: `1px solid ${theme.palette.grey[400]}`,
                outline: 0,
                "&:focusVisible": {
                    outline: 0,
                },
                ...style,
                ...(error
                    ? {
                          border: `1px solid ${theme.palette.error.main}`,
                      }
                    : {}),
            }}
        />
    );
}

TextArea.propTypes = {
    error: PropTypes.bool,
};
