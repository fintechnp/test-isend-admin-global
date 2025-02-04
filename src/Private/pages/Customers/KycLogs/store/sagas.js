import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "App/services/api";
import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getKycLogs = takeEvery(actions.GET_KYC_LOGS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetCustomerKycLogs), action.query);

        yield put({
            type: actions.GET_KYC_LOGS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_KYC_LOGS_FAILED,
            error: error?.data,
        });
    }
});

export const getMoreKycLogs = takeEvery(actions.GET_MORE_KYC_LOGS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetCustomerKycLogs), action.query);

        yield put({
            type: actions.GET_MORE_KYC_LOGS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_KYC_LOGS_FAILED,
            error: error?.data,
        });
    }
});

export const getKycLogsGreenId = takeEvery(actions.GET_KYC_LOG_GREEN_ID, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetCustomerKycLogsGreenId, action.id));
        yield put({
            type: actions.GET_KYC_LOG_GREEN_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_KYC_LOG_GREEN_ID_FAILED,
            error: error?.data,
        });
    }
});

export default function* kycLogsSaga() {
    yield all([getKycLogs, getMoreKycLogs, getKycLogsGreenId]);
}
