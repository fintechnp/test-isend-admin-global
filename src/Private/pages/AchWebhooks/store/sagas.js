import { takeEvery, put, all, call } from "redux-saga/effects";
import Api from "App/services/api";
import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getAchRdfiWebhooks = takeEvery(actions.GET_ACH_RDFI_WEBHOOKS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetAchRdfiWebhooks), action.query);

        yield put({
            type: actions.GET_ACH_RDFI_WEBHOOKS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ACH_RDFI_WEBHOOKS_FAILED,
            error: error?.data,
        });
    }
});

export const getAchCirWebhooks = takeEvery(actions.GET_ACH_CIR_WEBHOOKS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetAchCirWebhooks), action.query);

        yield put({
            type: actions.GET_ACH_CIR_WEBHOOKS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ACH_CIR_WEBHOOKS_FAILED,
            error: error?.data,
        });
    }
});

export const getAchReturnWebhooks = takeEvery(actions.GET_ACH_RETURN_WEBHOOKS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetReturnWebhooks), action.query);

        yield put({
            type: actions.GET_ACH_RETURN_WEBHOOKS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ACH_RETURN_WEBHOOKS_FAILED,
            error: error?.data,
        });
    }
});

export const getAchRejectWebhooks = takeEvery(actions.GET_ACH_REJECT_WEBHOOKS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetRejectWebhooks), action.query);

        yield put({
            type: actions.GET_ACH_REJECT_WEBHOOKS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ACH_REJECT_WEBHOOKS_FAILED,
            error: error?.data,
        });
    }
});

export const returnAchRdfiTransaction = takeEvery(actions.RETURN_ACH_RDFI_TRANSACTION, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.ReturnRdfiTransaction, action.id), action.data);

        yield put({
            type: actions.RETURN_ACH_RDFI_TRANSACTION_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.RETURN_ACH_RDFI_TRANSACTION_FAILED,
            error: error?.data,
        });
    }
});

export default function* saga() {
    yield all([
        getAchRdfiWebhooks,
        getAchCirWebhooks,
        getAchReturnWebhooks,
        getAchRejectWebhooks,
        returnAchRdfiTransaction,
    ]);
}
