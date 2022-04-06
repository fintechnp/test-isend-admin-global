import React, { Component } from "react";
import { Routes, Navigate } from "react-router-dom";
import PrivateLayout from "../../layouts/PrivateLayout";
import { AuthConsumer } from "../../auth";
import { Route } from "react-router-dom";
import { privateRoutes } from "../../../Private";
// import { PageNotFound } from "../PageNotFound";

class PrivateArea extends Component {
    render() {
        return (
            <AuthConsumer>
                {(authContext) =>
                    authContext && authContext.isUserLoggedIn ? (
                        <PrivateLayout>
                            <Routes>
                                {privateRoutes.map((route) => (
                                    <Route
                                        key={route.path}
                                        path={route.path}
                                        element={route.component}
                                    />
                                ))}
                                {/* <Route path="*" element={<PageNotFound />} />; */}
                            </Routes>
                        </PrivateLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            </AuthConsumer>
        );
    }
}

export default PrivateArea;
