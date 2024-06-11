import { put, takeEvery, call, all } from "redux-saga/effects";

import actions from "./actions";
import Api from "App/services/api";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getAllAccountList = takeEvery(actions.GET_Account_List, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.accountList.getAll, action.query);
        yield put({
            type: actions.GET_Account_List_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_Account_List_FAILED,
            error: error?.data,
        });
    }
});

export const getAccountDetail = takeEvery(actions.GET_Account_Balance_By_ID, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.accountList.getBalance, action.id));
        yield put({
            type: actions.GET_Account_Balance_By_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_Account_Balance_By_ID_FAILED,
            error: error?.data,
        });
    }
});



export default function* saga() {
    yield all([getAllAccountList, getAccountDetail]);
}
