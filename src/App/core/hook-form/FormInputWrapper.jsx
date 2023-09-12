/* eslint-disable max-len */
import { FormLabel } from "@mui/material";
import Box from "@mui/material/Box";

import FormHelperText from "@mui/material/FormHelperText";

export default function FormInputWrapper({ label, children, errorMessage }) {
    return (
        <Box display="flex" flexDirection="column">
            {label && (
                <Box sx={{ mb: "4px" }}>
                    <FormLabel>{label}</FormLabel>
                </Box>
            )}
            <Box>{children}</Box>
            {errorMessage && (
                <Box
                    display="flex"
                    alignItems="center"
                    gap={0.8}
                    sx={{
                        mt: "12px",
                    }}
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M7.99998 14.6667C11.6666 14.6667 14.6666 11.6667 14.6666 8.00001C14.6666 4.33334 11.6666 1.33334 7.99998 1.33334C4.33331 1.33334 1.33331 4.33334 1.33331 8.00001C1.33331 11.6667 4.33331 14.6667 7.99998 14.6667Z"
                            stroke="#D82809"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M8 5.33334V8.66668"
                            stroke="#D82809"
                            strokeWidth="1.25"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M7.99634 10.6667H8.00233"
                            stroke="#D82809"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <FormHelperText
                        sx={{
                            fontSize: "0.9rem",
                            lineHeight: "1.2rem",
                        }}
                        error
                    >
                        {errorMessage}
                    </FormHelperText>
                </Box>
            )}
        </Box>
    );
}
