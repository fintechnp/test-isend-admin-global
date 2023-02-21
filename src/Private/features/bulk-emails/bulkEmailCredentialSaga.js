import { put, takeEvery, call, all } from "redux-saga/effects";

import Api from "App/services/api";
import actions from "./bulkEmailCredentialAction";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getBulkEmailCredential = takeEvery(actions.GET_BULK_EMAIL_CREDENTIAL, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.bulkEmailCredentials.get, action.query);
        yield put({
            type: actions.GET_BULK_EMAIL_CREDENTIAL_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BULK_EMAIL_CREDENTIAL_FAILED,
            error: error.data,
        });
    }
});

export const updateBulkEmailCredential = takeEvery(actions.UPDATE_BULK_EMAIL_CREDENTIAL, function* (action) {
    try {
        const res = yield call(
            api.put,
            buildRoute(apiEndpoints.bulkEmailCredentials.update, action.bulk_email_credential_id),
            action.data,
        );
        yield put({
            type: actions.UPDATE_BULK_EMAIL_CREDENTIAL_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_BULK_EMAIL_CREDENTIAL_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export default function* bulkEmailCredentialSaga() {
    yield all([getBulkEmailCredential, updateBulkEmailCredential]);
}
