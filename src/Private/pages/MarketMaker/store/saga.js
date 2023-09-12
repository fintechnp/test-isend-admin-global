import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllMarketMaker = takeEvery(actions.GET_MARKET_MAKER, function* (action) {
    try {
        const res = yield call(api.get, "/marketmaker", action.query);
        yield put({
            type: actions.GET_MARKET_MAKER_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_MARKET_MAKER_FAILED,
            error: error?.data,
        });
    }
});

export const getMarketMakerByIdDetails = takeEvery(actions.GET_MARKET_MAKER_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.marketMaker.getById, action.id));
        yield put({
            type: actions.GET_MARKET_MAKER_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_MARKET_MAKER_DETAILS_FAILED,
            error: error.data,
        });
    }
});

export const addMarketMaker = takeEvery(actions.ADD_MARKET_MAKER, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.marketMaker.add, action.data);
        yield put({
            type: actions.ADD_MARKET_MAKER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.ADD_MARKET_MAKER_RESET });
    } catch (error) {
        yield put({
            type: actions.ADD_MARKET_MAKER_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export const updateMarketMaker = takeEvery(actions.UPDATE_MARKET_MAKER, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.marketMaker.update, action.id), action.data);
        yield put({
            type: actions.UPDATE_MARKET_MAKER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_MARKET_MAKER_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});
export const updateMarketMakerStatus = takeEvery(actions.UPDATE_MARKET_MAKER_STATUS, function* (action) {
    try {
        const res = yield call(api.patch, buildRoute(apiEndpoints.marketMaker.updateStatus, action.id));
        yield put({
            type: actions.UPDATE_MARKET_MAKER_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_MARKET_MAKER_STATUS_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

/// DOCUMENTS

export const getDocumentSettings = takeEvery(actions.GET_DOCUMENT_SETINGS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.document.documentSetting, action.query);
        yield put({
            type: actions.GET_DOCUMENT_SETINGS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_DOCUMENT_SETINGS_FAILED,
            error: error?.data,
        });
    }
});

export const addDocument = takeEvery(actions.ADD_DOCUMENT, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.document.addDocument, action.data);
        yield put({
            type: actions.ADD_DOCUMENT_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.ADD_DOCUMENT_RESET });
    } catch (error) {
        yield put({
            type: actions.ADD_DOCUMENT_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

// KYB

export const addMarketMakerKyb = takeEvery(actions.ADD_MARKET_MAKER_KYB, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.marketMaker.addKyb, action.data);
        yield put({
            type: actions.ADD_MARKET_MAKER_KYB_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.ADD_MARKET_MAKER_KYB_RESET });
    } catch (error) {
        yield put({
            type: actions.ADD_MARKET_MAKER_KYB_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export const updateMarketMakerKyb = takeEvery(actions.UPDATE_MARKET_MAKER_KYB, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.marketMaker.updateKyb, action.id), action.data);
        yield put({
            type: actions.UPDATE_MARKET_MAKER_KYB_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.UPDATE_MARKET_MAKER_KYB_RESET });
    } catch (error) {
        yield put({
            type: actions.UPDATE_MARKET_MAKER_KYB_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

// KYC

export const addMarketMakerKyc = takeEvery(actions.ADD_MARKET_MAKER_KYC, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.marketMaker.addKyc, action.data);
        yield put({
            type: actions.ADD_MARKET_MAKER_KYC_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.ADD_MARKET_MAKER_KYC_RESET });
    } catch (error) {
        yield put({
            type: actions.ADD_MARKET_MAKER_KYC_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export default function* saga() {
    yield all([
        getAllMarketMaker,
        getMarketMakerByIdDetails,
        addMarketMaker,
        updateMarketMaker,
        updateMarketMakerStatus,
        getDocumentSettings,
        addDocument,
        addMarketMakerKyb,
        updateMarketMakerKyb,
        addMarketMakerKyc,
    ]);
}
