import Cookies from "js-cookie";
import { Provider } from "react-redux";
import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import GlobalStyles from "@mui/material/GlobalStyles";

import ErrorBoundary from "./components/ErrorBoundary";

import store from "./store";
import MainRoutes from "./routes";
import AuthProvider from "./auth";
import { ChangeTheme } from "./theme/theme";
import { injectStore } from "./services/api";
import { ConfirmProvider } from "./core/mui-confirm";

injectStore(store);

const App = () => {
    const [mode, setMode] = React.useState(true);
    const token = Cookies.get("token");

    useEffect(() => {
        if (token === "undefined" || token === undefined) {
            setMode(true);
        }
    }, [token]);

    return (
        <ThemeProvider theme={ChangeTheme(mode)}>
            <ConfirmProvider>
                <AuthProvider>
                    <Provider store={store}>
                        <HelmetProvider>
                            <ErrorBoundary>
                                <BrowserRouter>
                                    <CssBaseline enableColorScheme />
                                    <GlobalStyles
                                        styles={{
                                            h1: { color: "grey" },
                                            "& .isend__sidebar": {
                                                "*::-webkit-scrollbar": {
                                                    width: "0.3em",
                                                    height: "0.3em",
                                                    right: "12px",
                                                },
                                                "*::-webkit-scrollbar-track": {
                                                    WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                                                },
                                                "*::-webkit-scrollbar-thumb": {
                                                    backgroundColor: `${ChangeTheme(mode).palette.border.dark}`,
                                                    outline: `1px solid ${ChangeTheme(mode).palette.border.dark}`,
                                                    borderRadius: "4px",
                                                },
                                            },
                                        }}
                                    />
                                    <MainRoutes setMode={setMode} />
                                    <Toaster />
                                </BrowserRouter>
                            </ErrorBoundary>
                        </HelmetProvider>
                    </Provider>
                </AuthProvider>
            </ConfirmProvider>
        </ThemeProvider>
    );
};

export default App;
