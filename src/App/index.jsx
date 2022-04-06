import React from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { PersistGate } from "redux-persist/integration/react";
import CssBaseline from "@mui/material/CssBaseline";

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
