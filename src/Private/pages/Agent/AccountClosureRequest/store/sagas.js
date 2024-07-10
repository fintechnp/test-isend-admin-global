import Api from "App/services/api";
import actions from "./actions";
import { takeEvery, put, call, all } from "redux-saga/effects";
import apiEndpoints from "Private/config/apiEndpoints";

import buildRoute from "App/helpers/buildRoute";

const api = new Api();

export const getAccountClosureRequest = takeEvery(actions.GET_B2B_ACCOUNT_CLOSURE_REQUESTS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.ListAccountClosureRequest), action.query);

        yield put({
            type: actions.GET_B2B_ACCOUNT_CLOSURE_REQUESTS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_B2B_ACCOUNT_CLOSURE_REQUESTS_FAILED,
            error: error?.data,
        });
        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export const acceptRejectAccountClosureRequest = takeEvery(
    actions.ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST,
    function* (action) {
        try {
            const res = yield call(
                api.post,
                buildRoute(apiEndpoints.AcceptRejectAccountClosureRequest, action.id),
                action.data,
            );
            yield put({
                type: actions.ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_SUCCESS,
                response: res,
            });

            yield put({
                type: "SET_TOAST_DATA",
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.ACCEPT_REJECT_B2B_ACCOUNT_CLOSURE_REQUEST_FAILED,
                error: error?.data,
            });
            yield put({
                type: "SET_TOAST_DATA",
                response: error?.data,
            });
        }
    },
);

export default function* saga() {
    yield all([getAccountClosureRequest, acceptRejectAccountClosureRequest]);
}
