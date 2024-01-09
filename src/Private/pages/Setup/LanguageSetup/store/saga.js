import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllLanguageOption = takeEvery(actions.GET_LANGUAGE_OPTION, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.language.get, action.query);
        yield put({
            type: actions.GET_LANGUAGE_OPTION_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_LANGUAGE_OPTION_FAILED,
            error: error?.data,
        });
    }
});

export const getAllLanguageOptionDetails = takeEvery(actions.GET_LANGUAGE_OPTION_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.language.getDetail, action.id));
        yield put({
            type: actions.GET_LANGUAGE_OPTION_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_LANGUAGE_OPTION_DETAILS_FAILED,
            error: error?.data,
        });
    }
});

export const addLanguageOption = takeEvery(actions.ADD_LANGUAGE_OPTION, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.language.post, action.data);
        yield put({
            type: actions.ADD_LANGUAGE_OPTION_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_LANGUAGE_OPTION_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateLanguageOption = takeEvery(actions.UPDATE_LANGUAGE_OPTION, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.language.update, action.id), action.data);
        yield put({
            type: actions.UPDATE_LANGUAGE_OPTION_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_LANGUAGE_OPTION_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateLanguageOptionStatus = takeEvery(actions.UPDATE_LANGUAGE_OPTION_STATUS, function* (action) {
    const query = api.getJSONToQueryStr(action.data);
    try {
        const res = yield call(api.patch, `language/${action.id}?${query}`);
        yield put({
            type: actions.UPDATE_LANGUAGE_OPTION_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_LANGUAGE_OPTION_STATUS_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteLanguageOption = takeEvery(actions.DELETE_LANGUAGE_OPTION, function* (action) {
    try {
        const res = yield call(api.delete, buildRoute(apiEndpoints.language.delete, action.id));
        yield put({
            type: actions.DELETE_LANGUAGE_OPTION_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_LANGUAGE_OPTION_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([
        getAllLanguageOption,
        getAllLanguageOptionDetails,
        addLanguageOption,
        updateLanguageOption,
        updateLanguageOptionStatus,
        deleteLanguageOption,
    ]);
}
