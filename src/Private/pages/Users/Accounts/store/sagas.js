import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";
import apiEndpoints from "Private/config/apiEndpoints";
import buildRoute from "App/helpers/buildRoute";

const api = new Api();

export const getAllUser = takeEvery(actions.GET_ACCOUNT_USER, function* (action) {
    try {
        const res = yield call(api.get, `account/getall`, action.query);
        yield put({
            type: actions.GET_ACCOUNT_USER_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ACCOUNT_USER_FAILED,
            error: error.data,
        });
    }
});

export const getUserNumber = takeEvery(actions.GET_ACCOUNT_NUMBER, function* (action) {
    try {
        const res = yield call(api.get, `account/usertype`, action.query);
        yield put({
            type: actions.GET_ACCOUNT_NUMBER_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ACCOUNT_NUMBER_FAILED,
            error: error.data,
        });
    }
});

export const getUserDetails = takeEvery(actions.GET_ACCOUNT_USER_DETAILS, function* () {
    try {
        const res = yield call(api.get, `account/details`);
        yield put({
            type: actions.GET_ACCOUNT_USER_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ACCOUNT_USER_DETAILS_FAILED,
            error: error.data,
        });
    }
});

export const getUserDetailById = takeEvery(actions.GET_ACCOUNT_USER_DETAILS_BY_ID, function* (action) {
    try {
        const res = yield call(api.get, `account/details/${action.id}`);
        yield put({
            type: actions.GET_ACCOUNT_USER_DETAILS_BY_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ACCOUNT_USER_DETAILS_BY_ID_FAILED,
            error: error.data,
        });
    }
});

export const addUser = takeEvery(actions.ADD_ACCOUNT_USER, function* (action) {
    try {
        const res = yield call(api.post, `account/register`, action.data);
        yield put({ type: actions.ADD_ACCOUNT_USER_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.ADD_ACCOUNT_USER_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateUser = takeEvery(actions.UPDATE_ACCOUNT_USER, function* (action) {
    try {
        const res = yield call(api.put, `account/update`, action.data);
        yield put({
            type: actions.UPDATE_ACCOUNT_USER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_ACCOUNT_USER_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateUserStatus = takeEvery(actions.UPDATE_ACCOUNT_STATUS, function* (action) {
    const query = api.getJSONToQueryStr(action.data);
    try {
        const res = yield call(api.patch, `account/${action.id}?${query}`);
        yield put({
            type: actions.UPDATE_ACCOUNT_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_ACCOUNT_STATUS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteUser = takeEvery(actions.DELETE_ACCOUNT_USER, function* (action) {
    try {
        const res = yield call(api.delete, `account/${action.id}`);
        yield put({
            type: actions.DELETE_ACCOUNT_USER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_ACCOUNT_USER_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const forgotPassword = takeEvery(actions.FORGOT_PASSWORD, function* (action) {
    try {
        const res = yield call(api.post, `account/forgotpassword`, action.data);
        yield put({
            type: actions.FORGOT_PASSWORD_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.FORGOT_PASSWORD_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const addUserKyc = takeEvery(actions.ADD_SYSTEM_USER_KYC, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.user.addKyc, action.data);
        yield put({
            type: actions.ADD_SYSTEM_USER_KYC_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.ADD_SYSTEM_USER_KYC_RESET });
    } catch (error) {
        yield put({
            type: actions.ADD_SYSTEM_USER_KYC_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateSystemUserKyc = takeEvery(actions.UPDATE_SYSTEM_USER_KYC, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.user.editKyc, action.id), action.data);
        yield put({
            type: actions.UPDATE_SYSTEM_USER_KYC_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.UPDATE_SYSTEM_USER_KYC_RESET });
    } catch (error) {
        yield put({
            type: actions.UPDATE_SYSTEM_USER_KYC_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([
        getAllUser,
        getUserNumber,
        getUserDetails,
        getUserDetailById,
        addUser,
        updateUser,
        updateUserStatus,
        deleteUser,
        forgotPassword,
        addUserKyc,
        updateSystemUserKyc,
    ]);
}
