import { combineReducers } from "redux";
import burgerBuildReducer from "./burgerBuilder";
import orderReducer from "./order";

export default combineReducers({
    burger: burgerBuildReducer,
    order: orderReducer
});