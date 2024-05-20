import Cookies from "js-cookie";
import React, { createContext, useContext, Component } from "react";

import store from "./../store";
import authService from "./authHelper";
import isEmpty from "App/helpers/isEmpty";
import actions from "Common/store/actions";
import showToast from "../components/Toast";
import AuthUtility from "App/utils/AuthUtility";
import { preserveIntendedPath } from "App/routes";

const initialState = {
    authStatusReported: false,
    isUserLoggedIn: false,
    currentUser: {},
    loginUser: async (credentials) => {
        try {
            const res = await authService.signIn(credentials);
            return res;
        } catch (err) {
            showToast(err?.data);
            throw err;
        }
    },
    logoutUser: () => {
        initialState.isUserLoggedIn = false;
        Object.keys(Cookies.get()).forEach(function (cookie) {
            Cookies.remove(cookie);
        });
        localStorage.clear();
        window.location.reload();
    },
    permissions: [],
    roles: [],
};

export const AuthContext = createContext(initialState);

export default class AuthProvider extends Component {
    state = initialState;

    setPermissions = (permissions) => {
        this.setState({
            ...this.state,
            permissions,
        });
    };

    setRoles = (roles) => {
        this.setState({
            ...this.state,
            roles,
        });
    };

    componentDidMount = async () => {
        // @ignore check for reset password
        if (window.location.pathname.startsWith("/reset/")) return;

        this.setState({
            setUserData: (data) => {
                this.setState({
                    authStatusReported: true,
                    isUserLoggedIn: true,
                    currentUser: data,
                });
            },
        });

        const token = AuthUtility.getAccessToken();

        if (isEmpty(token)) {
            AuthUtility.logOut();
            this.setState({
                authStatusReported: true,
                isUserLoggedIn: false,
                currentUser: {},
            });
        } else {
            await this.verifyToken(token);
        }
    };

    verifyToken = async (token) => {
        const user = JSON.parse(localStorage.getItem("user"));
        try {
            if (AuthUtility.isLoggedIn() && user) {
                this.setState({
                    authStatusReported: true,
                    isUserLoggedIn: true,
                    currentUser: user,
                });
                store.dispatch({
                    type: "GET_ALL_COUNTRY",
                });
                store.dispatch({
                    type: "GET_SEND_COUNTRY",
                });
                store.dispatch({
                    type: actions.GET_USER_MENUS_AND_PERMISSIONS,
                });
                store.dispatch({
                    type: "GET_ALL_REFERENCE",
                    query: {
                        page_number: 1,
                        page_size: 100,
                    },
                });
            } else {
                this.setState({
                    authStatusReported: true,
                    isUserLoggedIn: false,
                    currentUser: {},
                });
                Object.keys(Cookies.get()).forEach(function (cookie) {
                    Cookies.remove(cookie);
                });
                localStorage.clear();
            }
        } catch (err) {
            preserveIntendedPath();
            this.setState({
                authStatusReported: true,
                isUserLoggedIn: false,
                currentUser: {},
            });
            Object.keys(Cookies.get()).forEach(function (cookie) {
                Cookies.remove(cookie);
            });
            localStorage.clear();
            store.dispatch({
                type: "SET_TOAST_DATA",
                data: err?.data,
            });
        }
    };

    render() {
        const { children } = this.props;
        return (
            <AuthContext.Provider
                value={{
                    ...this.state,
                    permissions: this.state.permissions,
                    setPermissions: this.setPermissions,
                    roles: this.state.roles,
                    setRoles: this.setRoles,
                }}
            >
                {children}
            </AuthContext.Provider>
        );
    }
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthConsumer = AuthContext.Consumer;

export { default as authService } from "./authHelper";
