import actions from "./actions";
import Api from "App/services/api";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllCreditLimit = takeEvery(actions.GET_CREDIT_LIMIT, function* (action) {
    try {
        const res = yield call(api.get, "/creditlimits", action.query);
        yield put({
            type: actions.GET_CREDIT_LIMIT_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_CREDIT_LIMIT_FAILED,
            error: error?.data,
        });
    }
});

export const getCreditLimitByIdDetails = takeEvery(actions.GET_CREDIT_LIMIT_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.creditLimit.getById, action.id));
        yield put({
            type: actions.GET_CREDIT_LIMIT_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_CREDIT_LIMIT_DETAILS_FAILED,
            error: error.data,
        });
    }
});

export const addCreditLimit = takeEvery(actions.ADD_CREDIT_LIMIT, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.creditLimit.add, action.data);
        yield put({
            type: actions.ADD_CREDIT_LIMIT_SUCCESS,
            response: res,
        });
        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
        yield put({
            type: actions.ADD_CREDIT_LIMIT_RESET,
        });
    } catch (error) {
        yield put({
            type: actions.ADD_CREDIT_LIMIT_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export const updateCreditLimitStatus = takeEvery(actions.UPDATE_CREDIT_LIMIT_STATUS, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.creditLimit.update, action.id), action.data);
        yield put({
            type: actions.UPDATE_CREDIT_LIMIT_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({
            type: actions.UPDATE_CREDIT_LIMIT_STATUS_RESET,
        });
    } catch (error) {
        yield put({
            type: actions.UPDATE_CREDIT_LIMIT_STATUS_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getAllCreditLimit, getCreditLimitByIdDetails, addCreditLimit, updateCreditLimitStatus]);
}
