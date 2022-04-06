import React, { createContext, useContext, Component } from "react";
import Cookies from "js-cookie";
import authService from "./authHelper";
import store from "./../store";

const initialState = {
    authStatusReported: false,
    isUserLoggedIn: false,
    currentUser: {},
    loginUser: async (credentials) => {
        try {
            const res = await authService.signIn(credentials);
            return res;
        } catch (err) {
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
    setToken: (token) => {
        Cookies.set("token", token);
    },
    getToken: () => {
        return Cookies.get("token");
    },
    setUserData: () => {},
    setUserRegister: () => {},
};

export const AuthContext = createContext(initialState);

export default class AuthProvider extends Component {
    state = initialState;

    componentDidMount = async () => {
        this.setState({
            setUserData: (data) => {
                localStorage.setItem("user", JSON.stringify(data));
                this.setState({
                    authStatusReported: true,
                    isUserLoggedIn: true,
                    currentUser: data,
                });
            },
        });

        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            this.setState({
                authStatusReported: true,
                isUserLoggedIn: true,
                currentUser: user,
            });
        } else {
            this.setState({
                authStatusReported: true,
                isUserLoggedIn: false,
                currentUser: {},
            });
        }

        const token = Cookies.get("token");
        if (token === "undefined" || token === undefined || token === "") {
            Object.keys(Cookies.get()).forEach(function (cookie) {
                Cookies.remove(cookie);
            });
            localStorage.clear();
            this.setState({
                authStatusReported: true,
                isUserLoggedIn: false,
                currentUser: {},
            });
        } else {
            store.dispatch({
                type: "USER_DETAILS",
            });
            store.dispatch({
                type: "GET_ALL_COUNTRY",
            });
            store.dispatch({
                type: "GET_ALL_REFERENCE",
            });
        }
    };

    render() {
        const { children } = this.props;
        const { authStatusReported } = this.state;
        return authStatusReported ? (
            <>
                <AuthContext.Provider value={this.state}>
                    {children}
                </AuthContext.Provider>
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
