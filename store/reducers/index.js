import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import cartReducer from "./CartReducer";

export default combineReducers({
  user: authReducer,
  cart: cartReducer,
});
