import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getBankDetails = takeEvery(actions.GET_BANK_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, `/customer/${action.id}/bank`, action.query);
        yield put({
            type: actions.GET_BANK_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BANK_DETAILS_FAILED,
            error: error.data,
        });
    }
});

export const refreshBank = takeEvery(actions.REFRESH_BANK, function* (action) {
    try {
        const res = yield call(api.post, `/customer/refreshbank/${action.id}`, action.query);
        yield put({
            type: actions.REFRESH_BANK_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.REFRESH_BANK_FAILED,
            error: error.data,
        });
    }
});

export default function* saga() {
    yield all([getBankDetails, refreshBank]);
}
