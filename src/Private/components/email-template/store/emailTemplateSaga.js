import Api from "App/services/api";
import actions from "./emailTemplateActions";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getEmailTemplates = takeEvery(actions.GET_EMAIL_TEMPLATE, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.emailTemplate.list), action.query);

        yield put({
            type: actions.GET_EMAIL_TEMPLATE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_EMAIL_TEMPLATE_FAILURE,
            error: error?.data,
        });
    }
});

export const getEmailTagTemplates = takeEvery(actions.GET_EMAIL_TEMPLATE_TAG, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.emailTemplate.tagList), action.query);
        yield put({
            type: actions.GET_EMAIL_TEMPLATE_TAG_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_EMAIL_TEMPLATE_TAG_FAILURE,
            error: error?.data,
        });
    }
});

export const addEmailTemplate = takeEvery(actions.ADD_EMAIL_TEMPLATE, function* (action) {
    try {
        const res = yield call(api.post, buildRoute(apiEndpoints.emailTemplate.create), action.data);

        yield put({
            type: actions.ADD_EMAIL_TEMPLATE_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.ADD_EMAIL_TEMPLATE_FAILURE,
            error: error?.data,
        });
    }
});

export const updateEmailTemplate = takeEvery(actions.UPDATE_EMAIL_TEMPLATE, function* (action) {
    try {
        const res = yield call(api.put, buildRoute(apiEndpoints.emailTemplate.update, action.id), action.data);

        yield put({
            type: actions.UPDATE_EMAIL_TEMPLATE_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.UPDATE_EMAIL_TEMPLATE_FAILURE,
            error: error?.data,
        });
    }
});

export default function* EmailTemplateSaga() {
    yield all([getEmailTemplates, getEmailTagTemplates, addEmailTemplate, updateEmailTemplate]);
}
