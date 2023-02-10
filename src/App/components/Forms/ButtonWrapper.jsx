import Box from "@mui/material/Box";

export default function ButtonWrapper({ children }) {
    return (
        <Box display="flex" justifyContent="flex-end" gap={2}>
            {children}
        </Box>
    );
}
