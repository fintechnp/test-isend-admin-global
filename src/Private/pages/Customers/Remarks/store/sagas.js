import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getRemarks = takeEvery(actions.GET_REMARKS, function* (action) {
    try {
        const res = yield call(
            api.get,
            `customer/${action.customer_id}/remarks`,
            action.query
        );
        yield put({
            type: actions.GET_REMARKS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_REMARKS_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getRemarksById = takeEvery(
    actions.GET_REMARKS_BYID,
    function* (action) {
        try {
            const res = yield call(api.get, `customer/remarks/${action.id}`);
            yield put({
                type: actions.GET_REMARKS_BYID_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_REMARKS_BYID_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const createRemarks = takeEvery(
    actions.CREATE_REMARKS,
    function* (action) {
        try {
            const res = yield call(
                api.post,
                `customer/${action.customer_id}/remarks`,
                action.data
            );
            yield put({
                type: actions.CREATE_REMARKS_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.CREATE_REMARKS_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* saga() {
    yield all([getRemarks, getRemarksById, createRemarks]);
}
