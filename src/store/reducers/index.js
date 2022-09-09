import { combineReducers } from "redux";
import userSlice from "./userSlice";
import todoSlice from "./todoSlice";

const rootReducers = combineReducers({
  userSlice,
  todoSlice,
});
export default rootReducers;
