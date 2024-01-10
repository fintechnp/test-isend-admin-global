import React, { createContext, useContext, Component } from "react";
import Cookies from "js-cookie";
import authService from "./authHelper";
import showToast from "../components/Toast";
import Api from "./../services/api";
import store from "./../store";
import { preserveIntendedPath } from "App/routes";
import AuthUtility from "App/utils/AuthUtility";

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
};

export const AuthContext = createContext(initialState);

export default class AuthProvider extends Component {
    state = initialState;

    componentDidMount = async () => {
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

        if (token === "undefined" || token === undefined) {
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
        const api = new Api(false);
        const user = JSON.parse(localStorage.getItem("user"));
        try {
            
            // const res = await api.post("/health-check", {
            //     token,
            // });

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
        const { authStatusReported } = this.state;
        return authStatusReported ? (
            <>
                <AuthContext.Provider value={this.state}>{children}</AuthContext.Provider>
            </>
        ) : (
            <></>
        );
    }
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthConsumer = AuthContext.Consumer;

export { default as authService } from "./authHelper";
