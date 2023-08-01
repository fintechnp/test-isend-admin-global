import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import Api from "App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllMarketMaker = takeEvery(actions.GET_MARKET_MAKER, function* (action) {
    try {
        const res = yield call(api.get, "/marketmaker", action.query);
        yield put({
            type: actions.GET_MARKET_MAKER_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_MARKET_MAKER_FAILED,
            error: error?.data,
        });
    }
});

export const getMarketMakerByIdDetails = takeEvery(actions.GET_MARKET_MAKER_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.marketMaker.getById, action.id));
        yield put({
            type: actions.GET_MARKET_MAKER_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_MARKET_MAKER_DETAILS_FAILED,
            error: error.data,
        });
    }
});

export const addMarketMaker = takeEvery(actions.ADD_MARKET_MAKER, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.marketMaker.add, action.data);
        yield put({
            type: actions.ADD_MARKET_MAKER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_MARKET_MAKER_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export const updateMarketMaker = takeEvery(actions.UPDATE_MARKET_MAKER, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.marketMaker.update, action.id), action.data);
        yield put({
            type: actions.UPDATE_MARKET_MAKER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_MARKET_MAKER_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([getAllMarketMaker, getMarketMakerByIdDetails, addMarketMaker, updateMarketMaker]);
}
