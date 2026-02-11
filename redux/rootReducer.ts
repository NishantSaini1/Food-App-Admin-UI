import { combineReducers } from "redux";
import { authReducer } from "./auth/auth.reducer";
import { foodReducer } from "./food/food.reducer"

export const rootReducer = combineReducers({
  auth: authReducer,
  food: foodReducer,
});
