import axios from "axios";

import { preserveIntendedPath } from "App/routes";
import BaseUrlConfiguration from "App/lib/BaseUrlConfiguration";

const guestHttpService = axios.create();

guestHttpService.interceptors.request.use((config) => ({
    ...config,
    headers: {
        ...config.headers,
        source: 'web',
        Accept: 'application/json',
        "Content-Type": "application/json"
    },
    baseURL: BaseUrlConfiguration.getApiBaseUrl(),
}));

guestHttpService.interceptors.response.use(
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

export default guestHttpService