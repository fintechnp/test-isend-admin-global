import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "App/services/api";
import actions from "./actions";

const api = new Api();

export const uploadProfilePicture = takeEvery(actions.UPLOAD_PROFILE_PICTURE, function* (action) {
    try {
        const res = yield call(api.post, `account/profilepicture`, action.data);

        yield put({
            type: actions.UPLOAD_PROFILE_PICTURE_SUCCESS,
            response: res,
        });
        yield put({ type: "SET_TOAST_DATA", response: res });
    } catch (error) {
        yield put({
            type: actions.UPLOAD_PROFILE_PICTURE_FAILURE,
            error: error?.data,
        });
        yield put({ type: "SET_TOAST_DATA", response: error?.data });
    }
});

export default function* saga() {
    yield all([uploadProfilePicture]);
}
