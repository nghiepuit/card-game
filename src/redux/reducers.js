import { combineReducers } from "redux-immutable";
import { routeReducer } from "./router-reducer";

const createReducer = injectedReducers => {
  return combineReducers({
    ROUTE: routeReducer,
    ...injectedReducers
  });
};

export default createReducer;
