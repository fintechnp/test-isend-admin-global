import Box from "@mui/material/Box";

export default function Row(props) {
    const { children, ...rest } = props;

    return (
        <Box role="row" {...rest} display="flex" flexDirection="row">
            {children}
        </Box>
    );
}
