import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllPayoutLocation = takeEvery(actions.GET_PAYOUT_LOCATION, function* (action) {
    try {
        var res = yield call(api.get, `payoutlocation`, action.query);
        yield put({
            type: actions.GET_PAYOUT_LOCATION_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PAYOUT_LOCATION_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getPayoutLocationDetails = takeEvery(actions.GET_PAYOUT_LOCATION_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, `payoutlocation/${action.id}`);
        yield put({
            type: actions.GET_PAYOUT_LOCATION_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PAYOUT_LOCATION_DETAILS_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const addPayoutLocation = takeEvery(actions.ADD_PAYOUT_LOCATION, function* (action) {
    try {
        const res = yield call(api.post, `payoutlocation`, action.data);
        yield put({
            type: actions.ADD_PAYOUT_LOCATION_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_PAYOUT_LOCATION_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updatePayoutLocation = takeEvery(actions.UPDATE_PAYOUT_LOCATION, function* (action) {
    try {
        const res = yield call(api.put, `payoutlocation/${action.id}`, action.data);
        yield put({
            type: actions.UPDATE_PAYOUT_LOCATION_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_PAYOUT_LOCATION_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updatePayoutLocationStatus = takeEvery(actions.UPDATE_PAYOUT_LOCATION_STATUS, function* (action) {
    const query = api.getJSONToQueryStr(action.data);
    try {
        const res = yield call(api.patch, `payoutlocation/${action.id}?${query}`);
        yield put({
            type: actions.UPDATE_PAYOUT_LOCATION_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_PAYOUT_LOCATION_STATUS_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deletePayoutLocation = takeEvery(actions.DELETE_PAYOUT_LOCATION, function* (action) {
    try {
        const res = yield call(api.delete, `payoutlocation/${action.id}`);
        yield put({
            type: actions.DELETE_PAYOUT_LOCATION_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: "GET_PAYOUT_LOCATION" });
    } catch (error) {
        yield put({
            type: actions.DELETE_PAYOUT_LOCATION_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([
        getAllPayoutLocation,
        getPayoutLocationDetails,
        addPayoutLocation,
        updatePayoutLocation,
        deletePayoutLocation,
        updatePayoutLocationStatus,
    ]);
}
