import { combineReducers } from "@reduxjs/toolkit";
import cardSliceReducer from "./cards/cardSlice";
import transactionReducer from "./transactions/transactionSlice";
import userSliceReducer from "./user/userSlice";
import graphSliceReducer from "./graph/graphSlice";

export const rootReducer = combineReducers({
  cardSlice: cardSliceReducer,
  transactionSlice: transactionReducer,
  userSlice: userSliceReducer,
  graphSlice: graphSliceReducer,
});
