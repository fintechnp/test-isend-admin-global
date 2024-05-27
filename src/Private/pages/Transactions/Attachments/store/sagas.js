import { all, call, put, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import Api from "App/services/api";

const api = new Api();

export const getAllAttachments = takeEvery(actions.GET_ATTACHMENT, function* (action) {
    try {
        const res = yield call(api.get, `attachment`, action.query);
        yield put({ type: actions.GET_ATTACHMENT_SUCCESS, response: res });
    } catch (error) {
        yield put({ type: actions.GET_ATTACHMENT_FAILURE, error: error });
    }
});

export const uploadAttachment = takeEvery(actions.UPLOAD_ATTACHMENT, function* (action) {
    try {
        const res = yield call(api.post, `attachment`, action.data);
        yield put({
            type: actions.UPLOAD_ATTACHMENT_SUCCESS,
            response: res,
        });
        yield put({
            type: actions.UPLOAD_ATTACHMENT_RESET
        })
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPLOAD_ATTACHMENT_FAILURE,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getAllAttachments, uploadAttachment]);
}
