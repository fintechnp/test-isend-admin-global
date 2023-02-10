import { takeEvery, call, put, all } from "redux-saga/effects";

import buildRoute from "App/helpers/buildRoute";
import customerActions from "./customerActions";
import apiEndpoints from "Private/config/apiEndpoints";

import Api from "App/services/api";

const api = new Api();

export const updateCustomerAccount = takeEvery(customerActions.UPDATE_CUSTOMER_ACCOUNT, function* (action) {
    try {
        const res = yield call(
            api.put,
            buildRoute(apiEndpoints.customers.updateAccount, action.customer_id),
            action.data,
        );
        yield put({
            type: customerActions.UPDATE_CUSTOMER_ACCOUNT_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: customerActions.UPDATE_CUSTOMER_ACCOUNT_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export default function* customerSaga() {
    yield all([updateCustomerAccount]);
}
