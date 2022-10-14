import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getApiConfig = takeEvery(
    actions.GET_API_CONFIG,
    function* (action) {
        try {
            const res = yield call(api.get, `apiconfig`, action.query);
            yield put({
                type: actions.GET_API_CONFIG_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_API_CONFIG_FAILED,
                error: error.data,
            });
        }
    }
);

export const getApiConfigDetails = takeEvery(
    actions.GET_API_CONFIG_DETAILS,
    function* (action) {
        try {
            const res = yield call(api.get, `apiconfig/${action.id}`);
            yield put({
                type: actions.GET_API_CONFIG_DETAILS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_API_CONFIG_DETAILS_FAILED,
                error: error.data,
            });
        }
    }
);

export const addApiConfig = takeEvery(
    actions.ADD_API_CONFIG,
    function* (action) {
        try {
            const res = yield call(api.post, `apiconfig`, action.data);
            yield put({
                type: actions.ADD_API_CONFIG_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.ADD_API_CONFIG_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export const updateApiConfig = takeEvery(
    actions.UPDATE_API_CONFIG,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `apiconfig/${action.id}`,
                action.data
            );
            yield put({
                type: actions.UPDATE_API_CONFIG_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_API_CONFIG_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export default function* saga() {
    yield all([
        getApiConfig,
        getApiConfigDetails,
        addApiConfig,
        updateApiConfig,
    ]);
}
