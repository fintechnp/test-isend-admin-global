import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllLedger = takeEvery(actions.GET_LEDGER, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.ledger.getAll, action.query);
        yield put({
            type: actions.GET_LEDGER_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_LEDGER_FAILED,
            error: error?.data,
        });
    }
});

export const getLedgerDetails = takeEvery(actions.GET_LEDGER_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.ledger.getById, action.id));
        yield put({
            type: actions.GET_LEDGER_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_LEDGER_DETAILS_FAILED,
            error: error?.data,
        });
    }
});

export const addLedger = takeEvery(actions.ADD_LEDGER, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.ledger.add, action.data);
        yield put({
            type: actions.ADD_LEDGER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
        yield put({ type: actions.ADD_LEDGER_RESET });
    } catch (error) {
        yield put({
            type: actions.ADD_LEDGER_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getAllLedger, getLedgerDetails, addLedger]);
}
