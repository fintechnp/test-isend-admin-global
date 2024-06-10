import PropTypes from "prop-types";
import Row from "App/components/Row/Row";
import MuiChip from "@mui/material/Chip";
import capitalize from "lodash/capitalize";
import { alpha, useTheme, styled } from "@mui/material/styles";

const Chip = styled(MuiChip)(() => ({
    height: "25px",
    "& .MuiChip-label": {
        fontSize: "1rem",
        "& .MuiBox-root": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "4px",
        },
        svg: {
            height: "16px",
            width: "16px",
        },
    },
}));

export default function KycStatusBadge({ status, label }) {
    const theme = useTheme();

    const colors = {
        R: theme.palette.error.main,
        P: theme.palette.warning.main,
        N: theme.palette.grey[800],
        C: theme.palette.success.main,
        I: theme.palette.primary.main,
        E: theme.palette.warning.main,
    };

    const surfaceColors = {
        R: theme.palette.surface.dangerSecond,
        C: theme.palette.surface.successSecond,
        E: theme.palette.warning.warningSecond,
    };

    const icons = {
        R: (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6 1.00977C3.245 1.00977 1 3.25477 1 6.00977C1 8.76477 3.245 11.0098 6 11.0098C8.755 11.0098 11 8.76477 11 6.00977C11 3.25477 8.755 1.00977 6 1.00977ZM7.68 7.15977C7.825 7.30477 7.825 7.54477 7.68 7.68977C7.605 7.76477 7.51 7.79977 7.415 7.79977C7.32 7.79977 7.225 7.76477 7.15 7.68977L6 6.53977L4.85 7.68977C4.775 7.76477 4.68 7.79977 4.585 7.79977C4.49 7.79977 4.395 7.76477 4.32 7.68977C4.175 7.54477 4.175 7.30477 4.32 7.15977L5.47 6.00977L4.32 4.85977C4.175 4.71477 4.175 4.47477 4.32 4.32977C4.465 4.18477 4.705 4.18477 4.85 4.32977L6 5.47977L7.15 4.32977C7.295 4.18477 7.535 4.18477 7.68 4.32977C7.825 4.47477 7.825 4.71477 7.68 4.85977L6.53 6.00977L7.68 7.15977Z"
                    fill={theme.palette.error.main}
                />
            </svg>
        ),
        C: (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6 1.00977C3.245 1.00977 1 3.25477 1 6.00977C1 8.76477 3.245 11.0098 6 11.0098C8.755 11.0098 11 8.76477 11 6.00977C11 3.25477 8.755 1.00977 6 1.00977ZM8.39 4.85977L5.555 7.69477C5.485 7.76477 5.39 7.80477 5.29 7.80477C5.19 7.80477 5.095 7.76477 5.025 7.69477L3.61 6.27977C3.465 6.13477 3.465 5.89477 3.61 5.74977C3.755 5.60477 3.995 5.60477 4.14 5.74977L5.29 6.89977L7.86 4.32977C8.005 4.18477 8.245 4.18477 8.39 4.32977C8.535 4.47477 8.535 4.70977 8.39 4.85977Z"
                    fill={theme.palette.success.main}
                />
            </svg>
        ),
        E: (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6 1.00977C3.245 1.00977 1 3.25477 1 6.00977C1 8.76477 3.245 11.0098 6 11.0098C8.755 11.0098 11 8.76477 11 6.00977C11 3.25477 8.755 1.00977 6 1.00977ZM5.625 4.00977C5.625 3.80477 5.795 3.63477 6 3.63477C6.205 3.63477 6.375 3.80477 6.375 4.00977V6.50977C6.375 6.71477 6.205 6.88477 6 6.88477C5.795 6.88477 5.625 6.71477 5.625 6.50977V4.00977ZM6.46 8.19977C6.435 8.26477 6.4 8.31476 6.355 8.36477C6.305 8.40977 6.25 8.44477 6.19 8.46977C6.13 8.49477 6.065 8.50977 6 8.50977C5.935 8.50977 5.87 8.49477 5.81 8.46977C5.75 8.44477 5.695 8.40977 5.645 8.36477C5.6 8.31476 5.565 8.26477 5.54 8.19977C5.515 8.13977 5.5 8.07477 5.5 8.00977C5.5 7.94477 5.515 7.87977 5.54 7.81977C5.565 7.75977 5.6 7.70477 5.645 7.65477C5.695 7.60977 5.75 7.57477 5.81 7.54977C5.93 7.49977 6.07 7.49977 6.19 7.54977C6.25 7.57477 6.305 7.60977 6.355 7.65477C6.4 7.70477 6.435 7.75977 6.46 7.81977C6.485 7.87977 6.5 7.94477 6.5 8.00977C6.5 8.07477 6.485 8.13977 6.46 8.19977Z"
                    fill={theme.palette.warning.main}
                />
            </svg>
        ),
    };

    const getColor = () => {
        return colors?.[status?.toUpperCase()] ?? theme.palette.primary.main;
    };

    const getSurfaceColor = () => {
        return surfaceColors?.[status?.toUpperCase];
    };

    return (
        <Chip
            size="small"
            sx={{
                backgroundColor: getSurfaceColor() ?? alpha(getColor(), 0.1),
                color: getColor(),
            }}
            label={
                <Row>
                    {icons[status?.toUpperCase()] ?? ""}
                    {capitalize(label?.toLowerCase() ?? "")}
                </Row>
            }
        />
    );
}

KycStatusBadge.propTypes = {
    status: PropTypes.string.isRequired,
};
