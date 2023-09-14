import { put, takeEvery, call, all } from "redux-saga/effects";

import Api from "App/services/api";
import actions from "./bannerActions";

const api = new Api();

export const getBanners = takeEvery(actions.GET_BANNERS, function* (action) {
  try {
    const res = yield call(api.get, `banners`, action.query);
    yield put({
      type: actions.GET_BANNERS_SUCCESS,
      response: res,
    });
  } catch (error) {
    yield put({
      type: actions.GET_BANNERS_FAILED,
      error: error.data,
    });
  }
});

export const getBanner = takeEvery(actions.GET_BANNER, function* (action) {
  try {
    const res = yield call(api.get, `banners/${action.id}`);
    yield put({
      type: actions.GET_BANNER_SUCCESS,
      response: res,
    });
  } catch (error) {
    yield put({
      type: actions.GET_BANNER_FAILED,
      error: error.data,
    });
  }
});

export const addBanner = takeEvery(actions.ADD_BANNER, function* (action) {
  try {
    const res = yield call(api.post, `banners`, action.data);
    yield put({
      type: actions.ADD_BANNER_SUCCESS,
      response: res,
    });
    yield put({ type: "SET_TOAST_DATA", response: res });
  } catch (error) {
    yield put({
      type: actions.ADD_BANNER_FAILED,
      error: error.data,
    });
    yield put({ type: "SET_TOAST_DATA", response: error.data });
  }
});

export const updateBanner = takeEvery(
  actions.UPDATE_BANNER,
  function* (action) {
    try {
      const res = yield call(api.put, `banners/${action.id}`, action.data);
      yield put({
        type: actions.UPDATE_BANNER_SUCCESS,
        response: res,
      });
      yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
      yield put({
        type: actions.UPDATE_BANNER_FAILED,
        error: error.data,
      });
      yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
  }
);

export const updateBannerStatus = takeEvery(
  actions.UPDATE_BANNER_STATUS,
  function* (action) {
    const query = api.getJSONToQueryStr(action.data);
    try {
      const res = yield call(api.patch, `banners/${action.id}?${query}`);
      yield put({
        type: actions.UPDATE_BANNER_STATUS_SUCCESS,
        response: res,
      });
      yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
      yield put({
        type: actions.UPDATE_BANNER_STATUS_FAILED,
        error: error.data,
      });
      yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
  }
);

export const deleteBanner = takeEvery(
  actions.DELETE_BANNER,
  function* (action) {
    try {
      const res = yield call(api.delete, `banners/${action.id}`);
      yield put({
        type: actions.DELETE_BANNER_SUCCESS,
        response: res,
      });
      yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
      yield put({
        type: actions.DELETE_BANNER_FAILED,
        error: error.data,
      });
      yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
  }
);

export default function* bannerSaga() {
  yield all([
    getBanners,
    getBanner,
    addBanner,
    updateBanner,
    updateBannerStatus,
    deleteBanner,
  ]);
}
