import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAddTransactionRequestDto,
  IFetchNotesRequestDto,
  IFetchNotesResponseDto,
  ITransactionState,
  IAddTransactionResponseDto,
  IMarkTransactionRequestDto,
  IMarkTransactionResponseDto,
} from "./types";
import {
  FETCH_TRANSACTION_URL,
  MARK_TRANSACTION_ENDPOINT,
  TRANSACTION_ENDPOINT,
} from "../../environment/development";
import { IResponse } from "../types";

// Action string
const FETCH_TRANSACTIONS_BY_ID = "transaction/fetchNotesById";
const ADD_TRANSACTION = "transaction/add";
const MARK_TRANSACTION = "transaction/mark";

export const fetchTransactionById = createAsyncThunk<
  IFetchNotesResponseDto,
  IFetchNotesRequestDto,
  { state: ITransactionState }
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
  console.log(request);
  try {
    const response = await fetch(TRANSACTION_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer",
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
  } catch (error) {
    return rejectWithValue("An error occurred while marking the transaction");
  }
});
