import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducers from "./reducers/index";

export const store = configureStore(
  { reducer: rootReducers },
  applyMiddleware(thunk)
);
