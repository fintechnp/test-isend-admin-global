import { alpha } from "@mui/material/styles";

const light = {
    mode: "light",
    primary: {
        light: "#4488d1",
        main: "#2D6FB5",
        dark: "#23568c",
        contrastText: "#ffffff",
    },
    secondary: {
        light: "#8680fb",
        main: "#574efa",
        dark: "#281cf9",
        contrastText: "#ffffff",
    },
    success: {
        light: "#28be76",
        main: "#1F945C",
        dark: "#166a42",
        contrastText: "#ffffff",
    },
    error: {
        light: "#e4606d",
        main: "#DC3545",
        dark: "#bd2130",
        contrastText: "#ffffff",
    },
    warning: {
        light: "#dc9d24",
        main: "#dc9d24",
        dark: "#b17e1c",
        contrastText: "#ffffff",
    },
    text: {
        secondary: alpha("#000000", 0.6),
        primary: alpha("#000000", 0.87),
        light: "#f5f5f5",
        main: "#707070",
        dark: "#1c1c1c",
        baseMain: "#252525",
        baseSecond: "#68727D",
    },
    border: {
        light: "#e6e6e6",
        main: "#bfbfbf",
        dark: "#808080",
    },
    background: {
        light: "#f5f5f5",
        main: "#e6e6e6",
        dark: "#fefefe",
        primarySecond: "#F1F7FE",
    },
    appbar: {
        main: "#fff",
        icon: "#2D6FB5",
    },
    surface: {
        1: "linear-gradient(116.82deg, #4980FF 0%, #00D4FF 100%)",
        primarySecond: "#E7EFF8",
        successSecond: "#E9F8F1",
        dangerSecond: "#FAE2E5",
        warningSecond: "#FDF6EA",
        purpleSecond: "#F9F8FB",
        secondarySecond: "#d7d5ff",
    },
    stroke: {
        primary: "#0D4992",
        base: "#EAEBF0",
    },
    cyan: { 300: "#4DD0E1" },
    indigo: {
        300: "#7986CB",
    },
};

export default light;
