import actions from "./actions";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";


export const forgotPassword = takeEvery(actions.FORGOT_PASSWORD_INIT, function* (action) {

    const api = new Api();

    try {
        const res = yield call(api.post, apiEndpoints.forgotPassword, action.payload);
        yield put({
            type: actions.FORGOT_PASSWORD_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.FORGOT_PASSWORD_FAILED,
            error: error?.data,
        });
    }
});

export default function* saga() {
    yield all([forgotPassword]);
}
