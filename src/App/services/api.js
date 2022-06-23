import axios from "axios";
import Cookies from "js-cookie";

let store;
export const injectStore = (_store) => {
    store = _store;
};

export default class Api {
    constructor(setToken = true) {
        this.axiosFunction = axios.create({
            baseURL: (process.env.REACT_APP_API_BASE_URL || "") + "/api/",
        });
        if (setToken) {
            this.setToken();
        }
    }

    setToken = () => {
        this.axiosFunction.interceptors.request.use(
            (config) => {
                config.headers["Authorization"] =
                    "Bearer " + Cookies.get("token");
                config.headers["source"] = "web";
                config.headers["Accept"] = "application/json";
                config.headers["Content-Type"] = "application/json";
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.axiosFunction.interceptors.response.use(
            (response) => {
                return response;
            },
            function (error) {
                console.log(error, "error");
                if (error?.response?.status === 401) {
                    console.log(error?.response?.status, "status");
                    store.dispatch({
                        type: "INVALID_TOKEN",
                    });
                }
                return Promise.reject(error);
            }
        );
    };

    get = (url, data, headers = null) => {
        if (headers) {
            for (const header in headers) {
                if (headers[header]) {
                    this.axiosFunction.defaults.headers[header] =
                        headers[header];
                }
            }
        }
        return this.axiosFunction
            .get(url, { params: data })
            .then((response) => response.data)
            .catch((err) => {
                throw err?.response;
            });
    };

    post = (url, data, headers = null) => {
        if (headers) {
            for (const header in headers) {
                if (headers[header]) {
                    this.axiosFunction.defaults.headers[header] =
                        headers[header];
                }
            }
        }
        return this.axiosFunction
            .post(url, data)
            .then((response) => response.data)
            .catch((err) => {
                throw err?.response;
            });
    };

    put = (url, data) => {
        return this.axiosFunction
            .put(url, data)
            .then((response) => response.data)
            .catch((err) => {
                throw err?.response;
            });
    };

    patch = (url, data) => {
        return this.axiosFunction
            .patch(url, data)
            .then((response) => response.data)
            .catch((err) => {
                throw err?.response;
            });
    };

    delete = (url) => {
        return this.axiosFunction
            .delete(url)
            .then((response) => response.data)
            .catch((err) => {
                throw err?.response;
            });
    };

    getJSONToQueryStr = (jsonData = {}) =>
        Object.keys(jsonData)
            .map((k) => k + "=" + jsonData[k])
            .join("&");
}
