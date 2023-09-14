import { put, takeEvery, call, all } from "redux-saga/effects";

import Api from "App/services/api";
import actions from "./countryStateActions";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getCountryStates = takeEvery(
  actions.GET_COUNTRY_STATES,
  function* (action) {
    try {
      const res = yield call(
        api.get,
        buildRoute(apiEndpoints.countryStates.list, {
          country: action.country,
        }),
        action.query
      );
      yield put({
        type: actions.GET_COUNTRY_STATES_SUCCESS,
        response: res,
      });
    } catch (error) {
      yield put({
        type: actions.GET_COUNTRY_STATES_FAILED,
        error: error.data,
      });
    }
  }
);

export const addCountryState = takeEvery(
  actions.ADD_COUNTRY_STATE,
  function* (action) {
    try {
      const res = yield call(
        api.post,
        buildRoute(apiEndpoints.countryStates.create, action.id),
        action.data
      );
      yield put({
        type: actions.ADD_COUNTRY_STATE_SUCCESS,
        response: res,
      });
      yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
      yield put({
        type: actions.ADD_COUNTRY_STATE_FAILED,
        error: error.data,
      });
      yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
  }
);

export const updateCountryState = takeEvery(
  actions.UPDATE_COUNTRY_STATE,
  function* (action) {
    try {
      const res = yield call(
        api.put,
        buildRoute(apiEndpoints.countryStates.update, action.id),
        action.data
      );
      yield put({
        type: actions.UPDATE_COUNTRY_STATE_SUCCESS,
        response: res,
      });
      yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
      yield put({
        type: actions.UPDATE_COUNTRY_STATE_FAILED,
        error: error.data,
      });
      yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
  }
);

export const deleteCountryState = takeEvery(
  actions.DELETE_COUNTRY_STATE,
  function* (action) {
    try {
      const res = yield call(
        api.delete,
        buildRoute(apiEndpoints.countryStates.delete, action.id)
      );
      yield put({
        type: actions.DELETE_COUNTRY_STATE_SUCCESS,
        response: res,
      });
      yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
      yield put({
        type: actions.DELETE_COUNTRY_STATE_FAILED,
        error: error.data,
      });
      yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
  }
);

export default function* countryStateSaga() {
  yield all([
    getCountryStates,
    addCountryState,
    updateCountryState,
    deleteCountryState,
  ]);
}
