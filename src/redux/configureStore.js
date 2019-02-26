import { createStore, applyMiddleware, compose } from "redux";
import { fromJS } from "immutable";
import createReducer from "./reducers";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import freeze from "redux-freeze";
const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}, history) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
    // other middleware
  ];

  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    // dev
    middlewares.push(freeze); // prevent mutation
  } else {
    // production
  }

  const enhancers = [applyMiddleware(...middlewares)];
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false
      })
      : compose;
  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers)
  );

  /**
   * Config inject reducers, sagas dynamically
   */
  store.runSaga = sagaMiddleware.run;
  store.injectedReducers = {};
  store.injectedSagas = {};

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
};

export default configureStore;
