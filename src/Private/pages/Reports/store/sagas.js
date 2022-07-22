import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getCustomerReport = takeEvery(
    actions.CUSTOMER_REPORT,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `transaction/refund_block`,
                action.query
            );
            yield put({
                type: actions.CUSTOMER_REPORT_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.CUSTOMER_REPORT_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const getBeneficiaryReport = takeEvery(
    actions.BENEFICIARY_REPORT,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `transaction/refund_block`,
                action.query
            );
            yield put({
                type: actions.BENEFICIARY_REPORT_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.BENEFICIARY_REPORT_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const getTransactionsSummaryReport = takeEvery(
    actions.TRANSACTIONS_SUMMARY_REPORT,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `transaction/refund_block`,
                action.query
            );
            yield put({
                type: actions.TRANSACTIONS_SUMMARY_REPORT_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.TRANSACTIONS_SUMMARY_REPORT_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const getYearlyTransactionsReport = takeEvery(
    actions.YEARLY_TRANSACTIONS_REPORT,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `transaction/refund_block`,
                action.query
            );
            yield put({
                type: actions.YEARLY_TRANSACTIONS_REPORT_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.YEARLY_TRANSACTIONS_REPORT_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const getCancelledTransactionsReport = takeEvery(
    actions.CANCELLED_TRANSACTIONS_REPORT,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `transaction/refund_block`,
                action.query
            );
            yield put({
                type: actions.CANCELLED_TRANSACTIONS_REPORT_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.CANCELLED_TRANSACTIONS_REPORT_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const getSuspiciousTransactionsReport = takeEvery(
    actions.SUSPICIOUS_TRANSACTIONS_REPORT,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `transaction/refund_block`,
                action.query
            );
            yield put({
                type: actions.SUSPICIOUS_TRANSACTIONS_REPORT_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.SUSPICIOUS_TRANSACTIONS_REPORT_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* saga() {
    yield all([
        getCustomerReport,
        getBeneficiaryReport,
        getTransactionsSummaryReport,
        getYearlyTransactionsReport,
        getCancelledTransactionsReport,
        getSuspiciousTransactionsReport,
    ]);
}
