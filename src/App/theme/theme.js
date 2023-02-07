import { default as DarkPalette } from "./dark";
import { default as LightPalette } from "./light";
import { createTheme } from "@mui/material/styles";

export const ChangeTheme = (mode = true) => {
    const theme = createTheme({
        components: {
            MuiCssBaseline: {
                styleOverrides: `
      "@global": {
        "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
        },
        html: {
            height: "100%",
        },
        body: {
            height: "100%",
            backgroundColor: "#fff",
            lineHeight: 1.42857,
        },
        "::-webkit-scrollbar": {
            width: 6,
            height: 5,
        },
        "::-webkit-scrollbar-track": {
            backgroundColor: "#e8e6e6",
            // borderRight: '14px solid #696f78',
        },
        "::-webkit-scrollbar-thumb": {
            backgroundClip: "padding-box",
            backgroundColor: "#999999",
            borderRadius: "99px",
        },
    },`,
            },
        },
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
        palette: mode ? LightPalette : DarkPalette,
        typography: {
            fontFamily: "'Poppins', sans-serif",
        },
    });

    return theme;
};
