import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetGraphDataRequestDto, IGetGraphDataResponseDto } from "./types";
import { FETCH_LAST_SEVEN_DAYS_DATA_ENDPOINT } from "../../environment/development";
import { delay } from "../../utils/delay";

// Actions
const FETCH_LAST_SEVEN_DAYS_DATA = "graph/fetchLastSevenDaysData";

// Fetch data for the last seven days (thunk)
export const fetchLastSevenDaysData = createAsyncThunk<
  IGetGraphDataResponseDto, // Return type
  IGetGraphDataRequestDto, // Argument type
  { rejectValue: string } // Rejection type
>(FETCH_LAST_SEVEN_DAYS_DATA, async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${FETCH_LAST_SEVEN_DAYS_DATA_ENDPOINT}/${userId}`);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to fetch data");
    }

    const data: IGetGraphDataResponseDto = await response.json();
    await delay(300);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Something went wrong");
  }
});
