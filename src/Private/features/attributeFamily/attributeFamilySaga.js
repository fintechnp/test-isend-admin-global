import Api from "App/services/api";
import attributeFamilyActions from "./attributeFamilyActions";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAttributeFamilyList = takeEvery(attributeFamilyActions.GET_ATTRIBUTE_FAMILY_LIST, function* () {
    try {
        const res = yield call(api.get, `attribute-families`);
        yield put({
            type: attributeFamilyActions.GET_ATTRIBUTE_FAMILY_LIST_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: attributeFamilyActions.GET_ATTRIBUTE_FAMILY_LIST_FAILURE,
            error: error?.data,
        });
    }
});

export const deleteAttributeFamily = takeEvery(attributeFamilyActions.DELETE_ATTRIBUTE_FAMILY, function* (action) {
    try {
        const res = yield call(api.delete, `attribute-family/${action.id}`);
        yield put({
            type: attributeFamilyActions.DELETE_ATTRIBUTE_FAMILY_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: attributeFamilyActions.DELETE_ATTRIBUTE_FAMILY_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const addAttributeFamily = takeEvery(attributeFamilyActions.ADD_ATTRIBUTE_FAMILY, function* (action) {
    try {
        const res = yield call(api.post, `attribute-family`, action.data);
        yield put({
            type: attributeFamilyActions.ADD_ATTRIBUTE_FAMILY_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: attributeFamilyActions.ADD_ATTRIBUTE_FAMILY_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateAttributeFamily = takeEvery(attributeFamilyActions.UPDATE_ATTRIBUTE_FAMILY, function* (action) {
    try {
        const res = yield call(api.put, `attribute-family`, action.data);
        yield put({
            type: attributeFamilyActions.UPDATE_ATTRIBUTE_FAMILY_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: attributeFamilyActions.UPDATE_ATTRIBUTE_FAMILY_FAILURE,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* attributeFamilySaga() {
    yield all([getAttributeFamilyList, deleteAttributeFamily, addAttributeFamily, updateAttributeFamily]);
}
