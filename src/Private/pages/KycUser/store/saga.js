import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllKycUser = takeEvery(actions.GET_KYC_USER, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.kycUser.getAll, action.query);
        yield put({
            type: actions.GET_KYC_USER_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_KYC_USER_FAILED,
            error: error?.data,
        });
    }
});

export const getKycUserIdDetails = takeEvery(actions.GET_KYC_USER_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.kycUser.getById, action.id));
        yield put({
            type: actions.GET_KYC_USER_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_KYC_USER_DETAILS_FAILED,
            error: error?.data,
        });
    }
});

export const updateKycUserStatus = takeEvery(actions.UPDATE_KYC_USER_STATUS, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.kycUser.updateStatus, action.id), action.data);
        yield put({
            type: actions.UPDATE_KYC_USER_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.UPDATE_KYC_USER_STATUS_RESET });
    } catch (error) {
        yield put({
            type: actions.UPDATE_KYC_USER_STATUS_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getAllKycUser, getKycUserIdDetails, updateKycUserStatus]);
}
