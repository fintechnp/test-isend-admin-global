import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getCustomers = takeEvery(
    actions.GET_CUSTOMERS,
    function* (action) {
        try {
            const res = yield call(api.get, `customer`, action.query);
            yield put({
                type: actions.GET_CUSTOMERS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_CUSTOMERS_FAILED,
                error: error.data,
            });
        }
    }
);

export default function* saga() {
    yield all([
        getCustomers,
    ]);
}
