import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IFetchLastMonthCreditDebitDataRequestDto,
  IFetchLastMonthCreditDebitDataResponseDto,
  IGetGraphDataRequestDto,
  IGetGraphDataResponseDto,
} from "./types";
import { FETCH_LAST_MONTH_REPORT_ENDPOINT, FETCH_LAST_SEVEN_DAYS_DATA_ENDPOINT } from "../../environment/development";
import { delay } from "../../utils/delay";

// Actions
const FETCH_LAST_SEVEN_DAYS_DATA = "graph/fetchLastSevenDaysData";
const FETCH_LAST_MONTH_CREDIT_DEBIT_DATA =
  "graph/fetchLastMonthCreditDebitData";

// Fetch data for the last seven days (thunk)
export const fetchLastSevenDaysData = createAsyncThunk<
  IGetGraphDataResponseDto, // Return type
  IGetGraphDataRequestDto, // Argument type
  { rejectValue: string } // Rejection type
>(FETCH_LAST_SEVEN_DAYS_DATA, async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${FETCH_LAST_SEVEN_DAYS_DATA_ENDPOINT}/${userId}`
    );

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

// Fetch data for the last month (thunk)
export const fetchLastMonthCreditDebitData = createAsyncThunk<
  IFetchLastMonthCreditDebitDataResponseDto, // Return type
  IFetchLastMonthCreditDebitDataRequestDto, // Argument type
  { rejectValue: string } // Rejection type
>(FETCH_LAST_MONTH_CREDIT_DEBIT_DATA, async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${FETCH_LAST_MONTH_REPORT_ENDPOINT}/${userId}`);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to fetch data");
    }

    const data: IFetchLastMonthCreditDebitDataResponseDto = await response.json();
    await delay(300);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message || "Something went wrong");
  }
});
