import { put, takeEvery, call, all } from "redux-saga/effects";

import Api from "App/services/api";
import actions from "./bulkEmailAddressAction";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getBulkEmailAddresses = takeEvery(actions.GET_BULK_EMAIL_ADDRESSES, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.bulkEmailAddresses.list, action.query);
        yield put({
            type: actions.GET_BULK_EMAIL_ADDRESSES_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BULK_EMAIL_ADDRESSES_FAILED,
            error: error.data,
        });
    }
});

export const addBulkEmailAddress = takeEvery(actions.ADD_BULK_EMAIL_ADDRESS, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.bulkEmailAddresses.create, action.data);
        yield put({
            type: actions.ADD_BULK_EMAIL_ADDRESS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_BULK_EMAIL_ADDRESS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const updateBulkEmailAddress = takeEvery(actions.UPDATE_BULK_EMAIL_ADDRESS, function* (action) {
    try {
        const res = yield call(
            api.put,
            buildRoute(apiEndpoints.bulkEmailAddresses.update, action.bulk_email_address_id),
            action.data,
        );
        yield put({
            type: actions.UPDATE_BULK_EMAIL_ADDRESS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_BULK_EMAIL_ADDRESS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const updateFundingSourceStatus = takeEvery(actions.UPDATE_BULK_EMAIL_ADDRESS_STATUS, function* (action) {
    try {
        const res = yield call(
            api.patch,
            buildRoute(apiEndpoints.bulkEmailAddresses.updateStatus, {
                bulkEmailAddressId: action.bulk_email_address_id,
                ...action.data,
            }),
        );
        yield put({
            type: actions.UPDATE_BULK_EMAIL_ADDRESS_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_BULK_EMAIL_ADDRESS_STATUS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteBulkEmailAddress = takeEvery(actions.DELETE_BULK_EMAIL_ADDRESS, function* (action) {
    try {
        const res = yield call(
            api.delete,
            buildRoute(apiEndpoints.bulkEmailAddresses.delete, action.bulk_email_address_id),
        );
        yield put({
            type: actions.DELETE_BULK_EMAIL_ADDRESS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_BULK_EMAIL_ADDRESS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const importBulkEmailAddress = takeEvery(actions.IMPORT_BULK_EMAIL_ADDRESS, function* (action) {
    console.log("importing");
    try {
        const res = yield call(
            api.post,
            buildRoute(apiEndpoints.bulkEmailAddresses.import, action.group_id),
            action.data,
        );
        yield put({
            type: actions.IMPORT_BULK_EMAIL_ADDRESS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.IMPORT_BULK_EMAIL_ADDRESS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export const importConfirmBulkEmailAddress = takeEvery(actions.IMPORT_CONFIRM_BULK_EMAIL_ADDRESS, function* (action) {
    try {
        const res = yield call(
            api.post,
            buildRoute(apiEndpoints.bulkEmailAddresses.importConfirm, action.group_id),
            action.data,
        );
        yield put({
            type: actions.IMPORT_CONFIRM_BULK_EMAIL_ADDRESS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.IMPORT_CONFIRM_BULK_EMAIL_ADDRESS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export default function* bulkEmailAddressSaga() {
    yield all([
        getBulkEmailAddresses,
        addBulkEmailAddress,
        updateBulkEmailAddress,
        deleteBulkEmailAddress,
        importBulkEmailAddress,
        importConfirmBulkEmailAddress,
        updateFundingSourceStatus,
    ]);
}
