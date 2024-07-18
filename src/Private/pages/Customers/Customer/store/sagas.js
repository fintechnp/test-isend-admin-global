import { put, takeEvery, call, all } from "redux-saga/effects";

import actions from "./actions";
import Api from "App/services/api";

const api = new Api();

export const getCustomerById = takeEvery(actions.GET_CUSTOMER_BY_ID, function* (action) {
    try {
        const res = yield call(api.get, `customer/${action.id}`);
        yield put({
            type: actions.GET_CUSTOMER_BY_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_CUSTOMER_BY_ID_FAILED,
            error: error?.data,
        });
    }
});

export const createCustomer = takeEvery(actions.CREATE_CUSTOMER, function* (action) {
    try {
        const res = yield call(api.post, `customer`, action.data, {
            "Content-Type": "multipart/form-dataa",
        });
        yield put({
            type: actions.CREATE_CUSTOMER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.CREATE_CUSTOMER_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateCustomer = takeEvery(actions.UPDATE_CUSTOMER, function* (action) {
    try {
        const res = yield call(api.put, `customer/${action.id}`, action.data);
        yield put({
            type: actions.UPDATE_CUSTOMER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_CUSTOMER_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getCustomerById, createCustomer, updateCustomer]);
}
