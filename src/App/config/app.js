const app = {
    name: import.meta.REACT_APP_NAME ?? "iSend",

    isDevelopmentMode: import.meta.env.MODE === "development",
};

export default app;
