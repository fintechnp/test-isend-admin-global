import buildRoute from "App/helpers/buildRoute";
import actions from "./actions";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getB2BUsers = takeEvery(actions.GET_B2B_USERS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.GetB2BUsers, action.query);
        yield put({
            type: actions.GET_B2B_USERS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_B2B_USERS_FAILED,
            error: error?.data,
        });
    }
});

export const getUserKycById = takeEvery(actions.GET_B2B_USER_KYC_BY_ID, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetB2BUserKycById, action.id));
        yield put({
            type: actions.GET_B2B_USER_KYC_BY_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_B2B_USER_KYC_BY_ID_FAILED,
            error: error?.data,
        });
    }
});

export const changeB2bUserKycStatus = takeEvery(actions.CHANGE_B2B_USER_KYC_STATUS, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.ChangeB2BUserStatus, action.id), action.data);
        yield put({
            type: actions.CHANGE_B2B_USER_KYC_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.CHANGE_B2B_USER_KYC_STATUS_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getB2BUsers, getUserKycById, changeB2bUserKycStatus]);
}
