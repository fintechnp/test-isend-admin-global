import axios from "axios";
import Cookies from "js-cookie";

import app from "App/config/app";
import { preserveIntendedPath } from "App/routes";
import { localStorageGet } from "App/helpers/localStorage";

let store;
export const injectStore = (_store) => {
    store = _store;
};

export default class Api {
    constructor(setToken = true) {
        const selectedCountry = localStorage.getItem("loginCountry");
        const baseUrl = app.apiBaseUrl.replace("{country}", selectedCountry?.toLowerCase());

        this.axiosFunction = axios.create({
            baseURL: baseUrl,
        });
        if (setToken) {
            this.setToken();
        }
    }

    setToken = () => {
        this.axiosFunction.interceptors.request.use(
            (config) => {
                config.headers["Authorization"] = "Bearer " + Cookies.get("token");
                config.headers["source"] = "web";
                config.headers["Accept"] = "application/json";
                config.headers["Content-Type"] = "application/json";
                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        this.axiosFunction.interceptors.response.use(
            (response) => {
                const pagination = response?.data?.pagination;
                const isPagination = !!pagination;
                const isDataArray = Array.isArray(response?.data?.data);
                if (!isPagination && isDataArray) {
                    const data = response?.data?.data?.map((item, index) => {
                        return { f_serial_no: index + 1, ...item };
                    });
                    const newResponseData = { ...response, data: { ...response?.data, data } };
                    return newResponseData;
                } else if (isPagination && isDataArray) {
                    const mData = response.data.data.map((item, index) => ({
                        f_serial_no: (pagination.currentPage - 1) * pagination.pageSize + index + 1,
                        ...item,
                    }));
                    const newResponse = { ...response, data: { ...response.data, data: mData } };

                    return newResponse;
                } else {
                    return response;
                }
            },
            function (error) {
                if (error?.response?.status === 401) {
                    preserveIntendedPath();
                    store.dispatch({
                        type: "INVALID_TOKEN",
                    });
                }
                return Promise.reject(error);
            },
        );
    };

    get = (url, data, headers = null) => {
        if (headers) {
            for (const header in headers) {
                if (headers[header]) {
                    this.axiosFunction.defaults.headers[header] = headers[header];
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
                    this.axiosFunction.defaults.headers[header] = headers[header];
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
