import actions from "./actions";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllB2bAccount = takeEvery(actions.GET_B2BAccount, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.account.getAll, action.query);
        yield put({
            type: actions.GET_B2BAccount_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_B2BAccount_FAILED,
            error: error?.data,
        });
    }
});

export default function* saga() {
    yield all([getAllB2bAccount]);
}
