import { combineReducers } from "@reduxjs/toolkit";
import cardSliceReducer from "./cards/cardSlice";
import transactionReducer from "./transactions/transactionSlice";
import userSliceReducer from "./user/userSlice";
import graphSliceReducer from "./graph/graphSlice";
import sideBarSliceReducer from "./side-bar/sideBarSlice";

export const rootReducer = combineReducers({
  cardSlice: cardSliceReducer,
  transactionSlice: transactionReducer,
  userSlice: userSliceReducer,
  graphSlice: graphSliceReducer,
  sideBarSlice: sideBarSliceReducer,
});
