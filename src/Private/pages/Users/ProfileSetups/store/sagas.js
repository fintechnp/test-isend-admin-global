import { put, takeEvery, call, all } from "redux-saga/effects";

import actions from "./actions";
import Api from "App/services/api";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getUserProfileSetups = takeEvery(actions.LIST_USER_PROFILE_SETUP, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.userProfileSetups.list, action.query);
        yield put({
            type: actions.LIST_USER_PROFILE_SETUP_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.LIST_USER_PROFILE_SETUP_FAILED,
            error: error?.data,
        });
    }
});

export const getUserProfileSetupsForSelect = takeEvery(actions.LIST_USER_PROFILE_SETUP_FOR_SELECT, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.userProfileSetups.list, action.query);
        yield put({
            type: actions.LIST_USER_PROFILE_SETUP_FOR_SELECT_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.LIST_USER_PROFILE_SETUP_FOR_SELECT_FAILED,
            error: error?.data,
        });
    }
});

export const getUserProfileSetupById = takeEvery(actions.GET_USER_PROFILE_SETUP_BY_ID, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.userProfileSetups.get, { roleId: action.id }));
        yield put({
            type: actions.GET_USER_PROFILE_SETUP_BY_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_USER_PROFILE_SETUP_BY_ID_FAILED,
            error: error?.data,
        });
    }
});

export const addUserProfileSetup = takeEvery(actions.ADD_USER_PROFILE_SETUP, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.userProfileSetups.create, action.data);
        yield put({ type: actions.ADD_USER_PROFILE_SETUP_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.ADD_USER_PROFILE_SETUP_FAILED, error: error?.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateUserProfileSetup = takeEvery(actions.UPDATE_USER_PROFILE_SETUP, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.userProfileSetups.update + `?roleId=${action.id}`, action.data);
        yield put({
            type: actions.UPDATE_USER_PROFILE_SETUP_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_USER_PROFILE_SETUP_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* userProfileSetupSaga() {
    yield all([
        getUserProfileSetups,
        getUserProfileSetupsForSelect,
        getUserProfileSetupById,
        addUserProfileSetup,
        updateUserProfileSetup,
    ]);
}
