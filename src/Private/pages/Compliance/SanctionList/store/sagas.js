import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getSanctionList = takeEvery(
    actions.GET_SANCTION_LIST,
    function* (action) {
        try {
            const res = yield call(api.get, `sanction`, action.query);
            yield put({
                type: actions.GET_SANCTION_LIST_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_SANCTION_LIST_FAILED,
                error: error?.data,
            });
        }
    }
);

export const importSanctionList = takeEvery(
    actions.IMPORT_SANCTION_LIST,
    function* (action) {
        try {
            const res = yield call(api.post, `sanction/import`, action.data);
            yield put({
                type: actions.IMPORT_SANCTION_LIST_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.IMPORT_SANCTION_LIST_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const getSanctionById = takeEvery(
    actions.GET_SANCTION_BY_ID,
    function* (action) {
        try {
            const res = yield call(api.get, `sanction/${action.id}`);
            yield put({
                type: actions.GET_SANCTION_BY_ID_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_SANCTION_BY_ID_FAILED,
                error: error?.data,
            });
        }
    }
);

export const addSanction = takeEvery(actions.ADD_SANCTION, function* (action) {
    try {
        const res = yield call(api.post, `sanction`, action.data);
        yield put({
            type: actions.ADD_SANCTION_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_SANCTION_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateSanction = takeEvery(
    actions.UPDATE_SANCTION,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `sanction/${action.id}`,
                action.data
            );
            yield put({
                type: actions.UPDATE_SANCTION_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_SANCTION_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const deleteSanction = takeEvery(
    actions.DELETE_SANCTION,
    function* (action) {
        try {
            const res = yield call(api.delete, `sanction/${action.id}`);
            yield put({
                type: actions.DELETE_SANCTION_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.DELETE_SANCTION_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* saga() {
    yield all([
        getSanctionList,
        getSanctionById,
        importSanctionList,
        addSanction,
        updateSanction,
        deleteSanction,
    ]);
}
