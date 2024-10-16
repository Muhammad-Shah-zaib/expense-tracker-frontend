import { combineReducers } from '@reduxjs/toolkit';
import cardSliceReducer from "./cards/cardSlice";

export const rootReducer = combineReducers({
    cardSlice: cardSliceReducer
});