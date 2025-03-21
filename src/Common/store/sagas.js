import axios from "axios";
import { put, takeEvery, call, all } from "redux-saga/effects";

import actions from "./actions";
import Api from "../../App/services/api";
import AuthUtility from "App/utils/AuthUtility";
import apiEndpoints from "Private/config/apiEndpoints";
import guestHttpService from "App/services/guestHttpService";
import buildRoute from "App/helpers/buildRoute";

const headers = {
    source: "web",
};

export const refreshToken = takeEvery(actions.REFRESH_TOKEN, function* (action) {
    try {
        const res = yield call(guestHttpService.post, `account/refreshtoken`, action.data, headers);
        yield put({ type: actions.REFRESH_TOKEN_SUCCESS, response: res });
        AuthUtility.setAccessToken(res?.data?.token);
        AuthUtility.setRefreshToken(res?.data?.refresh_token);
    } catch (error) {
        yield put({ type: "SET_TOAST_DATA", data: error?.data });
        yield put({ type: actions.REFRESH_TOKEN_FAILED, error: error });
    }
});

export const getUser = takeEvery(actions.USER_DETAILS, function* () {
    const api = new Api();
    try {
        const res = yield call(api.get, `account/details`);
        yield put({ type: actions.USER_DETAILS_SUCCESS, response: res });
        localStorage.setItem("user", JSON.stringify(res?.data));
    } catch (error) {
        yield put({ type: actions.USER_DETAILS_FAILED, error: error });
        yield put({ type: "SET_TOAST_DATA", data: error?.data });
    }
});

export const get_all_country = takeEvery(actions.GET_ALL_COUNTRY, function* () {
    const api = new Api();
    try {
        const res = yield call(api.get, `common/countrylist`);
        yield put({
            type: actions.GET_ALL_COUNTRY_SUCCESS,
            response: res,
        });
        localStorage.setItem("country", JSON.stringify(res?.data));
    } catch (error) {
        yield put({
            type: actions.GET_ALL_COUNTRY_FAILED,
            error: error?.data,
        });
    }
});

export const get_send_country = takeEvery(actions.GET_SEND_COUNTRY, function* () {
    const api = new Api();
    try {
        const res = yield call(api.get, `common/send_country`);
        yield put({
            type: actions.GET_SEND_COUNTRY_SUCCESS,
            response: res,
        });
        localStorage.setItem("sendCountry", JSON.stringify(res?.data));
    } catch (error) {
        yield put({
            type: actions.GET_SEND_COUNTRY_FAILED,
            error: error?.data,
        });
    }
});

export const get_all_reference = takeEvery(actions.GET_ALL_REFERENCE, function* (action) {
    const api = new Api();
    try {
        const res = yield call(api.get, `common/referencedata`, action.query);
        yield put({
            type: actions.GET_ALL_REFERENCE_SUCCESS,
            response: res,
        });
        localStorage.setItem("reference", JSON.stringify(res?.data));
    } catch (error) {
        yield put({
            type: actions.GET_ALL_REFERENCE_FAILED,
            error: error?.data,
        });
    }
});

export const resetPassword = takeEvery(actions.PASSWORD_RESET, function* (action) {
    const { api_base_url, ...data } = action.data;

    const apiBaseUrl = api_base_url.endsWith("/") ? api_base_url : api_base_url + "/";

    try {
        const res = yield call(axios.post, `${apiBaseUrl}api/account/resetpassword`, data);
        yield put({
            type: actions.PASSWORD_RESET_SUCCESS,
            response: res,
        });

        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.PASSWORD_RESET_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data ?? error?.response?.data });
    }
});

export const logout = takeEvery(actions.LOG_OUT, function* () {
    const api = new Api();
    try {
        const res = yield call(api.post, `account/logout`);
        yield put({
            type: actions.LOG_OUT_SUCCESS,
            response: res,
        });
        yield put({ type: actions.USER_DETAILS_RESET });
        yield put({ type: actions.RESET });
    } catch (error) {
        yield put({
            type: actions.LOG_OUT_FAILED,
            error: error?.data,
        });
    }
});

export const getUserMenusAndPermissions = takeEvery(actions.GET_USER_MENUS_AND_PERMISSIONS, function* () {
    const api = new Api();
    try {
        const res = yield call(api.get, apiEndpoints.auth.getLoggedInUserMenusAndPermissions);
        yield put({ type: actions.GET_USER_MENUS_AND_PERMISSIONS_SUCCESS, response: res });
    } catch (error) {
        yield put({ type: actions.GET_USER_MENUS_AND_PERMISSIONS_FAILED, error: error });
        yield put({ type: "SET_TOAST_DATA", data: error?.data });
    }
});

export const getCountryValidationRules = takeEvery(actions.GET_COUNTRY_VALIDATION_RULES, function* (action) {
    const api = new Api();
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetCountryValidationRules, action.country));
        yield put({ type: actions.GET_COUNTRY_VALIDATION_RULES_SUCCESS, response: res });
    } catch (error) {
        yield put({ type: actions.GET_COUNTRY_VALIDATION_RULES_FAILED, error: error });
        yield put({ type: "SET_TOAST_DATA", data: error?.data });
    }
});

export default function* saga() {
    yield all([
        refreshToken,
        getUser,
        get_all_country,
        get_all_reference,
        resetPassword,
        logout,
        get_send_country,
        getUserMenusAndPermissions,
        getCountryValidationRules,
    ]);
}
