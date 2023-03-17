import app from "App/config/app";
import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
    baseURL: app.apiBaseUrl,
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
    (response) => {
        // console.log("response", response?.data?.data);
        const pagination = response?.data?.pagination;
        const isPagination = !!pagination;
        const isDataArray = Array.isArray(response?.data?.data);
        // console.log(response);
        if (!isPagination && isDataArray) {
            console.log("not pagination but array data");
            // const data = response?.data?.data?.map((item, index) => {
            //     return { f_serial_no: index + 1, ...item };
            // });
            // const newResponseData = { ...response?.data, data };
            return { ...response };
        } else if (isPagination && isDataArray) {
            console.log("paginated data");
            const mData = response.data.data.map((item, index) => ({
                f_sn: Math.random(),
                ...item,
            }));
            response.data.data = mData;
            console.log({ mData });
            return response;
            // return {
            //     ...response,
            //     data: {
            //         ...response.data,
            //         data: mData,
            //         data2: "data2",
            //     },
            // };
        } else {
            console.log("without pagination");
            return { ...response };
        }
    },
    function (error) {
        if (error?.response?.status === 401) {
            store.dispatch({
                type: "INVALID_TOKEN",
            });
        }
        return Promise.reject(error);
    },
);

let store;
export const injectStore = (_store) => {
    store = _store;
};

export default class Api {
    constructor(setToken = true) {
        this.axiosFunction = axiosInstance;

        if (setToken) {
            this.setToken();
        }
    }

    setToken = () => {
        // this.axiosFunction.interceptors.request.use(
        //     (config) => {
        //         config.headers["Authorization"] = "Bearer " + Cookies.get("token");
        //         config.headers["source"] = "web";
        //         config.headers["Accept"] = "application/json";
        //         config.headers["Content-Type"] = "application/json";
        //         return config;
        //     },
        //     (error) => {
        //         return Promise.reject(error);
        //     },
        // );
        // this.axiosFunction.interceptors.response.use(
        //     (response) => {
        //         // const pagination = response?.data?.pagination;
        //         // const isPagination = Boolean(pagination);
        //         // const isDataArray = Array.isArray(response?.data?.data);
        //         // const responseData = JSON.parse(response?.data);
        //         // console.log("🚀 ~ file: api.js:41 ~ Api ~ responseData:", responseData);
        //         // // console.log(response);
        //         // if (!isPagination && isDataArray) {
        //         //     // const data = response?.data?.data?.map((item, index) => {
        //         //     //     return { sNo: index + 1, ...item };
        //         //     // });
        //         //     // const newResponseData = { ...response?.data, data };
        //         //     // console.log("🚀 ~ file: api.js:45 ~ Api ~ newResponseData:", newResponseData);
        //         //     return response;
        //         // } else if (isPagination && isDataArray) {
        //         //     // const data = response?.data?.data?.map((item, index) => {
        //         //     //     return { sNo: pagination?.currentPage * pageSize + index, ...item };
        //         //     // });
        //         //     // const newResponseData = { ...response?.data, data };
        //         //     return response;
        //         // }
        //         return response;
        //     },
        //     function (error) {
        //         if (error?.response?.status === 401) {
        //             store.dispatch({
        //                 type: "INVALID_TOKEN",
        //             });
        //         }
        //         return Promise.reject(error);
        //     },
        // );
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
