import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getDeliveryRoute = takeEvery(actions.GET_DELIVERY_ROUTE, function* (action) {
    try {
        const res = yield call(api.get, `deliveryroute`, action.query);
        yield put({
            type: actions.GET_DELIVERY_ROUTE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_DELIVERY_ROUTE_FAILED,
            error: error?.data,
        });
    }
});

export const getDeliveryRouteById = takeEvery(actions.GET_DELIVERY_ROUTE_BY_ID, function* (action) {
    try {
        const res = yield call(api.get, `deliveryroute/${action.id}`);
        yield put({
            type: actions.GET_DELIVERY_ROUTE_BY_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_DELIVERY_ROUTE_BY_ID_FAILED,
            error: error?.data,
        });
    }
});

export const createDeliveryRoute = takeEvery(actions.CREATE_DELIVERY_ROUTE, function* (action) {
    try {
        const res = yield call(api.post, `deliveryroute`, action.data);
        yield put({
            type: actions.CREATE_DELIVERY_ROUTE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.CREATE_DELIVERY_ROUTE_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateDeliveryRoute = takeEvery(actions.UPDATE_DELIVERY_ROUTE, function* (action) {
    try {
        const res = yield call(api.put, `deliveryroute/${action.id}`, action.data);
        yield put({
            type: actions.UPDATE_DELIVERY_ROUTE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_DELIVERY_ROUTE_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateDeliveryRouteStatus = takeEvery(actions.UPDATE_DELIVERY_ROUTE_STATUS, function* (action) {
    const query = api.getJSONToQueryStr(action.data);
    try {
        const res = yield call(api.patch, `deliveryroute/${action.id}?${query}`);
        yield put({
            type: actions.UPDATE_DELIVERY_ROUTE_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_DELIVERY_ROUTE_STATUS_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteDeliveryRoute = takeEvery(actions.DELETE_DELIVERY_ROUTE, function* (action) {
    try {
        const res = yield call(api.delete, `deliveryroute/${action.id}`);
        yield put({
            type: actions.DELETE_DELIVERY_ROUTE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_DELIVERY_ROUTE_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([
        getDeliveryRoute,
        getDeliveryRouteById,
        createDeliveryRoute,
        updateDeliveryRoute,
        deleteDeliveryRoute,
        updateDeliveryRouteStatus,
    ]);
}
