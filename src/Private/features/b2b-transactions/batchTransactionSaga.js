import { put, takeEvery, call, all } from "redux-saga/effects";
import * as qs from "qs";

import Api from "App/services/api";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";
import batchTransactionActions from "./batchTransactionActions";

const api = new Api();

export const getBatchTransactions = takeEvery(batchTransactionActions.GET_BATCH_TRANSACTIONS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.b2bTransaction.getBatchTransactions, action.query);
        yield put({
            type: batchTransactionActions.GET_BATCH_TRANSACTIONS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: batchTransactionActions.GET_BATCH_TRANSACTIONS_FAILED,
            error: error?.data,
        });
    }
});

export const getBatchTransaction = takeEvery(batchTransactionActions.GET_BATCH_TRANSACTION, function* (action) {
    try {
        const res = yield call(
            api.get,
            `${buildRoute(
                apiEndpoints.b2bTransaction.getBatchTransactionById,
                action.batchTransactionId,
            )}?${qs.stringify(action.query)}`,
        );
        yield put({
            type: batchTransactionActions.GET_BATCH_TRANSACTION_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: batchTransactionActions.GET_BATCH_TRANSACTION_FAILED,
            error: error?.data,
        });
    }
});

export default function* batchTransactionSaga() {
    yield all([getBatchTransactions, getBatchTransaction]);
}
