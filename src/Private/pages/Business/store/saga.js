import Api from "App/services/api";
import { all, call, put, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import apiEndpoints from "Private/config/apiEndpoints";
import buildRoute from "App/helpers/buildRoute";

const api = new Api();

export const getAllBusiness = takeEvery(actions.GET_BUSINESS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.business.getAll, action.query);
        yield put({
            type: actions.GET_BUSINESS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BUSINESS_FAILED,
            error: error?.data,
        });
    }
});

export const getBusinessById = takeEvery(actions.GET_BUSINESS_DETAILS, function* (action) {
    try {
        const response = yield call(api.get, buildRoute(apiEndpoints.business.getById, action.id));

        yield put({
            type: actions.GET_BUSINESS_DETAILS_SUCCESS,
            response,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BUSINESS_DETAILS_FAILED,
            error: error?.data,
        });
    }
});

export const addBusinessApproval = takeEvery(actions.ADD_BUSINESS_APPROVAL, function* (action) {
    try {
        const response = yield call(api.put, buildRoute(apiEndpoints.business.addBusinessApproval, action.id));
        yield put({
            type: actions.ADD_BUSINESS_APPROVAL_SUCCESS,
            response,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_BUSINESS_APPROVAL_FAILED,
            error: error?.data,
        });
    }
});

export const updateBusinessStatus = takeEvery(actions.UPDATE_BUSINESS_STATUS, function* (action) {
    try {
        const res = yield call(api.patch, buildRoute(apiEndpoints.business.updateBusinessStatus, action.id));
        yield put({
            type: actions.UPDATE_BUSINESS_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({
            type: actions.UPDATE_BUSINESS_STATUS_RESET,
        });
    } catch (error) {
        yield put({
            type: actions.UPDATE_BUSINESS_STATUS_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getAllBusiness, getBusinessById, addBusinessApproval, updateBusinessStatus]);
}
