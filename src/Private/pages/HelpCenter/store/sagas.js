import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "App/services/api";
import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getHelpCenters = takeEvery(actions.GET_HELP_CENTERS, function* () {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetHelpCenters), actions.query);

        yield put({
            type: actions.GET_HELP_CENTERS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_HELP_CENTERS_SUCCESS,
            error: error?.data,
        });
    }
});

export const createHelpCenter = takeEvery(actions.CREATE_HELP_CENTER, function* (action) {
    try {
        const res = yield call(api.post, buildRoute(apiEndpoints.CreateHelpCenter), action.data);

        yield put({
            type: actions.CREATE_HELP_CENTER_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.CREATE_HELP_CENTER_FAILED,
            error: error?.data,
        });
        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export const updateHelpCenter = takeEvery(actions.UPDATE_HELP_CENTER, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.UpdateHelpCenter, action.id), action.data);
        yield put({
            type: actions.UPDATE_HELP_CENTER_SUCCESS,
            response: res,
        });
        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.UPDATE_HELP_CENTER_FAILED,
            error: error?.data,
        });
        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export default function* sagas() {
    yield all([getHelpCenters, createHelpCenter, updateHelpCenter]);
}
