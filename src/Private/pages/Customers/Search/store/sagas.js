import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getCustomers = takeEvery(
    actions.GET_CUSTOMERS,
    function* (action) {
        try {
            const res = yield call(api.get, `customer`, action.query);
            yield put({
                type: actions.GET_CUSTOMERS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_CUSTOMERS_FAILED,
                error: error.data,
            });
        }
    }
);

export const getCustomersByPartner = takeEvery(
    actions.GET_CUSTOMERS_BY_PARTNER,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `customer/${action.id}`,
                action.query
            );
            yield put({
                type: actions.GET_CUSTOMERS_BY_PARTNER_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_CUSTOMERS_BY_PARTNER_FAILED,
                error: error.data,
            });
        }
    }
);

export const BlockUnblockCustomer = takeEvery(
    actions.BLOCK_UNBLOCK_CUSTOMER,
    function* (action) {
        const query = api.getJSONToQueryStr(action.query);
        try {
            const res = yield call(
                api.patch,
                `customer/${action.id}?${query}`,
                action.data
            );
            yield put({
                type: actions.BLOCK_UNBLOCK_CUSTOMER_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.BLOCK_UNBLOCK_CUSTOMER_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export default function* saga() {
    yield all([getCustomers, getCustomersByPartner, BlockUnblockCustomer]);
}
