import { all, call, put, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import Api from "App/services/api";

const api = new Api();

export const getAllComments = takeEvery(actions.GET_COMMENT, function* (action) {
    try {
        const res = yield call(api.get, `comment`, action.query);
        yield put({ type: actions.GET_COMMENT_SUCCESS, response: res });
    } catch (error) {
        yield put({ type: actions.GET_COMMENT_FAILURE, error: error?.data });
    }
});

export const addComment = takeEvery(actions.ADD_COMMENT, function* (action) {
    try {
        const res = yield call(api.post, `comment`, action.data);
        yield put({
            type: actions.ADD_COMMENT_SUCCESS,
            response: res,
        });
        yield put({
            type: actions.ADD_COMMENT_RESET,
        });

        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_COMMENT_FAILURE,
            error: error?.data,
        }),
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getAllComments, addComment]);
}
