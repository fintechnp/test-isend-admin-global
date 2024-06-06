import Box from "@mui/material/Box";

export default function Row(props) {
    const { children, ...rest } = props;

    return (
        <Box role="row" flex={1} {...rest} display="flex" flexDirection="row">
            {children}
        </Box>
    );
}
