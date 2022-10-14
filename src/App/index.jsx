import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";

import MainRoutes from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { injectStore } from "./services/api";
import store, { persistor } from "./store";
import AuthProvider from "./auth";
import { ChangeTheme } from "./theme/theme";

injectStore(store);

const App = () => {
    const [mode, setMode] = React.useState(true);

    useEffect(() => {

    }, []);

    return (
        <ThemeProvider theme={ChangeTheme(mode)}>
            <AuthProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <ErrorBoundary>
                            <BrowserRouter>
                                <CssBaseline enableColorScheme />
                                <GlobalStyles
                                    styles={{
                                        h1: { color: "grey" },
                                        "*::-webkit-scrollbar": {
                                            width: "0.3em",
                                            height: "0.3em",
                                            right: "12px",
                                        },
                                        "*::-webkit-scrollbar-track": {
                                            WebkitBoxShadow:
                                                "inset 0 0 6px rgba(0,0,0,0.00)",
                                        },
                                        "*::-webkit-scrollbar-thumb": {
                                            backgroundColor: `${
                                                ChangeTheme(mode).palette.border
                                                    .dark
                                            }`,
                                            outline: `1px solid ${
                                                ChangeTheme(mode).palette.border
                                                    .dark
                                            }`,
                                            borderRadius: "4px",
                                        },
                                    }}
                                />
                                <MainRoutes setMode={setMode} />
                                <Toaster />
                            </BrowserRouter>
                        </ErrorBoundary>
                    </PersistGate>
                </Provider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;
