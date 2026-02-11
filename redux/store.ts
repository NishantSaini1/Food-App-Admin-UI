import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import {rootReducer} from "./rootReducer";
import { toastMiddleware } from "./middleware/toast.middleware";
export const store = createStore(rootReducer, applyMiddleware(thunk,toastMiddleware));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
