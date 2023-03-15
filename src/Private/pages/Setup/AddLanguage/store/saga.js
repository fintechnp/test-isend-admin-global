import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import Api from "../../../../../App/services/api";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getAllLanguageValue = takeEvery(actions.GET_LANGUAGE_VALUE, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.languageValue.get, action.query);
        yield put({
            type: actions.GET_LANGUAGE_VALUE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_LANGUAGE_VALUE_FAILED,
            error: error?.data,
        });
    }
});

// export const getAllLanguageOptionDetails = takeEvery(actions.GET_LANGUAGE_OPTION_DETAILS, function* (action) {
//     try {
//         const res = yield call(api.get, buildRoute(apiEndpoints.language.getDetail, action.id));
//         yield put({
//             type: actions.GET_LANGUAGE_OPTION_DETAILS_SUCCESS,
//             response: res,
//         });
//     } catch (error) {
//         yield put({
//             type: actions.GET_LANGUAGE_OPTION_DETAILS_FAILED,
//             error: error.data,
//         });
//     }
// });

export const addLanguageValue = takeEvery(actions.ADD_LANGUAGE_VALUE, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.languageValue.post, action.data);
        yield put({
            type: actions.ADD_LANGUAGE_VALUE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_LANGUAGE_VALUE_FAILED,
            error: error?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.message });
    }
});

export const updateLanguageValue = takeEvery(actions.UPDATE_LANGUAGE_VALUE, function* (action) {
    try {
        console.log(action);
        const res = yield call(api.put, buildRoute(apiEndpoints.languageValue.update, action.id), action.data);
        yield put({
            type: actions.UPDATE_LANGUAGE_VALUE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_LANGUAGE_VALUE_FAILED,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

// export const updateLanguageCountryStatus = takeEvery(actions.UPDATE_LANGUAGE_COUNTRY_STATUS, function* (action) {
//     const query = api.getJSONToQueryStr(action.data);
//     try {
//         const res = yield call(api.patch, `languagecountry/${action.id}?${query}`);
//         yield put({
//             type: actions.UPDATE_LANGUAGE_COUNTRY_STATUS_SUCCESS,
//             response: res,
//         });
//         yield put({ type: "SET_TOAST_DATA", response: res });
//     } catch (error) {
//         yield put({
//             type: actions.UPDATE_LANGUAGE_COUNTRY_STATUS_FAILED,
//             error: error.data,
//         });
//         yield put({ type: "SET_TOAST_DATA", response: error?.data });
//     }
// });

export const deleteLanguageValue = takeEvery(actions.DELETE_LANGUAGE_VALUE, function* (action) {
    try {
        const res = yield call(api.delete, buildRoute(apiEndpoints.languageValue.delete, action.id));
        yield put({
            type: actions.DELETE_LANGUAGE_VALUE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.DELETE_LANGUAGE_VALUE_FAILED,
            error: error.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error.data });
    }
});

export default function* saga() {
    yield all([getAllLanguageValue, addLanguageValue, updateLanguageValue, deleteLanguageValue]);
}
