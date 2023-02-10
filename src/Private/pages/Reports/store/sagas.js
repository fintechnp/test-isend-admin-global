import { put, takeEvery, call, all } from "redux-saga/effects";

import actions from "./actions";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getCustomerReport = takeEvery(actions.CUSTOMER_REPORT, function* (action) {
    try {
        const res = yield call(api.get, `report/customer`, action.query);
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
});

export const downloadReport = takeEvery(actions.DOWNLOAD_REPORT, function* (action) {
    try {
        const res = yield call(api.get, `${action.path}`, action.query);
        yield put({
            type: actions.DOWNLOAD_REPORT_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.DOWNLOAD_REPORT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getBeneficiaryReport = takeEvery(actions.BENEFICIARY_REPORT, function* (action) {
    try {
        const res = yield call(api.get, `report/beneficiary`, action.query);
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
});

export const getTransactionsSummaryReport = takeEvery(actions.TRANSACTIONS_SUMMARY_REPORT, function* (action) {
    try {
        const res = yield call(api.get, `report/transaction_summary`, action.query);
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
});

export const getYearlyTransactionsReport = takeEvery(actions.YEARLY_TRANSACTIONS_REPORT, function* (action) {
    try {
        const res = yield call(api.get, `report/transaction_yearly`, action.query);
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
});

export const getCancelledTransactionsReport = takeEvery(actions.CANCELLED_TRANSACTIONS_REPORT, function* (action) {
    try {
        const res = yield call(api.get, `report/transaction_cancel`, action.query);
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
});

export const getSuspiciousTransactionsReport = takeEvery(actions.SUSPICIOUS_TRANSACTIONS_REPORT, function* (action) {
    try {
        const res = yield call(api.get, `report/transaction_suspicious`, action.query);
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
});

export const getUserIpWhitelistReport = takeEvery(actions.USER_IP_WHITELIST_REPORT, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.reports.userIpWhitelist, action.query);
        yield put({
            type: actions.USER_IP_WHITELIST_REPORT_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.USER_IP_WHITELIST_REPORT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getIcnResponseReport = takeEvery(actions.ICN_RESPONSE_REPORT, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.reports.icnResponse, action.query);
        yield put({
            type: actions.ICN_RESPONSE_REPORT_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.ICN_RESPONSE_REPORT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getAchEntriesReport = takeEvery(actions.ACH_ENTRIES_REPORT, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.reports.achEntries, action.query);
        yield put({
            type: actions.ACH_ENTRIES_REPORT_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.ACH_ENTRIES_REPORT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getIncompleteRegistrationReport = takeEvery(actions.INCOMPLETE_REGISTRATION_REPORT, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.reports.incompleteRegistration, action.query);
        yield put({
            type: actions.INCOMPLETE_REGISTRATION_REPORT_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.INCOMPLETE_REGISTRATION_REPORT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([
        getCustomerReport,
        downloadReport,
        getBeneficiaryReport,
        getTransactionsSummaryReport,
        getYearlyTransactionsReport,
        getCancelledTransactionsReport,
        getSuspiciousTransactionsReport,
        getUserIpWhitelistReport,
        getIcnResponseReport,
        getAchEntriesReport,
        getIncompleteRegistrationReport,
    ]);
}
