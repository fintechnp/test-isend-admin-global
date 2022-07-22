import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getTransactions = takeEvery(
    actions.GET_TRANSACTIONS,
    function* (action) {
        try {
            const res = yield call(api.get, `transaction`, action.query);
            yield put({
                type: actions.GET_TRANSACTIONS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_TRANSACTIONS_FAILED,
                error: error.data,
            });
        }
    }
);

export const getTransactionById = takeEvery(
    actions.GET_TRANSACTIONS_BYID,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `transaction//${action.id}`,
                action.query
            );
            yield put({
                type: actions.GET_TRANSACTIONS_BYID_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_TRANSACTIONS_BYID_FAILED,
                error: error.data,
            });
        }
    }
);

export const getTransactionsByCustomer = takeEvery(
    actions.GET_TRANSACTIONS_BY_CUSTOMER,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `${action.id}/transaction`,
                action.query
            );
            yield put({
                type: actions.GET_TRANSACTIONS_BY_CUSTOMER_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_TRANSACTIONS_BY_CUSTOMER_FAILED,
                error: error.data,
            });
        }
    }
);

export const createTransaction = takeEvery(
    actions.CREATE_TRANSACTIONS,
    function* (action) {
        try {
            const res = yield call(api.post, `transaction`, action.data);
            yield put({
                type: actions.CREATE_TRANSACTIONS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.CREATE_TRANSACTIONS_FAILED,
                error: error.data,
            });
        }
    }
);

export const updateTransaction = takeEvery(
    actions.UPDATE_TRANSACTIONS,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `transaction/${action.id}`,
                action.data
            );
            yield put({
                type: actions.UPDATE_TRANSACTIONS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.UPDATE_TRANSACTIONS_FAILED,
                error: error.data,
            });
        }
    }
);

export default function* saga() {
    yield all([
        getTransactions,
        getTransactionById,
        createTransaction,
        updateTransaction,
        getTransactionsByCustomer,
    ]);
}
