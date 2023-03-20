import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllExchangeRate = takeEvery(
    actions.GET_EXCHANGE_RATE,
    function* (action) {
        try {
            const res = yield call(api.get, `exchangerate`, action.query);
            yield put({
                type: actions.GET_EXCHANGE_RATE_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_EXCHANGE_RATE_FAILED,
                error: error.data,
            });
        }
    }
);

export const getExchangeRateByPartner = takeEvery(
    actions.GET_EXCHANGE_RATE_BY_PARTNER,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `${action.id}/exchangerate`,
                action.query
            );
            yield put({
                type: actions.GET_EXCHANGE_RATE_BY_PARTNER_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_EXCHANGE_RATE_BY_PARTNER_FAILED,
                error: error.data,
            });
        }
    }
);

export const getExchangeRateDetails = takeEvery(
    actions.GET_EXCHANGE_RATE_DETAILS,
    function* (action) {
        try {
            const res = yield call(api.get, `exchangerate/${action.id}`);
            yield put({
                type: actions.GET_EXCHANGE_RATE_DETAILS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_EXCHANGE_RATE_DETAILS_FAILED,
                error: error.data,
            });
        }
    }
);

export const addExchangeRate = takeEvery(
    actions.ADD_EXCHANGE_RATE,
    function* (action) {
        try {
            const res = yield call(api.post, `exchangerate`, action.data);
            yield put({
                type: actions.ADD_EXCHANGE_RATE_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.ADD_EXCHANGE_RATE_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const updateExchangeRate = takeEvery(
    actions.UPDATE_EXCHANGE_RATE,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `exchangerate/${action.id}`,
                action.data
            );
            yield put({
                type: actions.UPDATE_EXCHANGE_RATE_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_EXCHANGE_RATE_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const deleteExchangeRate = takeEvery(
    actions.DELETE_EXCHANGE_RATE,
    function* (action) {
        try {
            const res = yield call(api.delete, `exchangerate/${action.id}`);
            yield put({
                type: actions.DELETE_EXCHANGE_RATE_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.DELETE_EXCHANGE_RATE_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* saga() {
    yield all([
        getAllExchangeRate,
        getExchangeRateByPartner,
        getExchangeRateDetails,
        addExchangeRate,
        updateExchangeRate,
        deleteExchangeRate,
    ]);
}
