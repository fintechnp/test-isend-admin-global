import { put, takeEvery, call, all } from "redux-saga/effects";

import actions from "./actions";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getCustomerCountByDeviceType = takeEvery(actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.dashboard.getCustomerCountByDeviceType, action.query);
        yield put({
            type: actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_FAILED,
            error: error?.data,
        });
    }
});

export const getCustomerCountByDeviceTypePrevious = takeEvery(
    actions.GET_CUSTOMER_COUNT_BY_DEVICE_TYPE_PREVIOUS,
    function* (action) {
        try {
            const res = yield call(api.get, apiEndpoints.dashboard.getCustomerCountByDeviceType, action.query);

            yield put({
                type: actions.GET_CUSTOMER_COUNT_BY_DEVICE_PREVIOUS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_CUSTOMER_COUNT_BY_DEVICE_PREVIOUS_FAILED,
                error: error?.data,
            });
        }
    },
);

export const getCustomerKycCountByStatus = takeEvery(actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.dashboard.getCustomerKycCountByStatus, action.query);
        yield put({
            type: actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_FAILED,
            error: error?.data,
        });
    }
});

export const getCustomerKycCountByStatusPrevious = takeEvery(
    actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS,
    function* (action) {
        try {
            const res = yield call(api.get, apiEndpoints.dashboard.getCustomerKycCountByStatus, action.query);
            yield put({
                type: actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_CUSTOMER_KYC_COUNT_BY_STATUS_PREVIOUS_FAILED,
                error: error?.data,
            });
        }
    },
);

export const getTransactionCountByStatus = takeEvery(actions.GET_TRANSACTION_COUNT_BY_STATUS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.dashboard.getTransactionCountByStatus, action.query);
        yield put({
            type: actions.GET_TRANSACTION_COUNT_BY_STATUS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_TRANSACTION_COUNT_BY_STATUS_FAILED,
            error: error?.data,
        });
    }
});

export const getTransactionCountByStatusPrevious = takeEvery(
    actions.GET_TRANSACTION_COUNT_BY_STATUS_PREVIOUS,
    function* (action) {
        try {
            const res = yield call(api.get, apiEndpoints.dashboard.getTransactionCountByStatus, action.query);
            yield put({
                type: actions.GET_TRANSACTION_COUNT_BY_STATUS_PREVIOUS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_TRANSACTION_COUNT_BY_STATUS_PREVIOUS_FAILED,
                error: error?.data,
            });
        }
    },
);

export const getComplianceCountByStatus = takeEvery(actions.GET_COMPLIANCE_COUNT_BY_STATUS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.dashboard.getComplianceCountByStatus, action.query);
        yield put({
            type: actions.GET_COMPLIANCE_COUNT_BY_STATUS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_COMPLIANCE_COUNT_BY_STATUS_FAILED,
            error: error?.data,
        });
    }
});

export const getComplianceCountByStatusPrevious = takeEvery(
    actions.GET_COMPLIANCE_COUNT_BY_STATUS_PREVIOUS,
    function* (action) {
        try {
            const res = yield call(api.get, apiEndpoints.dashboard.getComplianceCountByStatus, action.query);
            yield put({
                type: actions.GET_COMPLIANCE_COUNT_BY_STATUS_PREVIOUS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                TYPE: actions.GET_COMPLIANCE_COUNT_BY_STATUS_PREVIOUS_FAILED,
                error: error?.data,
            });
        }
    },
);

export const getTopPayoutCountries = takeEvery(actions.GET_TOP_PAYOUT_COUNTRIES, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.dashboard.getTopPayoutCountries, action.query);

        yield put({
            type: actions.GET_TOP_PAYOUT_COUNTRIES_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_TOP_PAYOUT_COUNTRIES_SUCCESS,
            error: error?.data,
        });
    }
});

export const getTopTransactionByAgentAndBusiness = takeEvery(
    actions.GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS,
    function* (action) {
        try {
            const res = yield call(api.get, apiEndpoints.dashboard.getTopAgentBusinessTransactions, action.query);
            yield put({
                type: actions.GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_TOP_TRANSACTION_BY_AGENT_AND_BUSINESS_FAILED,
                error: error?.data,
            });
        }
    },
);

export const getSummaryData = takeEvery(actions.GET_SUMMARY_DATA, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.dashboard.getSummaryData, action.query);
        yield put({
            type: actions.GET_SUMMARY_DATA_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_SUMMARY_DATA_FAILED,
            error: error?.data,
        });
    }
});

export default function* saga() {
    yield all([
        getCustomerCountByDeviceType,
        getCustomerCountByDeviceTypePrevious,
        getCustomerKycCountByStatus,
        getTransactionCountByStatus,
        getTransactionCountByStatusPrevious,
        getCustomerKycCountByStatusPrevious,
        getTopPayoutCountries,
        getTopTransactionByAgentAndBusiness,
        getComplianceCountByStatus,
        getComplianceCountByStatusPrevious,
        getSummaryData,
    ]);
}
