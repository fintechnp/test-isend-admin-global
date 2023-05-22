import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getTransactionDetails = takeEvery(actions.GET_TRANSACTION_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, `transaction/${action.id}`);
        yield put({
            type: actions.GET_TRANSACTION_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_TRANSACTION_DETAILS_FAILED,
            error: error.data,
        });
    }
});

export const getTransactionRefundBlock = takeEvery(actions.GET_TRANSACTION_REFUND_BLOCK, function* (action) {
    try {
        const res = yield call(api.get, `transaction/refund_block`, action.query);
        yield put({
            type: actions.GET_TRANSACTION_REFUND_BLOCK_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_TRANSACTION_REFUND_BLOCK_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getPaymentPending = takeEvery(actions.GET_PENDING_PAYMENT, function* (action) {
    try {
        const res = yield call(api.get, `utilities/payment_pending_transaction`, action.query);
        yield put({
            type: actions.GET_PENDING_PAYMENT_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PENDING_PAYMENT_FAILED,
            error: error.data,
        });
    }
});

export const getPendingTransactions = takeEvery(actions.GET_PENDING_TRANSACTIONS, function* (action) {
    try {
        const res = yield call(api.get, `utilities/pending_transaction`, action.query);
        yield put({
            type: actions.GET_PENDING_TRANSACTIONS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PENDING_TRANSACTIONS_FAILED,
            error: error.data,
        });
    }
});

export const getBlockedTransactions = takeEvery(actions.GET_BLOCKED_TRANSACTIONS, function* (action) {
    try {
        const res = yield call(api.get, `utilities/blocked_transaction`, action.query);
        yield put({
            type: actions.GET_BLOCKED_TRANSACTIONS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BLOCKED_TRANSACTIONS_FAILED,
            error: error.data,
        });
    }
});

export const getAmlSuspicious = takeEvery(actions.GET_AML_SUSPICIOUS, function* (action) {
    try {
        const res = yield call(api.get, `utilities/aml_suspicious_transaction`, action.query);
        yield put({
            type: actions.GET_AML_SUSPICIOUS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_AML_SUSPICIOUS_FAILED,
            error: error.data,
        });
    }
});

export const getDetailsAmlSuspicious = takeEvery(actions.GET_AML_SUSPICIOUS_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, `utilities/${action.transaction_id}/aml_suspicious_transaction`);
        yield put({
            type: actions.GET_AML_SUSPICIOUS_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_AML_SUSPICIOUS_DETAILS_FAILED,
            error: error.data,
        });
    }
});

export const getExceptionTransactions = takeEvery(actions.GET_EXCEPTION_TRANSACTIONS, function* (action) {
    try {
        const res = yield call(api.get, `utilities/exception_transaction`, action.query);
        yield put({
            type: actions.GET_EXCEPTION_TRANSACTIONS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_EXCEPTION_TRANSACTIONS_FAILED,
            error: error.data,
        });
    }
});

export const updatePaymentPending = takeEvery(actions.RELEASE_PENDING_PAYMENT, function* (action) {
    try {
        const res = yield call(api.put, `utilities/payment_pending_release/${action.id}`, action.data);
        yield put({
            type: actions.RELEASE_PENDING_PAYMENT_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.RELEASE_PENDING_PAYMENT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const blockTransactions = takeEvery(actions.BLOCK_TRANSACTIONS, function* (action) {
    try {
        const res = yield call(api.put, `utilities/block_transaction/${action.id}`, action.data);
        yield put({
            type: actions.BLOCK_TRANSACTIONS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.BLOCK_TRANSACTIONS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const refundTransactions = takeEvery(actions.REFUND_TRANSACTIONS, function* (action) {
    try {
        const res = yield call(api.put, `utilities/refund_transaction/${action.id}`, action.data);
        yield put({
            type: actions.REFUND_TRANSACTIONS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.REFUND_TRANSACTIONS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateBlockedTransactions = takeEvery(actions.RELEASE_BLOCKED_TRANSACTIONS, function* (action) {
    try {
        const res = yield call(api.put, `utilities/block_transaction_release/${action.id}`, action.data);
        yield put({
            type: actions.RELEASE_BLOCKED_TRANSACTIONS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.RELEASE_BLOCKED_TRANSACTIONS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateAmlSuspicious = takeEvery(actions.RELEASE_AML_SUSPICIOUS, function* (action) {
    try {
        const res = yield call(api.put, `utilities/aml_suspicious_release/${action.id}`, action.data);
        yield put({
            type: actions.RELEASE_AML_SUSPICIOUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.RELEASE_AML_SUSPICIOUS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateExceptionTransactions = takeEvery(actions.RELEASE_EXCEPTION_TRANSACTIONS, function* (action) {
    try {
        const res = yield call(api.put, `utilities/exception_release/${action.id}`, action.data);
        yield put({
            type: actions.RELEASE_EXCEPTION_TRANSACTIONS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.RELEASE_EXCEPTION_TRANSACTIONS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getTransactionDocuments = takeEvery(actions.GET_TRANSACTION_DOCUMENTS, function* (action) {
    console.log(action);
    try {
        const res = yield call(api.get, `/utilities/uploaded_document`, action.query);
        yield put({
            type: actions.GET_TRANSACTION_DOCUMENTS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_TRANSACTION_DOCUMENTS_FAILED,
            error: error.data,
        });
    }
});

export default function* saga() {
    yield all([
        getTransactionDetails,
        getTransactionRefundBlock,
        getPaymentPending,
        getPendingTransactions,
        getBlockedTransactions,
        getExceptionTransactions,
        getAmlSuspicious,
        getDetailsAmlSuspicious,
        updatePaymentPending,
        blockTransactions,
        refundTransactions,
        updateBlockedTransactions,
        updateAmlSuspicious,
        updateExceptionTransactions,
        getTransactionDocuments,
    ]);
}
