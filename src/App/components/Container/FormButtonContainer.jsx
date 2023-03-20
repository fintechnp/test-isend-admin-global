import Box from "@mui/material/Box";

export default function FormButtonContainer({ children }) {
    return (
        <Box display="flex" justifyContent="flex-end" gap={2} sx={{ mt: 2 }}>
            {children}
        </Box>
    );
}
