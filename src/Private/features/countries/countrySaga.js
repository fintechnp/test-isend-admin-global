import Api from "App/services/api";
import actions from "./countryActions";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getCountries = takeEvery(actions.GET_COUNTRIES, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.countries.list), action.query);
        yield put({
            type: actions.GET_COUNTRIES_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_COUNTRIES_FAILURE,
            error: error?.data,
        });
    }
});

export const addCountries = takeEvery(actions.ADD_COUNTRY, function* (action) {
    try {
        const res = yield call(api.post, buildRoute(apiEndpoints.countries.create), action.data);

        yield put({
            type: actions.ADD_COUNTRY_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.ADD_COUNTRY_FAILURE,
            error: error?.data,
        });
    }
});

export const updateCountries = takeEvery(actions.UPDATE_COUNTRY, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.countries.update, action.id), action.data);

        yield put({
            type: actions.UPDATE_COUNTRY_SUCCESS,
            response: res,
        });
        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.UPDATE_COUNTRY_FAILURE,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* countrySaga() {
    yield all([getCountries, addCountries, updateCountries]);
}
