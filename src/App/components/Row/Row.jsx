import Box from "@mui/material/Box";

export default function Row(props) {
    const { children, ...rest } = props;

    return (
        <Box width="100%" {...rest} display="flex" flexDirection="row">
            {children}
        </Box>
    );
}
