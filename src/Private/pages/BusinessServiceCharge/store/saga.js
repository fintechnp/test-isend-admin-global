import Api from "App/services/api";
import { all, call, put, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import apiEndpoints from "Private/config/apiEndpoints";
import buildRoute from "App/helpers/buildRoute";

const api = new Api();

export const getAllBusinessCharge = takeEvery(actions.GET_BUSINESS_SERVICE_CHARGE, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.businessCharge.getAll, action.query);
        yield put({
            type: actions.GET_BUSINESS_SERVICE_CHARGE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BUSINESS_SERVICE_CHARGE_FAILED,
            error: error?.data,
        });
    }
});

export const getBusinessChargeById = takeEvery(actions.GET_BUSINESS_SERVICE_CHARGE_DETAILS, function* (action) {
    try {
        const response = yield call(api.get, buildRoute(apiEndpoints.businessCharge.getById, action.id));

        yield put({
            type: actions.GET_BUSINESS_SERVICE_CHARGE_DETAILS_SUCCESS,
            response,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BUSINESS_SERVICE_CHARGE_DETAILS_FAILED,
            error: error?.data,
        });
    }
});

export const addBusinessCharge = takeEvery(actions.ADD_BUSINESS_SERVICE_CHARGE, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.businessCharge.add, action.data);
        yield put({
            type: actions.ADD_BUSINESS_SERVICE_CHARGE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.ADD_BUSINESS_SERVICE_CHARGE_RESET });
    } catch (error) {
        yield put({
            type: actions.ADD_BUSINESS_SERVICE_CHARGE_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export const updateBusinessChargeStatus = takeEvery(actions.UPDATE_BUSINESS_SERVICE_CHARGE_STATUS, function* (action) {
    try {
        const res = yield call(api.patch, buildRoute(apiEndpoints.businessCharge.updateStatus, action.id));
        yield put({
            type: actions.UPDATE_BUSINESS_SERVICE_CHARGE_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_BUSINESS_SERVICE_CHARGE_STATUS_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export default function* saga() {
    yield all([getAllBusinessCharge, getBusinessChargeById, addBusinessCharge, updateBusinessChargeStatus]);
}
