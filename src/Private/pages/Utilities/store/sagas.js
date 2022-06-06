import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getSms = takeEvery(actions.GET_SMS, function* (action) {
    try {
        const res = yield call(api.get, `sms`, action.query);
        yield put({
            type: actions.GET_SMS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_SMS_FAILED,
            error: error.data,
        });
    }
});

export const getSmsById = takeEvery(actions.GET_SMS_BYID, function* (action) {
    try {
        const res = yield call(api.get, `sms/${action.id}`);
        yield put({
            type: actions.GET_SMS_BYID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_SMS_BYID_FAILED,
            error: error.data,
        });
    }
});

export const createSms = takeEvery(actions.CREATE_SMS, function* (action) {
    try {
        const res = yield call(api.post, `sms`, action.data);
        yield put({ type: actions.CREATE_SMS_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.CREATE_SMS_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteSms = takeEvery(actions.DELETE_SMS, function* (action) {
    try {
        const res = yield call(api.delete, `sms/${action.id}`);
        yield put({ type: actions.DELETE_SMS_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.DELETE_SMS_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getEmail = takeEvery(actions.GET_EMAIL, function* (action) {
    try {
        const res = yield call(api.get, `email`, action.query);
        yield put({
            type: actions.GET_EMAIL_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_EMAIL_FAILED,
            error: error.data,
        });
    }
});

export const getEmailById = takeEvery(
    actions.GET_EMAIL_BYID,
    function* (action) {
        try {
            const res = yield call(api.get, `email/${action.id}`);
            yield put({
                type: actions.GET_EMAIL_BYID_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_EMAIL_BYID_FAILED,
                error: error.data,
            });
        }
    }
);

export const createEmail = takeEvery(actions.CREATE_EMAIL, function* (action) {
    try {
        const res = yield call(api.post, `email`, action.data);
        yield put({ type: actions.CREATE_EMAIL_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.CREATE_EMAIL_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteEmail = takeEvery(actions.DELETE_EMAIL, function* (action) {
    try {
        const res = yield call(api.delete, `email/${action.id}`);
        yield put({ type: actions.DELETE_EMAIL_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.DELETE_EMAIL_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getFcm = takeEvery(actions.GET_FCM, function* (action) {
    try {
        const res = yield call(api.get, `fcmmessage`, action.query);
        yield put({
            type: actions.GET_FCM_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_FCM_FAILED,
            error: error.data,
        });
    }
});

export const getFcmById = takeEvery(actions.GET_FCM_BYID, function* (action) {
    try {
        const res = yield call(api.get, `fcmmessage/${action.id}`);
        yield put({
            type: actions.GET_FCM_BYID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_FCM_BYID_FAILED,
            error: error.data,
        });
    }
});

export const getFcmByCustomerId = takeEvery(
    actions.GET_FCM_BY_CUSTOMER_ID,
    function* (action) {
        try {
            const res = yield call(api.get, `${action.id}/fcmmessage`);
            yield put({
                type: actions.GET_FCM_BY_CUSTOMER_ID_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_FCM_BY_CUSTOMER_ID_FAILED,
                error: error.data,
            });
        }
    }
);

export const createFcm = takeEvery(actions.CREATE_FCM, function* (action) {
    try {
        const res = yield call(api.post, `fcmmessage`, action.data);
        yield put({ type: actions.CREATE_FCM_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.CREATE_FCM_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateFcm = takeEvery(actions.UPDATE_FCM, function* (action) {
    try {
        const res = yield call(api.put, `fcmmessage/${action.id}`, action.data);
        yield put({ type: actions.UPDATE_FCM_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.UPDATE_FCM_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const deleteFcm = takeEvery(actions.DELETE_FCM, function* (action) {
    try {
        const res = yield call(api.delete, `fcmmessage/${action.id}`);
        yield put({ type: actions.DELETE_FCM_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.DELETE_FCM_FAILED, error: error.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([
        getSms,
        getSmsById,
        createSms,
        deleteSms,
        getEmail,
        getEmailById,
        createEmail,
        deleteEmail,
        getFcm,
        getFcmById,
        getFcmByCustomerId,
        createFcm,
        updateFcm,
        deleteFcm,
    ]);
}
