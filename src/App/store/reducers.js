import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { commonReducer } from "../../Common";
import { privateReducer } from "../../Private";

const createRootReducer = () =>
    combineReducers({
        form: formReducer,
        ...commonReducer,
        ...privateReducer,
    });

export default createRootReducer;
