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

export default function* saga() {
    yield all([
        getPromoSetup,
        getPromoSetupDetails,
        addPromoSetup,
        updatePromoSetup,
        updatePromoSetupStatus,
    ]);
}
