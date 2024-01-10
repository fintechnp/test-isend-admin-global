import actions from "./action";
import buildRoute from "App/helpers/buildRoute";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllStreetType = takeEvery(actions.GET_STREET_TYPE, function* (action) {
    try {
        const res = yield call(api.get, `common/street_type/${action.country}`, action.query);
        yield put({
            type: actions.GET_STREET_TYPE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_STREET_TYPE_FAILED,
            error: error?.data,
        });
    }
});

export const addStreetType = takeEvery(actions.ADD_STREET_TYPE, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.streetType.post, action.data);
        yield put({
            type: actions.ADD_STREET_TYPE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_STREET_TYPE_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export const updateStreetType = takeEvery(actions.UPDATE_STREET_TYPE, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.streetType.update, action.id), action.data);
        yield put({
            type: actions.UPDATE_STREET_TYPE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_STREET_TYPE_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteStreetType = takeEvery(actions.DELETE_STREET_TYPE, function* (action) {
    try {
        const res = yield call(api.delete, buildRoute(apiEndpoints.streetType.delete, action.id));
        yield put({
            type: actions.DELETE_STREET_TYPE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_STREET_TYPE_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getAllStreetType, addStreetType, updateStreetType, deleteStreetType]);
}
