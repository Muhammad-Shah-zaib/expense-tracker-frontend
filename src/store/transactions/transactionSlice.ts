import {
  IAddTransactionDto,
  IChangeSelectedTransactionDto,
  IDeleteTransactionDto,
  IFetchNotesResponseDto,
  IMarkTransactionDto,
  ITransactionState,
  IUpdateTransactionDto,
  TSnackBarSeverity,
} from "./types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addTransactionApi, fetchTransactionById } from "./transactionApi.ts";

const initialState: ITransactionState = {
  transactions: [],
  markedTransactions: [],
  selectedTransaction: null,
  loading: false,
  addTransactionLoading: false,
  snackbar: { open: false, message: "", severity: "success" },
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    showSnackbar(
      state,
      {
        payload,
      }: PayloadAction<{ message: string; severity: TSnackBarSeverity }>,
    ) {
      state.snackbar.open = true;
      state.snackbar.message = payload.message;
      state.snackbar.severity = payload.severity;
    },
    hideSnackbar(state) {
      state.snackbar.open = false;
    },
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
    // FETCH TRANSACTIONS
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
      }),
      //   ADD TRANSACTION
      builder.addCase(addTransactionApi.fulfilled, (state, { payload }) => {
        state.addTransactionLoading = false;
        if (payload.statusCode === 200) {
          state.transactions = [...state.transactions, payload.transaction];
          // Show success snackbar after adding the transaction
          state.snackbar.open = true;
          state.snackbar.message = "Transaction added successfully!";
          state.snackbar.severity = "success";
        } else {
          state.snackbar.open = true;
          state.snackbar.message = "Transaction failed to add!";
          state.snackbar.severity = "error";
        }
      }),
      builder.addCase(addTransactionApi.pending, (state) => {
        state.addTransactionLoading = true;
      }),
      builder.addCase(addTransactionApi.rejected, (state) => {
        state.addTransactionLoading = false;
        state.snackbar.open = true;
        state.snackbar.message =
          "Something went wrong! Transaction failed to add!";
        state.snackbar.severity = "error";
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
  showSnackbar,
  hideSnackbar,
} = transactionSlice.actions;
