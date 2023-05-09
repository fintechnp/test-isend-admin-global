import actions from "./action";
import Api from "../../../../../App/services/api";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllBankList = takeEvery(actions.GET_BANK_LIST, function* (action) {
    try {
        const res = yield call(api.get, `/customer/bank`, action.query);
        yield put({
            type: actions.GET_BANK_LIST_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BANK_LIST_FAILED,
            error: error?.data,
        });
    }
});

export default function* saga() {
    yield all([getAllBankList]);
}
