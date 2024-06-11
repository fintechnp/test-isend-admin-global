import Api from "App/services/api";
import { all, call, put, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import apiEndpoints from "Private/config/apiEndpoints";
import buildRoute from "App/helpers/buildRoute";

const api = new Api();

export const getAllBeneficiary = takeEvery(actions.GET_BENEFICIARY, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.b2bBeneficiary.getAll, action.query);
        yield put({
            type: actions.GET_BENEFICIARY_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BENEFICIARY_FAILED,
            error: error?.data,
        });
    }
});

export const getBeneficiaryById = takeEvery(actions.GET_BENEFICIARY_DETAILS, function* (action) {
    try {
        const response = yield call(api.get, buildRoute(apiEndpoints.b2bBeneficiary.getById, action.id));

        yield put({
            type: actions.GET_BENEFICIARY_DETAILS_SUCCESS,
            response,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BENEFICIARY_DETAILS_FAILED,
            error: error?.data,
        });
    }
});

export default function* saga() {
    yield all([getAllBeneficiary, getBeneficiaryById]);
}
