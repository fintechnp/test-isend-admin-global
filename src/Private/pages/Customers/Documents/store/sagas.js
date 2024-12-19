import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getDocuments = takeEvery(actions.GET_DOCUMENTS, function* (action) {
    try {
        const res = yield call(api.get, `customer/${action.customer_id}/document`, action.query);
        yield put({
            type: actions.GET_DOCUMENTS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_DOCUMENTS_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getDocumentsById = takeEvery(actions.GET_DOCUMENTS_BYID, function* (action) {
    try {
        const res = yield call(api.get, `customer/document/${action.id}`);
        yield put({
            type: actions.GET_DOCUMENTS_BYID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_DOCUMENTS_BYID_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const uploadDocuments = takeEvery(actions.UPLOAD_DOCUMENTS, function* (action) {
    try {
        const res = yield call(api.post, `customer/${action.customer_id}/document`, action.data);
        yield put({
            type: actions.UPLOAD_DOCUMENTS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPLOAD_DOCUMENTS_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateKyc = takeEvery(actions.UPDATE_KYC, function* (action) {
    try {
        const res = yield call(api.put, `customer/${action.customer_id}/kyc`, action.data);
        yield put({
            type: actions.UPDATE_KYC_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_KYC_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteDocuments = takeEvery(actions.DELETE_DOCUMENTS, function* (action) {
    try {
        const res = yield call(api.delete, `customer/${action.customer_id}/document/${action.id}`);
        yield put({
            type: actions.DELETE_DOCUMENTS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_DOCUMENTS_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const resetKycVerification = takeEvery(actions.KYC_VERIFICATION_LIMIT, function* ({ data }) {
    try {
        const res = yield call(api.put, `customer/KycCount/${data.customer_id}`);

        yield put({
            type: actions.KYC_VERIFICATION_LIMIT_SUCCESS,
            response: res,
        });

        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.KYC_VERIFICATION_LIMIT_FAILED,
            error: error?.data,
        });

        // Dispatch error response for UI
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getDocuments, getDocumentsById, uploadDocuments, updateKyc, deleteDocuments, resetKycVerification]);
}
