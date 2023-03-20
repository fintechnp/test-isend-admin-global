import { put, takeEvery, call, all } from "redux-saga/effects";

import Api from "App/services/api";
import actions from "./bulkEmailContentAction";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getBulkEmailContents = takeEvery(actions.GET_BULK_EMAIL_CONTENTS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.bulkEmailContents.list, action.query);
        yield put({
            type: actions.GET_BULK_EMAIL_CONTENTS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BULK_EMAIL_CONTENTS_FAILED,
            error: error.data,
        });
    }
});

export const addBulkEmailContent = takeEvery(actions.ADD_BULK_EMAIL_CONTENT, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.bulkEmailContents.create, action.data);
        yield put({
            type: actions.ADD_BULK_EMAIL_CONTENT_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_BULK_EMAIL_CONTENT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const updateBulkEmailContent = takeEvery(actions.UPDATE_BULK_EMAIL_CONTENT, function* (action) {
    try {
        const res = yield call(
            api.put,
            buildRoute(apiEndpoints.bulkEmailContents.update, action.bulk_email_content_id),
            action.data,
        );
        yield put({
            type: actions.UPDATE_BULK_EMAIL_CONTENT_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_BULK_EMAIL_CONTENT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const updateBulkEmailContentStatus = takeEvery(actions.UPDATE_BULK_EMAIL_CONTENT_STATUS, function* (action) {
    try {
        const res = yield call(
            api.patch,
            buildRoute(apiEndpoints.bulkEmailContents.updateStatus, {
                bulkEmailContentId: action.bulk_email_content_id,
                is_active: action.is_active,
            }),
        );
        yield put({
            type: actions.UPDATE_BULK_EMAIL_CONTENT_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_BULK_EMAIL_CONTENT_STATUS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteBulkEmailContent = takeEvery(actions.DELETE_BULK_EMAIL_CONTENT, function* (action) {
    try {
        const res = yield call(
            api.delete,
            buildRoute(apiEndpoints.bulkEmailContents.delete, action.bulk_email_content_id),
        );
        yield put({
            type: actions.DELETE_BULK_EMAIL_CONTENT_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_BULK_EMAIL_CONTENT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const getBulkEmailContent = takeEvery(actions.VIEW_BULK_EMAIL_CONTENT, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.bulkEmailContents.get, action.bulk_email_content_id));
        yield put({
            type: actions.VIEW_BULK_EMAIL_CONTENT_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.VIEW_BULK_EMAIL_CONTENT_FAILED,
            error: error.data,
        });
    }
});

export const sendBulkEmailContent = takeEvery(actions.SEND_BULK_EMAIL_CONTENT, function* (action) {
    try {
        const res = yield call(api.post, buildRoute(apiEndpoints.bulkEmailContents.send, action.bulk_email_content_id));
        yield put({
            type: actions.SEND_BULK_EMAIL_CONTENT_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.SEND_BULK_EMAIL_CONTENT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export default function* bulkEmailContentSaga() {
    yield all([
        getBulkEmailContents,
        addBulkEmailContent,
        updateBulkEmailContent,
        deleteBulkEmailContent,
        updateBulkEmailContentStatus,
        getBulkEmailContent,
        sendBulkEmailContent,
    ]);
}
