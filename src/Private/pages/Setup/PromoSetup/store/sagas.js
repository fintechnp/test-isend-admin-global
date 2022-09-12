import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getPromoSetup = takeEvery(
    actions.GET_PROMO_SETUP,
    function* (action) {
        try {
            const res = yield call(api.get, `promosetup`, action.query);
            yield put({
                type: actions.GET_PROMO_SETUP_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_PROMO_SETUP_FAILED,
                error: error.data,
            });
        }
    }
);

export const getPromoSetupDetails = takeEvery(
    actions.GET_PROMO_SETUP_DETAILS,
    function* (action) {
        try {
            const res = yield call(api.get, `promosetup/${action.id}`);
            yield put({
                type: actions.GET_PROMO_SETUP_DETAILS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_PROMO_SETUP_DETAILS_FAILED,
                error: error.data,
            });
        }
    }
);

export const addPromoSetup = takeEvery(
    actions.ADD_PROMO_SETUP,
    function* (action) {
        try {
            const res = yield call(api.post, `promosetup`, action.data);
            yield put({
                type: actions.ADD_PROMO_SETUP_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.ADD_PROMO_SETUP_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export const updatePromoSetup = takeEvery(
    actions.UPDATE_PROMO_SETUP,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `promosetup/${action.id}`,
                action.data
            );
            yield put({
                type: actions.UPDATE_PROMO_SETUP_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_PROMO_SETUP_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export const updatePromoSetupStatus = takeEvery(
    actions.UPDATE_PROMO_SETUP_STATUS,
    function* (action) {
        const query = api.getJSONToQueryStr(action.data);
        try {
            const res = yield call(
                api.patch,
                `promosetup/${action.id}?${query}`
            );
            yield put({
                type: actions.UPDATE_PROMO_SETUP_STATUS_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_PROMO_SETUP_STATUS_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

//promo code
export const getPromoCode = takeEvery(
    actions.GET_PROMO_CODE,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `${action.promo_id}/promocode`,
                action.query
            );
            yield put({
                type: actions.GET_PROMO_CODE_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_PROMO_CODE_FAILED,
                error: error.data,
            });
        }
    }
);

export const getPromoCodeDetails = takeEvery(
    actions.GET_PROMO_CODE_DETAILS,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `promocode/${action.promo_code_id}`
            );
            yield put({
                type: actions.GET_PROMO_CODE_DETAILS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_PROMO_CODE_DETAILS_FAILED,
                error: error.data,
            });
        }
    }
);

export const addPromoCode = takeEvery(
    actions.ADD_PROMO_CODE,
    function* (action) {
        try {
            const res = yield call(
                api.post,
                `${action.promo_id}/promocode`,
                action.data
            );
            yield put({
                type: actions.ADD_PROMO_CODE_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.ADD_PROMO_CODE_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export const importPromoCode = takeEvery(
    actions.PROMO_CODE_IMPORT,
    function* (action) {
        try {
            const res = yield call(
                api.post,
                `${action.promo_id}/promocode/import`,
                action.data
            );
            yield put({
                type: actions.PROMO_CODE_IMPORT_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.PROMO_CODE_IMPORT_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export const updatePromoCodeStatus = takeEvery(
    actions.UPDATE_PROMO_CODE_STATUS,
    function* (action) {
        const query = api.getJSONToQueryStr(action.data);
        try {
            const res = yield call(
                api.patch,
                `${action.promo_id}/promocode/${action.promo_code_id}?${query}`
            );
            yield put({
                type: actions.UPDATE_PROMO_CODE_STATUS_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_PROMO_CODE_STATUS_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* saga() {
    yield all([
        getPromoSetup,
        getPromoSetupDetails,
        addPromoSetup,
        updatePromoSetup,
        updatePromoSetupStatus,
        getPromoCode,
        getPromoCodeDetails,
        addPromoCode,
        importPromoCode,
        updatePromoCodeStatus,
    ]);
}
