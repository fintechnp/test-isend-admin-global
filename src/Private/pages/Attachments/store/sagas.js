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

export default function* saga() {
    yield all([getAllAttachments]);
}
