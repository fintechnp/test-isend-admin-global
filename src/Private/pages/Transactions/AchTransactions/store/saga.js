import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllAchTransactions = takeEvery(actions.GET_ACH_TRANSACTIONS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.transaction.achTransaction, action.query);
        yield put({
            type: actions.GET_ACH_TRANSACTIONS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ACH_TRANSACTIONS_FAILED,
            error: error?.data,
        });
    }
});

export const updateAchTransactionStatus = takeEvery(actions.UPDATE_ACH_TRANSACTION_STATUS, function* (action) {
    try {
        const res = yield call(
            api.put,
            buildRoute(apiEndpoints.transaction.updateAchTransactionStatus, action.id),
            action.data,
        );
        yield put({
            type: actions.UPDATE_ACH_TRANSACTION_STATUS_SUCCESS,
            response: res,
        });
        yield put({
            type: actions.UPDATE_ACH_TRANSACTION_STATUS_RESET,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_ACH_TRANSACTION_STATUS_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getAllAchTransactions, updateAchTransactionStatus]);
}
