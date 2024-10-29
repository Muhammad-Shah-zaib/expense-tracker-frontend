import {
  IAddTransactionDto,
  IChangeSelectedTransactionDto,
  IDeleteTransactionDto,
  IFetchNotesResponseDto,
  IMarkTransactionDto,
  ITransactionState,
  IUpdateTransactionDto,
} from "./types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTransactionById } from "./transactionApi.ts";

const initialState: ITransactionState = {
  transactions: [],
  markedTransactions: [],
  selectedTransaction: null,
  loading: false,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    // mark the transaction
    markTransaction(
      state,
      { payload: { transactionId } }: PayloadAction<IMarkTransactionDto>,
    ) {
      if (state.markedTransactions.find((t) => t.id === transactionId)) return;
      state.markedTransactions.push(
        state.transactions.find(
          (transaction) => transaction.id === transactionId,
        )!,
      );
    },
    // delete the transaction
    deleteTransaction(
      state,
      { payload: { transactionId } }: PayloadAction<IDeleteTransactionDto>,
    ) {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== transactionId,
      );
      state.markedTransactions = state.markedTransactions.filter(
        (transaction) => transaction.id !== transactionId,
      );
    },
    // add a new transaction
    addTransaction(
      state,
      { payload: { transaction } }: PayloadAction<IAddTransactionDto>,
    ) {
      state.transactions.push(transaction);
    },
    // update transaction
    updateTransaction(
      state,
      { payload: { newTransaction } }: PayloadAction<IUpdateTransactionDto>,
    ) {
      state.transactions = state.transactions.map((t) => {
        if (t.id === newTransaction.id) {
          return newTransaction;
        }
        return t;
      });
      state.markedTransactions = state.markedTransactions.map((t) => {
        if (t.id === newTransaction.id) {
          return newTransaction;
        }
        return t;
      });
    },

    // change selected transaction
    changeSelectedTransaction(
      state,
      {
        payload: { transaction },
      }: PayloadAction<IChangeSelectedTransactionDto>,
    ) {
      state.selectedTransaction = transaction;
    },
  },
  extraReducers: (builder) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    builder.addCase(
      fetchTransactionById.fulfilled,
      (
        state,
        {
          payload: { transactions, statusCode },
        }: PayloadAction<IFetchNotesResponseDto>,
      ) => {
        state.loading = false;
        if (statusCode == 200) {
          state.transactions = transactions;
          state.markedTransactions = transactions.filter((t) => t.marked);
        } else if (statusCode == 404) state.transactions = [];
      },
    ),
      builder.addCase(fetchTransactionById.pending, (state) => {
        state.loading = true;
        state.transactions = [];
        state.markedTransactions = [];
      }),
      builder.addCase(fetchTransactionById.rejected, (state) => {
        state.loading = false;
        state.transactions = [];
        state.markedTransactions = [];
      });
  },
});

export default transactionSlice.reducer;
export const {
  markTransaction,
  deleteTransaction,
  addTransaction,
  changeSelectedTransaction,
  updateTransaction,
} = transactionSlice.actions;
