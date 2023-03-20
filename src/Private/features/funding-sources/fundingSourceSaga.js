import { put, takeEvery, call, all } from "redux-saga/effects";

import Api from "App/services/api";
import actions from "./fundingSourceActions";
import apiEndpoints from "Private/config/apiEndpoints";
import buildRoute from "App/helpers/buildRoute";

const api = new Api();

export const getFundingSources = takeEvery(actions.GET_FUNDING_SOURCES, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.fundingSources.list, action.query);
        yield put({
            type: actions.GET_FUNDING_SOURCES_SUCCESS,
            response: res,
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: actions.GET_FUNDING_SOURCES_FAILED,
            error: error.data,
        });
    }
});

export const addFundingSource = takeEvery(actions.ADD_FUNDING_SOURCE, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.fundingSources.create, action.data);
        yield put({
            type: actions.ADD_FUNDING_SOURCE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_FUNDING_SOURCE_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const updateFundingSource = takeEvery(actions.UPDATE_FUNDING_SOURCE, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.fundingSources.update, action.id), action.data);
        yield put({
            type: actions.UPDATE_FUNDING_SOURCE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_FUNDING_SOURCE_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const updateFundingSourceStatus = takeEvery(actions.UPDATE_FUNDING_SOURCE_STATUS, function* (action) {
    try {
        const res = yield call(
            api.patch,
            buildRoute(apiEndpoints.fundingSources, {
                fundingSourceId: action.id,
                ...action.data,
            }),
        );
        yield put({
            type: actions.UPDATE_FUNDING_SOURCE_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_FUNDING_SOURCE_STATUS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteFundingSource = takeEvery(actions.DELETE_FUNDING_SOURCE, function* (action) {
    try {
        const res = yield call(api.delete, buildRoute(apiEndpoints.fundingSources.delete, action.id));
        yield put({
            type: actions.DELETE_FUNDING_SOURCE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_FUNDING_SOURCE_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export default function* fundingSourceSaga() {
    yield all([
        getFundingSources,
        addFundingSource,
        updateFundingSource,
        updateFundingSourceStatus,
        deleteFundingSource,
    ]);
}
