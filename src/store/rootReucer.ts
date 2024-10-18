import { combineReducers } from "@reduxjs/toolkit";
import cardSliceReducer from "./cards/cardSlice";
import transactionReducer from "./transactions/transactionSlice";

export const rootReducer = combineReducers({
  cardSlice: cardSliceReducer,
  transactionSlice: transactionReducer,
});
