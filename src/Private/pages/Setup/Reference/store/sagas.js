import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllReference = takeEvery(actions.GET_REFERENCE, function* (action) {
    try {
        const res = yield call(api.get, `common/referencetype`, action.query);
        yield put({ type: actions.GET_REFERENCE_SUCCESS, response: res });
    } catch (error) {
        yield put({
            type: actions.GET_REFERENCE_FAILED,
            error: error?.data,
        });
    }
});

export const addReference = takeEvery(actions.ADD_REFERENCE, function* (action) {
    try {
        const res = yield call(api.post, `common/referencetype`, action.data);
        yield put({ type: actions.ADD_REFERENCE_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_REFERENCE_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateReference = takeEvery(actions.UPDATE_REFERENCE, function* (action) {
    try {
        const res = yield call(api.put, `common/referencetype/${action.id}`, action.data);
        yield put({
            type: actions.UPDATE_REFERENCE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_REFERENCE_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getAllReferenceData = takeEvery(actions.GET_REFERENCE_DATA, function* (action) {
    try {
        const res = yield call(api.get, `common/${action.id}/referencedata`, action.query);
        yield put({
            type: actions.GET_REFERENCE_DATA_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_REFERENCE_DATA_FAILED,
            error: error?.data,
        });
    }
});

export const addReferenceData = takeEvery(actions.ADD_REFERENCE_DATA, function* (action) {
    try {
        const res = yield call(api.post, `common/referencedata`, action.data);
        yield put({
            type: actions.ADD_REFERENCE_DATA_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_REFERENCE_DATA_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateReferenceData = takeEvery(actions.UPDATE_REFERENCE_DATA, function* (action) {
    try {
        const res = yield call(api.put, `common/referencedata`, action.data);
        yield put({
            type: actions.UPDATE_REFERENCE_DATA_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_REFERENCE_DATA_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteReferenceData = takeEvery(actions.DELETE_REFERENCE_DATA, function* (action) {
    try {
        const res = yield call(api.delete, `common/referencedata/${action.id}`);
        yield put({
            type: actions.DELETE_REFERENCE_DATA_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_REFERENCE_DATA_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([
        getAllReference,
        addReference,
        updateReference,
        getAllReferenceData,
        addReferenceData,
        updateReferenceData,
        deleteReferenceData,
    ]);
}
