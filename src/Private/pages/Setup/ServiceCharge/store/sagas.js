import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllServiceCharge = takeEvery(
    actions.GET_SERVICE_CHARGE,
    function* (action) {
        try {
            const res = yield call(api.get, `servicecharge`, action.query);
            yield put({
                type: actions.GET_SERVICE_CHARGE_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_SERVICE_CHARGE_FAILED,
                error: error.data,
            });
        }
    }
);

export const getServiceChargeByPartner = takeEvery(
    actions.GET_SERVICE_CHARGE_BY_PARTNER,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `${action.id}/servicecharge`,
                action.query
            );
            yield put({
                type: actions.GET_SERVICE_CHARGE_BY_PARTNER_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_SERVICE_CHARGE_BY_PARTNER_FAILED,
                error: error.data,
            });
        }
    }
);

export const getServiceChargeDetails = takeEvery(
    actions.GET_SERVICE_CHARGE_DETAILS,
    function* (action) {
        try {
            const res = yield call(api.get, `servicecharge/${action.id}`);
            yield put({
                type: actions.GET_SERVICE_CHARGE_DETAILS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_SERVICE_CHARGE_DETAILS_FAILED,
                error: error.data,
            });
        }
    }
);

export const addServiceCharge = takeEvery(
    actions.ADD_SERVICE_CHARGE,
    function* (action) {
        try {
            const res = yield call(api.post, `servicecharge`, action.data);
            yield put({
                type: actions.ADD_SERVICE_CHARGE_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.ADD_SERVICE_CHARGE_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const updateServiceCharge = takeEvery(
    actions.UPDATE_SERVICE_CHARGE,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `servicecharge/${action.id}`,
                action.data
            );
            yield put({
                type: actions.UPDATE_SERVICE_CHARGE_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_SERVICE_CHARGE_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const updateServiceChargeStatus = takeEvery(
    actions.UPDATE_SERVICE_CHARGE_STATUS,
    function* (action) {
        const query = api.getJSONToQueryStr(action.data);
        try {
            const res = yield call(
                api.patch,
                `servicecharge/${action.id}?${query}`
            );
            yield put({
                type: actions.UPDATE_SERVICE_CHARGE_STATUS_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_SERVICE_CHARGE_STATUS_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export const deleteServiceCharge = takeEvery(
    actions.DELETE_SERVICE_CHARGE,
    function* (action) {
        try {
            const res = yield call(api.delete, `servicecharge/${action.id}`);
            yield put({
                type: actions.DELETE_SERVICE_CHARGE_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.DELETE_SERVICE_CHARGE_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* saga() {
    yield all([
        getAllServiceCharge,
        getServiceChargeByPartner,
        getServiceChargeDetails,
        addServiceCharge,
        updateServiceCharge,
        updateServiceChargeStatus,
        deleteServiceCharge,
    ]);
}
