import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IFetchCustomSummaryRequestDto,
  IFetchCustomSummaryResponseDto,
  IFetchLastMonthCreditDebitDataRequestDto,
  IFetchLastMonthCreditDebitDataResponseDto,
  IGetGraphDataRequestDto,
  IGetGraphDataResponseDto,
  IGetLastMonthCategoryWiseSpendingRequestDto,
  IGetLastMonthCategoryWiseSpendingResponseDto,
  IGetPreviousFiveMonthDataRequestDto,
  IGetPreviousFiveMonthDataResponseDto,
} from "./types";
import {
  FETCH_CUSTOM_GRAPH_SUMMARY_ENDPOINT,
  FETCH_LAST_MONTH_CATEGORY_SUMMARY_ENDPOINT,
  FETCH_LAST_MONTH_REPORT_ENDPOINT,
  FETCH_LAST_SEVEN_DAYS_DATA_ENDPOINT,
  FETCH_PREV_5_MONTHS_DATA_ENDPOINT,
} from "../../environment/production";
import { delay } from "../../utils/delay";
import { RootState } from "../store";

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
>(
  FETCH_LAST_MONTH_CREDIT_DEBIT_DATA,
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${FETCH_LAST_MONTH_REPORT_ENDPOINT}/${userId}`
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch data");
      }

      const data: IFetchLastMonthCreditDebitDataResponseDto =
        await response.json();
      await delay(300);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Fetch data for the previous 5 months (thunk)
export const fetchPreviousFiveMonthData = createAsyncThunk<
  IGetPreviousFiveMonthDataResponseDto, // Return type
  IGetPreviousFiveMonthDataRequestDto, // Argument type
  { rejectValue: string } // Rejection type
>("fetch/previousFiveMonthData", async ({ userId }, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${FETCH_PREV_5_MONTHS_DATA_ENDPOINT}/${userId}`
    );

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(errorMessage || "Failed to fetch data");
    }

    const data = await response.json();

    const formattedData: IGetPreviousFiveMonthDataResponseDto = {
      xAxisLabels: data.prev5MonthNames,
      creditData: data.creditData,
      debitData: data.debitData,
      statusCode: data.statusCode,
      message: data.message,
      errors: data.errors,
    };

    return formattedData;
  } catch (error: any) {
    return rejectWithValue(error.message || "Something went wrong");
  }
});

// Fetch data for the last month (thunk)
export const fetchLastMonthCategoryWiseData = createAsyncThunk<
  IGetLastMonthCategoryWiseSpendingResponseDto, // Return type
  IGetLastMonthCategoryWiseSpendingRequestDto, // Argument type
  { rejectValue: string } // Rejection type
>(
  "fetch/lastMonthCategoryWiseData",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${FETCH_LAST_MONTH_CATEGORY_SUMMARY_ENDPOINT}/${userId}`
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || "Failed to fetch data");
      }

      return await response.json();
    } catch (error: any) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Async thunk for fetching custom summary
export const fetchCustomSummary = createAsyncThunk<
  IFetchCustomSummaryResponseDto,
  IFetchCustomSummaryRequestDto,
  { state: RootState }
>(
  "graph/fetchCustomSummary",
  async ({ startDate, endDate, userId, interval }, { rejectWithValue }) => {
    try {
      const url = `${FETCH_CUSTOM_GRAPH_SUMMARY_ENDPOINT}/${userId}?startDate=${startDate}&endDate=${endDate}&interval=${interval}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data: IFetchCustomSummaryResponseDto = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || "An error occurred");
    }
  }
);
