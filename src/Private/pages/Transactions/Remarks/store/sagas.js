import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getTransactionRemarks = takeEvery(
    actions.GET_TRANSACTION_REMARKS,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `transaction/${action.transaction_id}/remarks`,
                action.query
            );
            yield put({
                type: actions.GET_TRANSACTION_REMARKS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_TRANSACTION_REMARKS_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const getTransactionRemarksById = takeEvery(
    actions.GET_TRANSACTION_REMARKS_BYID,
    function* (action) {
        try {
            const res = yield call(api.get, `transaction/remarks/${action.id}`);
            yield put({
                type: actions.GET_TRANSACTION_REMARKS_BYID_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_TRANSACTION_REMARKS_BYID_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const createTransactionRemarks = takeEvery(
    actions.CREATE_TRANSACTION_REMARKS,
    function* (action) {
        try {
            const res = yield call(
                api.post,
                `transaction/${action.transaction_id}/remarks`,
                action.data
            );
            yield put({
                type: actions.CREATE_TRANSACTION_REMARKS_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.CREATE_TRANSACTION_REMARKS_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* saga() {
    yield all([
        getTransactionRemarks,
        getTransactionRemarksById,
        createTransactionRemarks,
    ]);
}
