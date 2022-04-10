import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllPermission = takeEvery(
    actions.GET_ALL_PERMISSION,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `account/policies/${action.id}`,
                action.query
            );
            yield put({
                type: actions.GET_ALL_PERMISSION_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_ALL_PERMISSION_FAILED,
                error: error.data,
            });
        }
    }
);

export const createUserPermission = takeEvery(
    actions.CREATE_USER_PERMISSION,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `account/policies/${action.id}`,
                action.data
            );
            yield put({
                type: actions.CREATE_USER_PERMISSION_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.CREATE_USER_PERMISSION_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* saga() {
    yield all([getAllPermission, createUserPermission]);
}
