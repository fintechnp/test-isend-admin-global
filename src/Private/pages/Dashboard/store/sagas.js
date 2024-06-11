import { put, takeEvery, call, all } from "redux-saga/effects";

import actions from "./actions";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getCustomerCountByDeviceType = takeEvery(actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.dashboard.getCustomerCountByDeviceType, action.query);
        yield put({
            type: actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_FAILED,
            error: error?.data,
        });
    }
});

export const getCustomerKycCountByStatus = takeEvery(actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.dashboard.getCustomerKycCountByStatus, action.query);
        yield put({
            type: actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_FAILED,
            error: error?.data,
        });
    }
});

export const getCustomerKycCountByStatusPrevious = takeEvery(
    actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS,
    function* (action) {
        try {
            const res = yield call(api.get, apiEndpoints.dashboard.getCustomerKycCountByStatus, action.query);
            yield put({
                type: actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS_FAILED,
                error: error?.data,
            });
        }
    },
);

export const getTransactionCountByStatus = takeEvery(actions.GET_TRANSACTION_COUNT_BY_STATUS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.dashboard.getTransactionCountByStatus, action.query);
        yield put({
            type: actions.GET_TRANSACTION_COUNT_BY_STATUS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_TRANSACTION_COUNT_BY_STATUS_FAILED,
            error: error?.data,
        });
    }
});

export default function* saga() {
    yield all([
        getCustomerCountByDeviceType,
        getCustomerKycCountByStatus,
        getTransactionCountByStatus,
        getCustomerKycCountByStatusPrevious,
    ]);
}
