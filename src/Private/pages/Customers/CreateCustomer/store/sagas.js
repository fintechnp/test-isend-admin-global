import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getCustomerById = takeEvery(
    actions.GET_CUSTOMER_BYID,
    function* (action) {
        try {
            const res = yield call(api.get, `customer/${action.id}`);
            yield put({
                type: actions.GET_CUSTOMER_BYID_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_CUSTOMER_BYID_FAILED,
                error: error?.data,
            });
        }
    }
);

export const createCustomers = takeEvery(
    actions.CREATE_CUSTOMERS,
    function* (action) {
        try {
            const res = yield call(api.post, `customer`, action.data);
            yield put({
                type: actions.CREATE_CUSTOMERS_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.CREATE_CUSTOMERS_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const updateCustomers = takeEvery(
    actions.UPDATE_CUSTOMERS,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `customer/${action.id}`,
                action.data
            );
            yield put({
                type: actions.UPDATE_CUSTOMERS_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_CUSTOMERS_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* saga() {
    yield all([getCustomerById, createCustomers, updateCustomers]);
}
