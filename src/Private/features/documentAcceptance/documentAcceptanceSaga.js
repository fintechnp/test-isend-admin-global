import { put, takeEvery, call, all } from "redux-saga/effects";

import Api from "App/services/api";
import actions from "./documentAcceptanceActions";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getDocumentAcceptanceList = takeEvery(actions.GET_DOCUMENT_ACCEPTANCE_LIST, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.documentAcceptance.list), action.query);

        yield put({
            type: actions.GET_DOCUMENT_ACCEPTANCE_LIST_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_DOCUMENT_ACCEPTANCE_LIST_FAILURE,
            error: error?.data,
        });
    }
});

export const addDocumentAcceptance = takeEvery(actions.ADD_DOCUMENT_ACCEPTANCE, function* (action) {
    try {
        const res = yield call(api.post, buildRoute(apiEndpoints.documentAcceptance.create), action.data);

        yield put({
            type: actions.ADD_DOCUMENT_ACCEPTANCE_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.ADD_DOCUMENT_ACCEPTANCE_FAILURE,
            error: error?.data,
        });
        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export const updateDocumentAcceptance = takeEvery(actions.UPDATE_DOCUMENT_ACCEPTANCE, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.documentAcceptance.update, action.id), action.data);

        yield put({
            type: actions.UPDATE_DOCUMENT_ACCEPTANCE_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.UPDATE_DOCUMENT_ACCEPTANCE_FAILURE,
            error: error?.data,
        });
        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export default function* documentAcceptanceSaga() {
    yield all([getDocumentAcceptanceList, addDocumentAcceptance, updateDocumentAcceptance]);
}
