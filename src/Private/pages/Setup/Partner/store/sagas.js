import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

//Partner
export const getAllAgent = takeEvery(actions.GET_PARTNER, function* (action) {
    try {
        const res = yield call(api.get, `agent`, action.query);
        yield put({ type: actions.GET_PARTNER_SUCCESS, response: res });
    } catch (error) {
        yield put({ type: actions.GET_PARTNER_FAILED, error: error?.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getSendingAgent = takeEvery(
    actions.GET_SENDING_PARTNER,
    function* (action) {
        try {
            const res = yield call(api.get, `agent`, action.query);
            yield put({
                type: actions.GET_SENDING_PARTNER_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_SENDING_PARTNER_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const getPayoutAgent = takeEvery(
    actions.GET_PAYOUT_PARTNER,
    function* (action) {
        try {
            const res = yield call(api.get, `agent`, action.query);
            yield put({
                type: actions.GET_PAYOUT_PARTNER_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_PAYOUT_PARTNER_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const getAgentDetails = takeEvery(
    actions.GET_PARTNER_DETAILS,
    function* (action) {
        try {
            const res = yield call(api.get, `agent/${action.id}`);
            yield put({
                type: actions.GET_PARTNER_DETAILS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_PARTNER_DETAILS_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const addAgent = takeEvery(actions.ADD_PARTNER, function* (action) {
    try {
        const res = yield call(api.post, `agent`, action.data);
        yield put({ type: actions.ADD_PARTNER_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.ADD_PARTNER_FAILED, error: error?.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateAgent = takeEvery(
    actions.DELETE_PARTNER,
    function* (action) {
        try {
            const res = yield call(api.put, `agent/${action.id}`, action.data);
            yield put({ type: actions.UPDATE_PARTNER_SUCCESS, response: res });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_PARTNER_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const deleteAgent = takeEvery(
    actions.DELETE_PARTNER,
    function* (action) {
        try {
            const res = yield call(api.delete, `agent/${action.id}`);
            yield put({ type: actions.DELETE_PARTNER_SUCCESS, response: res });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.DELETE_PARTNER_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

//Corridor
export const getAllCorridor = takeEvery(
    actions.GET_CORRIDOR,
    function* (action) {
        try {
            const res = yield call(
                api.get,
                `agent/${action.id}/corridor`,
                action.query
            );
            yield put({ type: actions.GET_CORRIDOR_SUCCESS, response: res });
        } catch (error) {
            yield put({
                type: actions.GET_CORRIDOR_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const getCorridorDetails = takeEvery(
    actions.GET_CORRIDOR_DETAILS,
    function* (action) {
        try {
            const res = yield call(api.get, `agent/corridor/${action.id}`);
            yield put({
                type: actions.GET_CORRIDOR_DETAILS_SUCCESS,
                response: res,
            });
        } catch (error) {
            yield put({
                type: actions.GET_CORRIDOR_DETAILS_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const addCorridor = takeEvery(actions.ADD_CORRIDOR, function* (action) {
    try {
        const res = yield call(
            api.post,
            `agent/${action.parent_id}/corridor`,
            action.data
        );
        yield put({ type: actions.ADD_CORRIDOR_SUCCESS, response: res });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({ type: actions.ADD_CORRIDOR_FAILED, error: error?.data });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateCorridor = takeEvery(
    actions.UPDATE_CORRIDOR,
    function* (action) {
        try {
            const res = yield call(
                api.put,
                `agent/${action.parent_id}/corridor/${action.c_id}`,
                action.data
            );
            yield put({ type: actions.UPDATE_CORRIDOR_SUCCESS, response: res });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.UPDATE_CORRIDOR_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export const deleteCorridor = takeEvery(
    actions.DELETE_CORRIDOR,
    function* (action) {
        try {
            const res = yield call(api.delete, `agent/corridor/${action.id}`);
            yield put({ type: actions.DELETE_CORRIDOR_SUCCESS, response: res });
            yield put({ type: "SET_TOAST_DATA", response: res });
        } catch (error) {
            yield put({
                type: actions.DELETE_CORRIDOR_FAILED,
                error: error?.data,
            });
            yield put({ type: "SET_TOAST_DATA", response: error?.data });
        }
    }
);

export default function* saga() {
    yield all([
        getAllAgent,
        getSendingAgent,
        getPayoutAgent,
        getAgentDetails,
        addAgent,
        updateAgent,
        deleteAgent,
        getAllCorridor,
        getCorridorDetails,
        addCorridor,
        updateCorridor,
        deleteCorridor,
    ]);
}
