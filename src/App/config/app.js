const app = {
    name: import.meta.REACT_APP_NAME ?? "iSend",

    isDevelopmentMode: import.meta.env.MODE === "development",

    apiBaseUrl: import.meta.env.REACT_APP_API_BASE_URL,

    defaultSendingCountry: "SGP",
};

export default app;
