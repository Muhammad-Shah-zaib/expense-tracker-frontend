import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IAddTransactionRequestDto,
  IFetchNotesRequestDto,
  IFetchNotesResponseDto,
  ITransactionState,
  IAddTransactionResponseDto,
} from "./types";
import {
  FETCH_TRANSACTION_URL,
  TRANSACTION_ENDPOINT,
} from "../../environment/development";

// Action string
const FETCH_TRANSACTIONS_BY_ID = "transaction/fetchNotesById";
const ADD_TRANSACTION = "transaction/add";

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
      error instanceof Error ? error.message : "Unknown error",
    );
  }
});

export const addTransactionApi = createAsyncThunk<
  IAddTransactionResponseDto,
  IAddTransactionRequestDto,
  { state: ITransactionState }
>(ADD_TRANSACTION, async (request, { rejectWithValue, dispatch }) => {
  try {
    console.log(`sending request => ${JSON.stringify(request)}`);
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
    // Handle network or other errors
    return rejectWithValue(error as string);
  }
});
