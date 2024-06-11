const app = {
    name: import.meta.env.REACT_APP_NAME,

    isDevelopmentMode: import.meta.env.MODE === "development",

    apiBaseUrl: import.meta.env.REACT_APP_API_BASE_URL,

    defaultSendingCountry: "SGP",

    copyrightText: {
        SGP: import.meta.env.REACT_APP_COPYRIGHT_TEXT_SGP,
        AUS: import.meta.env.REACT_APP_COPYRIGHT_TEXT_AUS,
        USA: import.meta.env.REACT_APP_COPYRIGHT_TEXT_USA,
    },
};

export default app;
