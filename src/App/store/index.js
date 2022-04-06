import { createStore, applyMiddleware } from "redux";
import { createBrowserHistory } from "history";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import createRootReducer from "./reducers";
import rootSaga from "./sagas";

const persistConfig = {
    key: "root",
    storage,
};

const history = createBrowserHistory();

const persistedReducer = persistReducer(
    persistConfig,
    createRootReducer()
);

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { history };
export default store;
