import { put, takeEvery, call, all } from "redux-saga/effects";

import Api from "App/services/api";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";
import singleTransactionActions from "./singleTransactionActions";

const api = new Api();

export const getSingleTransactions = takeEvery(singleTransactionActions.GET_SINGLE_TRANSACTIONS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.b2bTransaction.getSingleTransactions, action.query);
        yield put({
            type: singleTransactionActions.GET_SINGLE_TRANSACTIONS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: singleTransactionActions.GET_SINGLE_TRANSACTIONS_FAILED,
            error: error.data,
        });
    }
});

export const getSingleTransaction = takeEvery(singleTransactionActions.GET_SINGLE_TRANSACTION, function* (action) {
    try {
        const res = yield call(
            api.get,
            buildRoute(apiEndpoints.b2bTransaction.getSingleTransactionById, action.transactionId),
        );
        yield put({
            type: singleTransactionActions.GET_SINGLE_TRANSACTION_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: singleTransactionActions.GET_SINGLE_TRANSACTION_FAILED,
            error: error.data,
        });
    }
});

export default function* singleTransactionSaga() {
    yield all([getSingleTransactions, getSingleTransaction]);
}
