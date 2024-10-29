import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IFetchNotesRequestDto,
  IFetchNotesResponseDto,
  ITransactionState,
} from "./types";
import { FETCH_TRANSACTION_URL } from "../../environment/development";

// Action string
const FETCH_TRANSACTIONS_BY_ID = "transaction/fetchNotesById";

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

    const response = await fetch(`${FETCH_TRANSACTION_URL}${id}`);

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
