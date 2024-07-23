import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllPartnerBank = takeEvery(actions.GET_ALL_PARTNER_BANK, function* (action) {
    try {
        const res = yield call(api.get, `partnerbank`, action.query);
        yield put({
            type: actions.GET_ALL_PARTNER_BANK_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ALL_PARTNER_BANK_FAILED,
            error: error?.data,
        });
    }
});

export const getPartnerBankById = takeEvery(actions.GET_PARTNER_BANK_BYID, function* (action) {
    try {
        const res = yield call(api.get, `partnerbank/${action.id}`);
        yield put({
            type: actions.GET_PARTNER_BANK_BYID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PARTNER_BANK_BYID_FAILED,
            error: error?.data,
        });
    }
});

export const getPartnerBankByAgentId = takeEvery(actions.GET_PARTNER_BANK_AGENT_ID, function* (action) {
    try {
        const res = yield call(api.get, `${action.id}/partnerbank`);
        yield put({
            type: actions.GET_PARTNER_BANK_AGENT_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_PARTNER_BANK_AGENT_ID_FAILED,
            error: error?.data,
        });
    }
});

export const createPartnerBank = takeEvery(actions.CREATE_PARTNER_BANK, function* (action) {
    try {
        const res = yield call(api.post, `partnerbank`, action.data);
        yield put({
            type: actions.CREATE_PARTNER_BANK_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.CREATE_PARTNER_BANK_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updatePartnerBank = takeEvery(actions.UPDATE_PARTNER_BANK, function* (action) {
    try {
        const res = yield call(api.put, `partnerbank/${action.id}`, action.data);
        yield put({
            type: actions.UPDATE_PARTNER_BANK_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_PARTNER_BANK_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const unmapPartnerBank = takeEvery(actions.MAP_PARTNER_BANK, function* (action) {
    const query = api.getJSONToQueryStr(action.data);
    try {
        const res = yield call(api.patch, `partnerbank/${action.id}?${query}`);
        yield put({
            type: actions.MAP_PARTNER_BANK_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.MAP_PARTNER_BANK_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deletePartnerBank = takeEvery(actions.DELETE_PARTNER_BANK, function* (action) {
    try {
        const res = yield call(api.delete, `partnerbank/${action.id}`);
        yield put({
            type: actions.DELETE_PARTNER_BANK_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_PARTNER_BANK_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([
        getAllPartnerBank,
        getPartnerBankById,
        getPartnerBankByAgentId,
        createPartnerBank,
        updatePartnerBank,
        deletePartnerBank,
        unmapPartnerBank,
    ]);
}
