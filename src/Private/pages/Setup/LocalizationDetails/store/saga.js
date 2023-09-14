import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getLocalizationDetails = takeEvery(actions.GET_LOCALIZATION_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, `/localization/${action.id}`);
        yield put({
            type: actions.GET_LOCALIZATION_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_LOCALIZATION_DETAILS_FAILED,
            error: error?.data,
        });
    }
});

export const getTranslationValueDetails = takeEvery(actions.GET_TRANSLATION_VALUE, function* (action) {
    try {
        const res = yield call(api.get, `/languagetranslated/${action.id}`);
        yield put({
            type: actions.GET_TRANSLATION_VALUE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_TRANSLATION_VALUE_FAILED,
            error: error?.data,
        });
    }
});

export const addTranslationValue = takeEvery(actions.ADD_TRANSLATION_VALUE, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.localizationTranslation.add, action.data);
        yield put({
            type: actions.ADD_TRANSLATION_VALUE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_TRANSLATION_VALUE_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export const updateTranslationValue = takeEvery(actions.UPDATE_TRANSLATION_VALUE, function* (action) {
    try {
        const res = yield call(api.put, `/languagetranslated/${action.id}`, action.data);
        yield put({
            type: actions.UPDATE_TRANSLATION_VALUE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_TRANSLATION_VALUE_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateTranslationValueStatus = takeEvery(actions.UPDATE_TRANSLATION_VALUE_STATUS, function* (action) {
    const query = api.getJSONToQueryStr(action.data);
    try {
        const res = yield call(api.patch, `languagetranslated/${action.id}?${query}`);
        yield put({
            type: actions.UPDATE_TRANSLATION_VALUE_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_TRANSLATION_VALUE_STATUS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteTranslationValue = takeEvery(actions.DELETE_TRANSLATION_VALUE, function* (action) {
    try {
        const res = yield call(api.delete, buildRoute(apiEndpoints.localizationTranslation.delete, action.id));
        yield put({
            type: actions.DELETE_TRANSLATION_VALUE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_TRANSLATION_VALUE_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export default function* saga() {
    yield all([
        getLocalizationDetails,
        addTranslationValue,
        getTranslationValueDetails,
        updateTranslationValue,
        deleteTranslationValue,
        updateTranslationValueStatus,
    ]);
}
