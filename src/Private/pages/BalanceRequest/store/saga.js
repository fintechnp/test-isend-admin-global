import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllBalanceRequest = takeEvery(actions.GET_BALANCE_REQUEST, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.balanceRequest.getAll, action.query);
        yield put({
            type: actions.GET_BALANCE_REQUEST_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BALANCE_REQUEST_FAILED,
            error: error?.data,
        });
    }
});

export const getBalanceRequestByIdDetails = takeEvery(actions.GET_BALANCE_REQUEST_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.balanceRequest.getById, action.id));
        yield put({
            type: actions.GET_BALANCE_REQUEST_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BALANCE_REQUEST_DETAILS_FAILED,
            error: error.data,
        });
    }
});

export const updateBalanceRequestStatus = takeEvery(actions.UPDATE_BALANCE_REQUEST_STATUS, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.balanceRequest.updateStatus, action.id), action.data);
        yield put({
            type: actions.UPDATE_BALANCE_REQUEST_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_BALANCE_REQUEST_STATUS_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export default function* saga() {
    yield all([getAllBalanceRequest, getBalanceRequestByIdDetails, updateBalanceRequestStatus]);
}
