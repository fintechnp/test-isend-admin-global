import actions from "./actions";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const changePasswordSaga = takeEvery(actions.UPDATE_PASSWORD, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.settings.changePassword, action.data);
        yield put({
            type: actions.UPDATE_PASSWORD_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_PASSWORD_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([changePasswordSaga]);
}
