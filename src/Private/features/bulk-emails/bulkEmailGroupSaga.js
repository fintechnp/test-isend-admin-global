import { put, takeEvery, call, all } from "redux-saga/effects";

import Api from "App/services/api";
import actions from "./bulkEmailGroupAction";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getBulkEmailGroups = takeEvery(actions.GET_BULK_EMAIL_GROUPS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.bulkEmailGroup.list, action.query);
        yield put({
            type: actions.GET_BULK_EMAIL_GROUPS_SUCCESS,
            response: res,
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: actions.GET_BULK_EMAIL_GROUPS_FAILED,
            error: error.data,
        });
    }
});

export const addBulkEmailGroup = takeEvery(actions.ADD_BULK_EMAIL_GROUP, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.bulkEmailGroup.create, action.data);
        yield put({
            type: actions.ADD_BULK_EMAIL_GROUP_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_BULK_EMAIL_GROUP_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const updateBulkEmailGroup = takeEvery(actions.UPDATE_BULK_EMAIL_GROUP, function* (action) {
    try {
        const res = yield call(
            api.put,
            buildRoute(apiEndpoints.bulkEmailGroup.update, action.bulk_email_group_id),
            action.data,
        );
        yield put({
            type: actions.UPDATE_BULK_EMAIL_GROUP_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_BULK_EMAIL_GROUP_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const deleteBulkEmailGroup = takeEvery(actions.DELETE_BULK_EMAIL_GROUP, function* (action) {
    try {
        const res = yield call(api.delete, buildRoute(apiEndpoints.bulkEmailGroup.delete, action.bulk_email_group_id));
        yield put({
            type: actions.DELETE_BULK_EMAIL_GROUP_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_BULK_EMAIL_GROUP_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export default function* bulkEmailGroupSaga() {
    yield all([getBulkEmailGroups, addBulkEmailGroup, updateBulkEmailGroup, deleteBulkEmailGroup]);
}
