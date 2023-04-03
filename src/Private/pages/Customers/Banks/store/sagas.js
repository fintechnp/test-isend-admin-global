import { put, takeEvery, call, all } from "redux-saga/effects";
import Api from "../../../../../App/services/api";
import actions from "./actions";

const api = new Api();

export const getAllBankList = takeEvery(actions.GET_BANK, function* (action) {
    try {
        const res = yield call(api.get, ``, action.query);
        yield put({
            type: actions.GET_BANK_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BANK_FAILED,
            error: error?.data,
        });
    }
});

export const getBankDetails = takeEvery(actions.GET_BANK_DETAILS, function* (action) {
    try {
        const res = yield call(api.get, `/customer/${action.id}/bank`, action.query);
        yield put({
            type: actions.GET_BANK_DETAILS_SUCCESS,
            response: res,
        });
    } catch (error) {
        yield put({
            type: actions.GET_BANK_DETAILS_FAILED,
            error: error.data,
        });
    }
});

// export const addBank = takeEvery(actions.ADD_BANK, function* (action) {
//     try {
//         const res = yield call(api.post, `deliveryoption`, action.data);
//         yield put({
//             type: actions.ADD_BANK_SUCCESS,
//             response: res,
//         });
//         yield put({ type: "SET_TOAST_DATA", response: res });
//     } catch (error) {
//         yield put({
//             type: actions.ADD_BANK_FAILED,
//             error: error.data,
//         });
//         yield put({ type: "SET_TOAST_DATA", response: error.data });
//     }
// });

// export const updateBank = takeEvery(actions.UPDATE_BANK, function* (action) {
//     try {
//         const res = yield call(api.put, `deliveryoption/${action.id}`, action.data);
//         yield put({
//             type: actions.UPDATE_BANK_SUCCESS,
//             response: res,
//         });
//         yield put({ type: "SET_TOAST_DATA", response: res });
//     } catch (error) {
//         yield put({
//             type: actions.UPDATE_BANK_FAILED,
//             error: error.data,
//         });
//         yield put({ type: "SET_TOAST_DATA", response: error.data });
//     }
// });

// export const deleteBank = takeEvery(actions.DELETE_BANK, function* (action) {
//     try {
//         const res = yield call(api.delete, `deliveryoption/${action.id}`);
//         yield put({
//             type: actions.DELETE_BANK_SUCCESS,
//             response: res,
//         });
//         yield put({ type: "SET_TOAST_DATA", response: res });
//     } catch (error) {
//         yield put({
//             type: actions.DELETE_BANK_FAILED,
//             error: error.data,
//         });
//         yield put({ type: "SET_TOAST_DATA", response: error.data });
//     }
// });

export default function* saga() {
    yield all([getAllBankList, getBankDetails]);
}
