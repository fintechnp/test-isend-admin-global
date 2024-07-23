import { put, takeEvery, call, all } from "redux-saga/effects";

import actions from "./actions";
import Api from "App/services/api";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getAllCustomerDeleteList = takeEvery(actions.GET_CUSTOMER_DELETE_LIST, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.customers.deleteList, action.query);
        yield put({
            type: actions.GET_CUSTOMER_DELETE_LIST_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_CUSTOMER_DELETE_LIST_FAILED,
            error: error?.data,
        });
    }
});

export const getCustomerDeleteDetails = takeEvery(actions.GET_CUSTOMER_DELETE_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.customers.deleteRequestDetails, action.id));
        yield put({
            type: actions.GET_CUSTOMER_DELETE_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_CUSTOMER_DELETE_DETAILS_FAILED,
            error: error?.data,
        });
    }
});

export const updateCustomerDeleteRequest = takeEvery(actions.UPDATE_CUSTOMER_DELETE_REQUEST, function* (action) {
    try {
        const res = yield call(
            api.post,
            buildRoute(apiEndpoints.customers.approveDeleteRequest, action.id),
            action.data,
        );
        yield put({
            type: actions.UPDATE_CUSTOMER_DELETE_REQUEST_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.UPDATE_CUSTOMER_DELETE_REQUEST_RESET });
    } catch (error) {
        yield put({
            type: actions.UPDATE_CUSTOMER_DELETE_REQUEST_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getAllCustomerDeleteList, getCustomerDeleteDetails, updateCustomerDeleteRequest]);
}
