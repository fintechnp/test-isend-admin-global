import { put, takeEvery, call, all } from "redux-saga/effects";

import Api from "../../App/services/api";
import actions from "./actions";
import Cookies from "js-cookie";

const headers = {
    source: "web",
};

export const refreshToken = takeEvery(
    actions.REFRESH_TOKEN,
    function* (action) {
        const api = new Api(false);
        try {
            const res = yield call(
                api.post,
                `account/refreshtoken`,
                action.data,
                headers
            );
            yield put({ type: actions.REFRESH_TOKEN_SUCCESS, response: res });
            Cookies.set("token", res.data.token.value);
            Cookies.set("refreshToken", res.data.refreshToken);
        } catch (error) {
            yield put({ type: actions.REFRESH_TOKEN_FAILED, error: error });
            yield put({ type: "SET_TOAST_DATA", data: error?.data });
        }
    }
);

export const getUser = takeEvery(actions.USER_DETAILS, function* () {
    const api = new Api();
    try {
        const res = yield call(api.get, `account/details`);
        yield put({ type: actions.USER_DETAILS_SUCCESS, response: res });
        localStorage.setItem("user", JSON.stringify(res?.data));
    } catch (error) {
        yield put({ type: actions.USER_DETAILS_FAILED, error: error });
        yield put({ type: "SET_TOAST_DATA", data: error?.data });
    }
});

export const get_all_country = takeEvery(actions.GET_ALL_COUNTRY, function* () {
    const api = new Api();
    try {
        const res = yield call(api.get, `common/countrylist`);
        yield put({
            type: actions.GET_ALL_COUNTRY_SUCCESS,
            response: res,
        });
        localStorage.setItem("country", JSON.stringify(res?.data));
    } catch (error) {
        yield put({
            type: actions.GET_ALL_COUNTRY_FAILED,
            error: error.data,
        });
    }
});

export const get_all_reference = takeEvery(
    actions.GET_ALL_REFERENCE,
    function* () {
        const api = new Api();
        try {
            const res = yield call(api.get, `common/referencedata`);
            yield put({
                type: actions.GET_ALL_REFERENCE_SUCCESS,
                response: res,
            });
            localStorage.setItem("reference", JSON.stringify(res?.data));
        } catch (error) {
            yield put({
                type: actions.GET_ALL_REFERENCE_FAILED,
                error: error.data,
            });
        }
    }
);

export const logout = takeEvery(actions.LOG_OUT, function* () {
    const api = new Api();
    try {
        const res = yield call(api.post, `account/logout`);
        yield put({
            type: actions.LOG_OUT_SUCCESS,
            response: res,
        });
        yield put({ type: actions.USER_DETAILS_RESET });
        yield put({ type: actions.RESET });
    } catch (error) {
        yield put({
            type: actions.LOG_OUT_FAILED,
            error: error.data,
        });
    }
});

export default function* saga() {
    yield all([
        refreshToken,
        getUser,
        get_all_country,
        get_all_reference,
        logout,
    ]);
}
