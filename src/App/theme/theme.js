import { default as DarkPalette } from "./dark";
import { default as LightPalette } from "./light";
import { createTheme } from "@mui/material/styles";

export const fonts = {
    primary: "Poppins",
    secondary: "Poppins",
};

export const inputBorderRadius = {
    outer: "8px",
    inner: "4px",
};

export const buttonBorderRadius = {
    outer: "4px",
};

export const ChangeTheme = (mode = true) => {
    const theme = createTheme({
        typography: {
            fontFamily: '"Poppins", sans-serif',
        },
        palette: mode ? LightPalette : DarkPalette,
        overrides: {
            MuiPaper: {
                root: {
                    maxWidth: "100%",
                },
            },
            MuiAppBar: {
                root: {
                    width: "none",
                },
                positionFixed: {
                    right: "auto",
                    maxWidth: "100%",
                },
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: `
                    "@global": {
                            "*": {
                                margin: 0,
                                padding: 0,
                                boxSizing: "border-box",
                            },
                        },`,
            },
            MuiTypography: {
                variants: [
                    {
                        props: { variant: "h1" },
                        style: { fontFamily: fonts.primary },
                    },
                    {
                        props: { variant: "h2" },
                        style: { fontFamily: fonts.primary },
                    },
                    {
                        props: { variant: "h3" },
                        style: { fontFamily: fonts.primary },
                    },
                    {
                        props: { variant: "h4" },
                        style: { fontFamily: fonts.primary },
                    },
                    {
                        props: { variant: "h5" },
                        style: { fontFamily: fonts.primary },
                    },
                    {
                        props: { variant: "h6" },
                        style: {
                            fontFamily: fonts.primary,
                            fontSize: "1.286rem",
                            lineHeight: "1.786rem",
                            fontWeight: 600,
                        },
                    },
                    {
                        props: { variant: "subtitle0" },
                        style: {
                            fontFamily: fonts.secondary,
                            fontWeight: 600,
                            fontSize: "1.143rem",
                            lineHeight: "1.714rem",
                        },
                    },
                    {
                        props: { variant: "subtitle1" },
                        style: { fontFamily: fonts.secondary },
                    },
                    {
                        props: { variant: "subtitle2" },
                        style: { fontFamily: fonts.secondary },
                    },

                    {
                        props: { variant: "body1" },
                        style: { fontFamily: fonts.secondary },
                    },
                    {
                        props: { variant: "body2" },
                        style: { fontFamily: fonts.secondary },
                    },
                    {
                        props: { variant: "caption" },
                        style: { fontFamily: fonts.secondary },
                    },
                ],
                styleOverrides: {
                    root: {},
                },
            },
            MuiButtonBase: {
                styleOverrides: {
                    root: {
                        textTransform: "none",
                        "*": {
                            fontFamily: fonts.secondary,
                        },
                    },
                },
            },
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
                variants: [
                    // {
                    //     props: {
                    //         size: "large",
                    //     },
                    //     style: {
                    //         padding: "14px 32px 14px 32px",
                    //         fontSize: "1rem",
                    //         lineHeight: "1.5rem",
                    //     },
                    // },
                ],
                styleOverrides: {
                    root: ({ ownerState, theme }) => ({
                        borderRadius: buttonBorderRadius.outer,
                        textTransform: "capitalize",
                    }),
                },
            },
            MuiCssBaseline: {
                styleOverrides: (theme) => ({
                    "& .Mui-disabled": {
                        cursor: "not-allowed",
                        "& *": {
                            cursor: "not-allowed !important",
                        },
                    },
                }),
            },
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        "&:disabled": {
                            cursor: "not-allowed",
                            pointerEvents: "all !important",
                        },
                    },
                },
            },
            MuiDivider: {
                styleOverrides: {
                    root: ({ ownerState, theme }) => ({
                        ...ownerState,
                        borderColor: theme.palette.grey[300],
                    }),
                },
            },
            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        fontSize: "1rem",
                    },
                },
            },
            MuiFormLabel: {
                styleOverrides: {
                    root: {
                        fontFamily: fonts.secondary,
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        fontFamily: fonts.secondary,
                        "&:hover fieldset": {
                            border: `1px solid ${theme.palette.secondary.main} !important`,
                        },
                        "&:focus-within fieldset, &:focus-visible fieldset": {
                            border: `1px solid ${theme.palette.secondary.main} !important`,
                        },
                    }),
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        borderRadius: inputBorderRadius.outer,
                        fontFamily: fonts.secondary,
                        "&:hover fieldset": {
                            border: `1px solid ${theme.palette.secondary.main} !important`,
                        },
                        "&:focus-within fieldset, &:focus-visible fieldset": {
                            border: `1px solid ${theme.palette.secondary.main} !important`,
                        },
                    }),
                },
            },
            MuiSelect: {
                styleOverrides: {
                    outlined: ({ theme }) => ({
                        borderRadius: inputBorderRadius.outer,
                        "&:hover fieldset": {
                            border: `1px solid ${theme.palette.secondary.main} !important`,
                        },
                        "&:focus-within fieldset, &:focus-visible fieldset": {
                            border: `1px solid ${theme.palette.secondary.main} !important`,
                        },
                    }),
                },
            },
            MuiFormHelperText: {
                styleOverrides: {
                    root: {
                        fontFamily: fonts.secondary,
                    },
                },
            },
            MuiTableHead: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        "& .MuiTableCell-root": {
                            background: theme.palette.primary.main,
                            fontFamily: fonts.secondary,
                            lineHeight: "1.5rem",
                            color: theme.palette.common.white,
                            "& .MuiTypography-root": {
                                color: theme.palette.common.white,
                                fontFamily: fonts.secondary,
                                lineHeight: "1.5rem",
                            },
                        },
                    }),
                },
            },
            MuiTableBody: {
                styleOverrides: {
                    root: {
                        "& .MuiTableCell-root,.MuiTypography-root": {
                            fontFamily: fonts.secondary,
                            lineHeight: "1.5rem",
                            "& .MuiTypography-root": {
                                fontFamily: fonts.secondary,
                                lineHeight: "1.5rem",
                            },
                        },
                    },
                },
            },
            MuiMenuItem: {
                styleOverrides: {
                    root: {
                        fontFamily: fonts.secondary,
                    },
                },
            },
            MuiListItem: {
                styleOverrides: {
                    root: {
                        "& .MuiTypography-root": {
                            fontFamily: fonts.secondary,
                        },
                    },
                },
            },
        },
    });

    return theme;
};
