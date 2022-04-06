import { privateSaga } from "../../Private";
import { commonSaga } from "../../Common";
import { all } from "@redux-saga/core/effects";

export default function* rootSaga() {
    yield all([...commonSaga, ...privateSaga]);
}
