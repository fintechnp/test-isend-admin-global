import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import darkScrollbar from "@mui/material/darkScrollbar";

import MainRoutes from "./routes";
import ErrorBoundary from "./components/ErrorBoundary";
import { injectStore } from "./services/api";
import store, { persistor } from "./store";
import AuthProvider from "./auth";
import theme from "./theme/theme";

injectStore(store);

const App = () => {
    return (
        <ThemeProvider theme={theme}>
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
                                            width: "0.4em",
                                        },
                                        "*::-webkit-scrollbar-track": {
                                            "-webkit-box-shadow":
                                                "inset 0 0 6px rgba(0,0,0,0.00)",
                                        },
                                        "*::-webkit-scrollbar-thumb": {
                                            backgroundColor: "rgba(0,0,0,.1)",
                                            outline: "1px solid slategrey",
                                            borderRadius: "6px",
                                        },
                                    }}
                                />
                                <MainRoutes />
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
