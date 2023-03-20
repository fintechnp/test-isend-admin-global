import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllMenu = takeEvery(actions.GET_ALL_MENU, function* (action) {
    try {
        const res = yield call(api.get, `menu`, action.query);
        yield put({ type: actions.GET_ALL_MENU_SUCCESS, response: res });
    } catch (error) {
        yield put({ type: actions.GET_ALL_MENU_FAILED, error: error.data });
    }
});

export const addMenu = takeEvery(actions.ADD_MENU, function* (action) {
    try {
        const res = yield call(api.post, `menu`, action.data);
        yield put({ type: actions.ADD_MENU_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.ADD_MENU_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateMenu = takeEvery(actions.UPDATE_MENU, function* (action) {
    try {
        const res = yield call(api.put, `menu/${action.id}`, action.data);
        yield put({ type: actions.UPDATE_MENU_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.UPDATE_MENU_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateMenuStatus = takeEvery(
    actions.UPDATE_MENU_STATUS,
    function* (action) {
        const query = api.getJSONToQueryStr(action.data);
        try {
            const res = yield call(api.patch, `menu/${action.id}?${query}`);
            yield put({
                type: actions.UPDATE_MENU_STATUS_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_MENU_STATUS_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const deleteMenu = takeEvery(actions.DELETE_MENU, function* (action) {
    try {
        const res = yield call(api.delete, `menu/${action.id}`);
        yield put({ type: actions.DELETE_MENU_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.DELETE_MENU_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* MenuSaga() {
    yield all([getAllMenu, addMenu, updateMenu, updateMenuStatus, deleteMenu]);
}
