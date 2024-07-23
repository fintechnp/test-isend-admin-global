import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { commonReducer } from "../../Common";
import { privateReducer } from "../../Private";
import { publicReducer } from "Public";

const createRootReducer = () =>
    combineReducers({
        form: formReducer,
        ...commonReducer,
        ...privateReducer,
        ...publicReducer,
    });

export default createRootReducer;
