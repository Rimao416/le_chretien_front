import { combineReducers } from "redux";
import authReducer from "./authSlice";
import bookReducer from "./bookSlice";
// import { configureStore } from "@reduxjs/toolkit";
// import academicYearReducer from "./academicYearReducer";
export const reducers = combineReducers({
  authReducer,
  bookReducer,
});
// export const store = configureStore({ auth: authReducer });
// export const store = configureStore({
//     reducer: {
//       auth: authReducer
//     },
//   })
