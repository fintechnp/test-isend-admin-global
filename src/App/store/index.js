import rootSaga from "./sagas";
import createRootReducer from "./reducers";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import AuthUtility from "App/utils/AuthUtility";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

// refresh middleware
let buffer = [];
let failed = [];
let wait = false;

const lastActionMiddleware = (store) => (next) => (action) => {
    if (action.type.includes("FAILED") && action.type !== "REFRESH_TOKEN_FAILED") {
        failed.push(action.type.replace("_FAILED", ""));
    } else if (
        !action.type.includes("SUCCESS") &&
        !action.type.includes("@@") &&
        !action.type.includes("RESET") &&
        !action.type.includes("SET_TOAST_DATA") &&
        !action.type.includes("RESET_TOAST_DATA") &&
        !action.type.includes("INVALID_TOKEN") &&
        !action.type.includes("REFRESH_TOKEN") &&
        !buffer.includes(action)
    ) {
        buffer.push(action);
    } else if (action.type.includes("SUCCESS") && action.type !== "REFRESH_TOKEN_SUCCESS") {
        var index = buffer.indexOf(buffer.find((element) => element.type === action.type.replace("_SUCCESS", "")));
        if (index > -1) {
            buffer.splice(index, 1);
        }
    }

    if (action.type === "INVALID_TOKEN") {
        store.dispatch({
            type: "REFRESH_TOKEN",
            data: {
                access_token: AuthUtility.getAccessToken(),
                refresh_token: AuthUtility.getRefreshToken(),
            },
        });
        wait = true;
    } else if (action.type === "REFRESH_TOKEN_FAILED") {

        wait = false;

        buffer = [];

        failed = [];

        store.dispatch({
            type: "RESET",
        });

       AuthUtility.logOut()

        window.location.reload();
    } else if (action.type === "REFRESH_TOKEN_SUCCESS") {
        wait = false;
        buffer.forEach((old) => {
            failed.forEach((fail) => {
                if (fail === old.type) {
                    store.dispatch(old);
                    var index = failed.indexOf(fail);
                    if (index > -1) {
                        failed.splice(index, 1);
                    }
                }
            });
        });
        buffer = [];
        failed = [];
    } else {
        if (buffer.length > 20) {
            buffer.splice(0, buffer.length - 5);
        }
        if (!wait) {
            return next(action);
        }
    }
};

const history = createBrowserHistory();

const resetEnhancer = (rootReducer) => (state, action) => {
    if (action.type !== "RESET") return rootReducer(state, action);

    const newState = {};
    
    // Iterate through known reducer keys and reset each one
    Object.keys(state).forEach((key) => {
        switch (key) {
            case 'router':
                newState[key] = state[key];
                break;
            default:
                newState[key] = rootReducer(undefined, {});
        }
    });

    return newState;
};

const appReducer = resetEnhancer(createRootReducer())
 
const sagaMiddleware = createSagaMiddleware();
const middlewares = [lastActionMiddleware, sagaMiddleware];

const store = createStore(appReducer, composeWithDevTools(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

export { history };

export default store;
