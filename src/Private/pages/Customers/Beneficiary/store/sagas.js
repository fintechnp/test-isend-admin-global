import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getBeneficiary = takeEvery(
    actions.GET_BENEFICIARY_BY_CUSTOMER,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `${action.id}/beneficiary`,
                action.query
            );
            yield put({
                type: actions.GET_BENEFICIARY_BY_CUSTOMER_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_BENEFICIARY_BY_CUSTOMER_FAILED,
                error: error.data,
            });
        }
    }
);

export const getBeneficiaryById = takeEvery(
    actions.GET_BENEFICIARY_BYID,
    function* (action) {
        try {
            const res = yield call(api.get, `beneficiary/${action.id}`);
            yield put({
                type: actions.GET_BENEFICIARY_BYID_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_BENEFICIARY_BYID_FAILED,
                error: error.data,
            });
        }
    }
);

export const createBeneficiary = takeEvery(
    actions.CREATE_BENEFICIARY,
    function* (action) {
        try {
            const res = yield call(api.post, `beneficiary`, action.data);
            yield put({
                type: actions.CREATE_BENEFICIARY_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.CREATE_BENEFICIARY_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const updateBeneficiary = takeEvery(
    actions.UPDATE_BENEFICIARY,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `beneficiary/${action.id}`,
                action.data
            );
            yield put({
                type: actions.UPDATE_BENEFICIARY_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_BENEFICIARY_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const BlockUnblockBeneficiary = takeEvery(
    actions.BLOCK_UNBLOCK_BENEFICIARY,
    function* (action) {
        const query = api.getJSONToQueryStr(action.query);
        try {
            const res = yield call(
                api.patch,
                `beneficiary/${action.id}?${query}`
            );
            yield put({
                type: actions.BLOCK_UNBLOCK_BENEFICIARY_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.BLOCK_UNBLOCK_BENEFICIARY_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export default function* saga() {
    yield all([
        getBeneficiary,
        getBeneficiaryById,
        createBeneficiary,
        updateBeneficiary,
        BlockUnblockBeneficiary,
    ]);
}
