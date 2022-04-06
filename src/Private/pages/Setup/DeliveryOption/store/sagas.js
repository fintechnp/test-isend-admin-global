import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllDeliveryOption = takeEvery(
    actions.GET_DELIVERY_OPTION,
    function* (action) {
        try {
            const res = yield call(api.get, `deliveryoption`, action.query);
            yield put({
                type: actions.GET_DELIVERY_OPTION_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_DELIVERY_OPTION_FAILED,
                error: error.data,
            });
        }
    }
);

export const getDeliveryOptionDetails = takeEvery(
    actions.GET_DELIVERY_OPTION_DETAILS,
    function* (action) {
        try {
            const res = yield call(api.get, `deliveryoption/${action.id}`);
            yield put({
                type: actions.GET_DELIVERY_OPTION_DETAILS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_DELIVERY_OPTION_DETAILS_FAILED,
                error: error.data,
            });
        }
    }
);

export const addDeliveryOption = takeEvery(
    actions.ADD_DELIVERY_OPTION,
    function* (action) {
        try {
            const res = yield call(api.post, `deliveryoption`, action.data);
            yield put({
                type: actions.ADD_DELIVERY_OPTION_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.ADD_DELIVERY_OPTION_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export const updateDeliveryOption = takeEvery(
    actions.UPDATE_DELIVERY_OPTION,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `deliveryoption/${action.id}`,
                action.data
            );
            yield put({
                type: actions.UPDATE_DELIVERY_OPTION_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_DELIVERY_OPTION_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export const deleteDeliveryOption = takeEvery(
    actions.DELETE_DELIVERY_OPTION,
    function* (action) {
        try {
            const res = yield call(api.delete, `deliveryoption/${action.id}`);
            yield put({
                type: actions.DELETE_DELIVERY_OPTION_SUCCESS,
                response: res,
            });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.DELETE_DELIVERY_OPTION_FAILED,
                error: error.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error.data });
        }
    }
);

export default function* saga() {
    yield all([
        getAllDeliveryOption,
        getDeliveryOptionDetails,
        addDeliveryOption,
        updateDeliveryOption,
        deleteDeliveryOption,
    ]);
}
