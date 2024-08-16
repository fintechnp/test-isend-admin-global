import actions from "./actions";
import Api from "App/services/api";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getPromoCodeList = takeEvery(actions.GET_PROMO_CODE, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.ListPromoCode), action.query);

        yield put({
            type: actions.GET_PROMO_CODE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PROMO_CODE_FAILED,
            error: error?.data,
        });
    }
});

export const getPromoCodeUsageList = takeEvery(actions.GET_PROMO_CODE_USAGE, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.ListPromoCodeUsage), action.query);

        yield put({
            type: actions.GET_PROMO_CODE_USAGE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PROMO_CODE_USAGE_FAILED,
            error: error?.data,
        });
    }
});

const addPromoCode = takeEvery(actions.ADD_PROMO_CODE, function* (action) {
    try {
        const res = yield call(api.post, buildRoute(apiEndpoints.CreatePromoCode), action.data);

        console.log("The response is", res);

        yield put({
            type: actions.ADD_PROMO_CODE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.ADD_PROMO_CODE_FAILED,
            error: error?.data,
        });
    }
});

const addPromoCodeBudget = takeEvery(actions.ADD_PROMO_CODE_BUDGET, function* (action) {
    try {
        const res = yield call(api.post, buildRoute(apiEndpoints.AddPromoCodeBudget), action.data);

        yield put({
            type: actions.ADD_PROMO_CODE_BUDGET_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.ADD_PROMO_CODE_BUDGET_FAILED,
            error: error?.data,
        });
    }
});

export const getPromoCodeById = takeEvery(actions.GET_PROMO_CODE_BY_ID, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.ViewPromoCode, action.id));

        yield put({
            type: actions.GET_PROMO_CODE_BY_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PROMO_CODE_BY_ID_FAILED,
            error: error?.data,
        });
    }
});

export const updatePromoCodeStatus = takeEvery(actions.UPDATE_PROMO_CODE_STATUS, function* (action) {
    try {
        const res = yield call(api.patch, buildRoute(apiEndpoints.UpdatePromoCodeStatus), action.data);

        yield put({
            type: actions.UPDATE_PROMO_CODE_STATUS_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.UPDATE_PROMO_CODE_STATUS_FAILED,
            error: error?.data,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export default function* Saga() {
    yield all([
        getPromoCodeList,
        addPromoCode,
        addPromoCodeBudget,
        getPromoCodeById,
        updatePromoCodeStatus,
        getPromoCodeUsageList,
    ]);
}
