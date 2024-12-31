import actions from "./actions";
import Api from "App/services/api";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";
import { put, takeEvery, call, all } from "redux-saga/effects";

const api = new Api();

export const getDocumentFile = takeEvery(actions.GET_DOCUMENT_FILE, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.DocumentFile), action.query);

        yield put({
            type: actions.GET_DOCUMENT_FILE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_DOCUMENT_FILE_FAILED,
            error: error?.data,
        });
    }
});

export const addDocumentFile = takeEvery(actions.CREATE_DOCUMENT_FILE, function* (action) {
    try {
        const res = yield call(api.post, buildRoute(apiEndpoints.DocumentFile), action.data);
        yield put({
            type: actions.CREATE_DOCUMENT_FILE_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.CREATE_DOCUMENT_FILE_FAILED,
            error: error?.data,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export const updateDocumentFile = takeEvery(actions.UPDATE_DOCUMENT_FILE, function* (action) {
    try {
        const res = yield call(api.patch, buildRoute(apiEndpoints.DocumentFile), action.data);

        yield put({
            type: actions.UPDATE_DOCUMENT_FILE_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.UPDATE_DOCUMENT_FILE_FAILED,
            error: error?.data,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export const deleteDocumentFile = takeEvery(actions.DELETE_DOCUMENT_FILE, function* (action) {
    try {
        const { type, id } = action.data;

        const res = yield call(api.delete, buildRoute(`${apiEndpoints.DeleteDocumentFile}`, type, `id=${id}`));

        yield put({
            type: actions.DELETE_DOCUMENT_FILE_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.DELETE_DOCUMENT_FILE_FAILED,
            error: error?.data,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export const addDocumentFileContent = takeEvery(actions.CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE, function* (action) {
    try {
        const res = yield call(api.post, buildRoute(apiEndpoints.AddDocumentFileContent), action.data);
        yield put({
            type: actions.CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.CREATE_DOCUMENT_FILE_CONTENT_BY_TYPE_FAILED,
            error: error?.data,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export const getDocumentFileContentById = takeEvery(actions.GET_DOCUMENT_FILE_CONTENT_ID_BY_TYPE, function* (action) {
    try {
        const res = yield call(api.get, buildRoute(apiEndpoints.GetDocumentFileContentById), action.id);

        yield put({
            type: actions.GET_DOCUMENT_FILE_CONTENT_ID_BY_TYPE_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_DOCUMENT_FILE_CONTENT_ID_BY_TYPE_FAILED,
            error: error?.data,
        });
    }
});

export const deleteDocumentFileContent = takeEvery(actions.DELETE_DOCUMENT_FILE_CONTENT_BY_TYPE, function* (action) {
    try {
        const res = yield call(api.delete, buildRoute(apiEndpoints.DeleteDocumentFileContent, action.id));

        yield put({
            type: actions.DELETE_DOCUMENT_FILE_CONTENT_BY_TYPE_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.DELETE_DOCUMENT_FILE_CONTENT_BY_TYPE_FAILED,
            error: error?.data,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export const updateDocumentFileContent = takeEvery(actions.UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE, function* (action) {
    try {
        const res = yield call(api.patch, buildRoute(apiEndpoints.UpdateDocumentFileContent, action.id), action.data);

        yield put({
            type: actions.UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_SUCCESS,
            response: res,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.UPDATE_DOCUMENT_FILE_CONTENT_BY_TYPE_FAILED,
            error: error?.data,
        });

        yield put({
            type: "SET_TOAST_DATA",
            response: error?.data,
        });
    }
});

export default function* Saga() {
    yield all([
        getDocumentFile,
        addDocumentFile,
        updateDocumentFile,
        deleteDocumentFile,
        addDocumentFileContent,
        getDocumentFileContentById,
        updateDocumentFileContent,
        deleteDocumentFileContent,
    ]);
}
