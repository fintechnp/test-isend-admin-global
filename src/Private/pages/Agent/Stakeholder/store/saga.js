import Api from "App/services/api";
import { all, call, put, takeEvery } from "redux-saga/effects";

import actions from "./actions";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const api = new Api();

export const getOrganizationStakeholders = takeEvery(actions.GET_ORGANIZATION_STAKEHOLDERS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.GetOrganizationStakeholders, action.query);
        yield put({
            type: actions.GET_ORGANIZATION_STAKEHOLDERS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ORGANIZATION_STAKEHOLDERS_FAILED,
            error: error?.data,
        });
    }
});

export const getIndividualStakeholders = takeEvery(actions.GET_INDIVIDUAL_STAKEHOLDERS, function* (action) {
    try {
        const res = yield call(api.get, apiEndpoints.GetIndividualStakeholders, action.query);
        yield put({
            type: actions.GET_INDIVIDUAL_STAKEHOLDERS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_INDIVIDUAL_STAKEHOLDERS_FAILED,
            error: error?.data,
        });
    }
});

export const addOrganizationStakeholder = takeEvery(actions.ADD_ORGANIZATION_STAKEHOLDER, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.AddOrganizationStakeholder, action.data);
        yield put({
            type: actions.ADD_ORGANIZATION_STAKEHOLDER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_ORGANIZATION_STAKEHOLDER_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const addIndividualStakeholder = takeEvery(actions.ADD_INDIVIDUAL_STAKEHOLDER, function* (action) {
    try {
        const res = yield call(api.post, apiEndpoints.AddIndividualStakeholder, action.data);
        yield put({
            type: actions.ADD_INDIVIDUAL_STAKEHOLDER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.ADD_INDIVIDUAL_STAKEHOLDER_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateOrganizationStakeholder = takeEvery(actions.UPDATE_ORGANIZATION_STAKEHOLDER, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.UpdateOrganizationStakeholder, action.id), action.data);
        yield put({
            type: actions.UPDATE_ORGANIZATION_STAKEHOLDER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_ORGANIZATION_STAKEHOLDER_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const updateIndividualStakeholder = takeEvery(actions.UPDATE_INDIVIDUAL_STAKEHOLDER, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.UpdateIndividualStakeholder, action.id), action.data);
        yield put({
            type: actions.UPDATE_INDIVIDUAL_STAKEHOLDER_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPDATE_INDIVIDUAL_STAKEHOLDER_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const getOrganizationStakeholderById = takeEvery(actions.GET_ORGANIZATION_STAKEHOLDER_BY_ID, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetOrganizationStakeholderById, action.id));
        yield put({
            type: actions.GET_ORGANIZATION_STAKEHOLDER_BY_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_ORGANIZATION_STAKEHOLDER_BY_ID_FAILED,
            error: error?.data,
        });
    }
});

export const getIndividualStakeholderById = takeEvery(actions.GET_INDIVIDUAL_STAKEHOLDER_BY_ID, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetIndividualStakeholderById, action.id));
        yield put({
            type: actions.GET_INDIVIDUAL_STAKEHOLDER_BY_ID_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_INDIVIDUAL_STAKEHOLDER_BY_ID_FAILED,
            error: error?.data,
        });
    }
});


export const changeOrganizationStakeholderStatus = takeEvery(actions.CHANGE_ORGANIZATION_STAKEHOLDER_STATUS, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.ChangeOrganizationStakeholderStatus, action.id), action.data);
        yield put({
            type: actions.CHANGE_ORGANIZATION_STAKEHOLDER_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.CHANGE_ORGANIZATION_STAKEHOLDER_STATUS_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export const changeIndividualStakeholderStatus = takeEvery(actions.CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.ChangeIndividualStakeholderStatus, action.id), action.data);
        yield put({
            type: actions.CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.CHANGE_INDIVIDUAL_STAKEHOLDER_STATUS_FAILED,
            error: error?.data?.message,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});


export default function* saga() {
    yield all([
        getOrganizationStakeholders,
        getIndividualStakeholders,
        addOrganizationStakeholder,
        addIndividualStakeholder,
        updateIndividualStakeholder,
        updateOrganizationStakeholder,
        getIndividualStakeholderById,
        getOrganizationStakeholderById,
        changeOrganizationStakeholderStatus,
        changeIndividualStakeholderStatus
    ]);
}
