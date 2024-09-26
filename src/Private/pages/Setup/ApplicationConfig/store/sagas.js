import actions from "./actions";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { all, call, put, takeEvery } from "redux-saga/effects";

const api = new Api();

export const getApplicationConfig = takeEvery(actions.GET_APPLICATION_CONFIG, function* () {
    try {
        const res = yield call(api.get, apiEndpoints.GetApplicationConfig);
        yield put({
            type: actions.GET_APPLICATION_CONFIG_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({ type: "SET_TOAST_DATA", response: error.data });
        yield put({
            type: actions.GET_APPLICATION_CONFIG_FAILED,
            error: error?.data,
        });
    }
});

export const updateApplicationConfig = takeEvery(actions.UPDATE_APPLICATION_CONFIG, function* (action) {
    try {
        const res = yield call(api.patch, apiEndpoints.UpdateApplicationConfig, action.data);
        yield put({
            type: actions.UPDATE_APPLICATION_CONFIG_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_APPLICATION_CONFIG_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getApplicationConfig, updateApplicationConfig]);
}
