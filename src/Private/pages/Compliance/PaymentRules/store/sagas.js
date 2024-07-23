import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getPaymentRules = takeEvery(actions.GET_PAYMENT_RULES, function* (action) {
    try {
        const res = yield call(api.get, `compliance`, action.query);
        yield put({
            type: actions.GET_PAYMENT_RULES_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PAYMENT_RULES_FAILED,
            error: error?.data,
        });
    }
});

export const getPaymentRulesDetailById = takeEvery(actions.GET_PAYMENT_RULES_DETAILS_BY_ID, function* (action) {
    try {
        const res = yield call(api.get, `compliance/${action.id}`);
        yield put({
            type: actions.GET_PAYMENT_RULES_DETAILS_BY_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PAYMENT_RULES_DETAILS_BY_ID_FAILED,
            error: error?.data,
        });
    }
});

export const addPaymentRules = takeEvery(actions.ADD_PAYMENT_RULES, function* (action) {
    try {
        const res = yield call(api.post, `compliance`, action.data);
        yield put({
            type: actions.ADD_PAYMENT_RULES_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_PAYMENT_RULES_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updatePaymentRules = takeEvery(actions.UPDATE_PAYMENT_RULES, function* (action) {
    try {
        const res = yield call(api.put, `compliance/${action.id}`, action.data);
        yield put({
            type: actions.UPDATE_PAYMENT_RULES_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_PAYMENT_RULES_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updatePaymentRuleStatus = takeEvery(actions.UPDATE_PAYMENT_RULES_STATUS, function* (action) {
    const query = api.getJSONToQueryStr(action.data);
    try {
        const res = yield call(api.patch, `compliance/${action.id}?${query}`);
        yield put({
            type: actions.UPDATE_PAYMENT_RULES_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_PAYMENT_RULES_STATUS_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deletePaymentRules = takeEvery(actions.DELETE_PAYMENT_RULES, function* (action) {
    try {
        const res = yield call(api.delete, `compliance/${action.id}`);
        yield put({
            type: actions.DELETE_PAYMENT_RULES_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_PAYMENT_RULES_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([
        getPaymentRules,
        getPaymentRulesDetailById,
        addPaymentRules,
        updatePaymentRules,
        updatePaymentRuleStatus,
        deletePaymentRules,
    ]);
}
