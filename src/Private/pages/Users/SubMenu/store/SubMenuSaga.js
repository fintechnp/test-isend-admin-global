import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllSubMenu = takeEvery(
    actions.GET_ALL_SUB_MENU,
    function* (action) {
        try {
            const res = yield call(api.get, `menu/${action.id}`, action?.query);
            yield put({
                type: actions.GET_ALL_SUB_MENU_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_ALL_SUB_MENU_FAILED,
                error: error?.data,
            });
        }
    }
);

export const addSubMenu = takeEvery(actions.ADD_SUB_MENU, function* (action) {
    try {
        const res = yield call(api.post, `menu/${action.id}`, action.data);
        yield put({ type: actions.ADD_SUB_MENU_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.ADD_SUB_MENU_FAILED, error: error?.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateSubMenu = takeEvery(
    actions.UPDATE_SUB_MENU,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `menu/${action.parent_id}/${action.sub_id}`,
                action.data
            );
            yield put({ type: actions.UPDATE_SUB_MENU_SUCCESS, response: res });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_SUB_MENU_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const updateSubMenuStatus = takeEvery(
    actions.UPDATE_SUB_MENU_STATUS,
    function* (action) {
        const query = api.getJSONToQueryStr(action.data);
        try {
            const res = yield call(
                api.patch,
                `menu/${action.parent_id}/${action.sub_id}?${query}`
            );
            yield put({
                type: actions.UPDATE_SUB_MENU_STATUS_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_SUB_MENU_STATUS_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const deleteSubMenu = takeEvery(
    actions.DELETE_SUB_MENU,
    function* (action) {
        try {
            const res = yield call(
                api.delete,
                `menu/${action.parent_id}/${action.sub_id}`
            );
            yield put({ type: actions.DELETE_SUB_MENU_SUCCESS, response: res });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.DELETE_SUB_MENU_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* MenuSaga() {
    yield all([
        getAllSubMenu,
        addSubMenu,
        updateSubMenu,
        updateSubMenuStatus,
        deleteSubMenu,
    ]);
}
