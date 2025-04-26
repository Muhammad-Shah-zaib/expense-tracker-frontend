import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAddTransactionRequestDto,
  IFetchNotesRequestDto,
  IFetchNotesResponseDto,
  ITransactionState,
  IAddTransactionResponseDto,
  IMarkTransactionRequestDto,
  IMarkTransactionResponseDto,
  IFetchTRansactionWithDateRequestDto,
  IFetchTRansactionWithDateResponseDto,
  IFetchCreditsSummaryRequestDto,
  IFetchCreditsSummaryResponseDto,
  IDeleteTransactionResponseDto,
  IDeleteTransactionRequestDto,
  IUpdateTransactionResponseDto,
  IUpdateTransactionRequestDto,
} from "./types";
import {
  DELETE_TRANSACTION_URL,
  FETCH_CREDITS_SUMMARY_ENDPOINT,
  FETCH_TRANSACTION_URL,
  FETCH_TRANSACTION_WITH_DATE_ENDPOINT,
  MARK_TRANSACTION_ENDPOINT,
  TRANSACTION_ENDPOINT,
} from "../../environment/production";
import { IResponse } from "../types";

// Action string
const FETCH_TRANSACTIONS_BY_ID = "transaction/fetchNotesById";
const ADD_TRANSACTION = "transaction/add";
const MARK_TRANSACTION = "transaction/mark";
const FETCH_CREDITS_SUMAMRY = "transaction/credits-summary";
const DELETE_TRANSACTION = "transaction/delete";
const UPDATE_TRANSACTION = "transaction/update";

export const fetchTransactionById = createAsyncThunk<
  IFetchNotesResponseDto,
  IFetchNotesRequestDto,
  { rejectValue: string }
>(FETCH_TRANSACTIONS_BY_ID, async ({ id }, { rejectWithValue }) => {
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  try {
    // Add delay before making the fetch call
    await delay(500); // Delay for 2 seconds (adjust as needed)

    const response = await fetch(`${FETCH_TRANSACTION_URL}?userId=${id}`);

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data as IFetchNotesResponseDto;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Unknown error"
    );
  }
});

export const addTransactionApi = createAsyncThunk<
  IAddTransactionResponseDto,
  IAddTransactionRequestDto,
  { state: ITransactionState }
>(ADD_TRANSACTION, async (request, { rejectWithValue, dispatch }) => {
  try {
    const response = await fetch(TRANSACTION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      // If response status is not ok, handle error
      const errorData = await response.json();
      return rejectWithValue(errorData);
    }
    dispatch(fetchTransactionById({ id: request.userId }));
    const data: IAddTransactionResponseDto = await response.json();
    return data;
  } catch (error: unknown) {
    return rejectWithValue(error as IResponse);
  }
});

// Thunk action for marking a transaction
export const markTransactionApi = createAsyncThunk<
  IMarkTransactionResponseDto,
  IMarkTransactionRequestDto,
  { rejectValue: string }
>(MARK_TRANSACTION, async (request, { rejectWithValue }) => {
  const url = `${MARK_TRANSACTION_ENDPOINT}${request.transactionId}/mark?userId=${request.userId}`;

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // handling rejected response
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(
        errorResponse.message || "Failed to mark transaction"
      );
    }

    return response.json();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("An error occurred while marking the transaction");
  }
});

export const fetchTransactionSummary = createAsyncThunk<
  IFetchTRansactionWithDateResponseDto,
  IFetchTRansactionWithDateRequestDto,
  { rejectValue: string }
>("transactions/fetchSummary", async (request, { rejectWithValue }) => {
  const { userId, startDate, endDate } = request;
  const url = `${FETCH_TRANSACTION_WITH_DATE_ENDPOINT}/${userId}?startDate=${startDate}&endDate=${endDate}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handling rejected response
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(
        errorResponse.message || "Failed to fetch transaction summary"
      );
    }

    return response.json();
  } catch (error) {
    return rejectWithValue(
      "An error occurred while fetching the transaction summary" + error
    );
  }
});

export const fetchCreditsSummary = createAsyncThunk<
  IFetchCreditsSummaryResponseDto,
  IFetchCreditsSummaryRequestDto,
  { rejectValue: string }
>(FETCH_CREDITS_SUMAMRY, async (request, { rejectWithValue }) => {
  const { userId, creditReportType } = request;
  const url = `${FETCH_CREDITS_SUMMARY_ENDPOINT}/${userId}?creditReportType=${creditReportType}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handling rejected response
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(
        errorResponse.message || "Failed to fetch credits summary"
      );
    }

    // Parsing the response
    const data: IFetchCreditsSummaryResponseDto = await response.json();
    return data;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue(
      "An error occurred while fetching the credits summary"
    );
  }
});

export const DeleteTransaction = createAsyncThunk<
  IDeleteTransactionResponseDto,
  IDeleteTransactionRequestDto,
  { rejectValue: string }
>(DELETE_TRANSACTION, async (request, { rejectWithValue }) => {
  const { userId, transactionId } = request;
  const url = `${DELETE_TRANSACTION_URL}/${transactionId}?userId=${userId}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handling rejected response
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(
        errorResponse.message || "Failed to delete transaction"
      );
    }

    return response.json();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("An error occurred while deleting the transaction");
  }
});

export const updateTransactionApi = createAsyncThunk<
  IUpdateTransactionResponseDto,
  IUpdateTransactionRequestDto,
  { rejectValue: string }
>(UPDATE_TRANSACTION, async (request, { rejectWithValue }) => {
  const { transaction } = request;
  const url = `${TRANSACTION_ENDPOINT}/${request.transaction.id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transaction),
    });

    // Handling rejected response
    if (!response.ok) {
      const errorResponse = await response.json();
      return rejectWithValue(
        errorResponse.message || "Failed to update transaction"
      );
    }

    return response.json();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return rejectWithValue("An error occurred while updating the transaction");
  }
}
);
