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
import {
  addTransactionApi,
  DeleteTransaction,
  fetchCreditsSummary,
  fetchTransactionById,
  fetchTransactionSummary,
  markTransactionApi,
  unMarkTransactionApi,
  updateTransactionApi,
} from "./transactionApi.ts";
import { IResponse } from "../types.ts";

const initialState: ITransactionState = {
  deleteTransactionLoading: false,
  creditsAmount: null,
  creditsCount: null,
  creditsSummaryLoading: false,
  transactions: [],
  markedTransactions: [],
  selectedTransaction: null,
  loading: false,
  addTransactionLoading: false,
  transactionWithDateLoading: false,
  transactionWIthDateDate: [],
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
      }: PayloadAction<{ message: string; severity: TSnackBarSeverity }>
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
      { payload: { transactionId } }: PayloadAction<IMarkTransactionDto>
    ) {
      if (state.markedTransactions.find((t) => t.id === transactionId)) return;
      state.markedTransactions.push(
        state.transactions.find(
          (transaction) => transaction.id === transactionId
        )!
      );
    },
    // delete the transaction
    deleteTransaction(
      state,
      { payload: { transactionId } }: PayloadAction<IDeleteTransactionDto>
    ) {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
      state.markedTransactions = state.markedTransactions.filter(
        (transaction) => transaction.id !== transactionId
      );
    },
    // add a new transaction
    addTransaction(
      state,
      { payload: { transaction } }: PayloadAction<IAddTransactionDto>
    ) {
      state.transactions.push(transaction);
    },
    // update transaction
    updateTransaction(
      state,
      { payload: { newTransaction } }: PayloadAction<IUpdateTransactionDto>
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
      { payload: { transaction } }: PayloadAction<IChangeSelectedTransactionDto>
    ) {
      state.selectedTransaction = transaction;
    },
  },
  extraReducers: (builder) => {
    // FETCH TRANSACTIONS
    builder.addCase(
      fetchTransactionById.fulfilled,
      (
        state,
        {
          payload: { transactions, statusCode },
        }: PayloadAction<IFetchNotesResponseDto>
      ) => {
        state.loading = false;
        if (statusCode == 200) {
          transactions = transactions.map((t) => ({
            ...t, // Spread the existing properties
            date: t.date
              ? new Date(t.date as string).toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Invalid Date",
          }));

          state.transactions = transactions;
          state.markedTransactions = transactions.filter((t) => t.marked);
        } else if (statusCode == 404) state.transactions = [];
      }
    );
    builder.addCase(fetchTransactionById.pending, (state) => {
      state.loading = true;
      state.transactions = [];
      state.markedTransactions = [];
    });
    builder.addCase(fetchTransactionById.rejected, (state) => {
      state.loading = false;
      state.transactions = [];
      state.markedTransactions = [];
    });
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
    });
    builder.addCase(addTransactionApi.pending, (state) => {
      state.addTransactionLoading = true;
    });
    builder.addCase(addTransactionApi.rejected, (state, action) => {
      state.addTransactionLoading = false;
      state.snackbar.open = true;
      const payload = action.payload as IResponse;
      // generating response
      let response = "Something went wrong! Transaction failed to add!";
      if (payload.statusCode === 400) response = payload.message;
      // opening snackbar
      state.snackbar.message = response;
      state.snackbar.severity = "error";
    });

    // MARK TRANSACTION
    builder.addCase(markTransactionApi.fulfilled, (state) => {
      state.loading = false;
      state.snackbar.open = true;
      state.snackbar.message = "Transaction Marked successfully!";
      state.snackbar.severity = "success";
    });
    builder.addCase(markTransactionApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markTransactionApi.rejected, (state, { payload }) => {
      state.loading = false;
      state.snackbar.open = true;
      state.snackbar.message = payload || "Failed to mark transaction!";
      state.snackbar.severity = "error";
    });
    builder.addCase(fetchTransactionSummary.fulfilled, (state, { payload }) => {
      state.transactionWithDateLoading = false;
      state.transactionWIthDateDate = payload.dayWiseTransactions;
      state.snackbar.open = true;
      if (state.transactionWIthDateDate.length === 0) {
        state.snackbar.message = "No transactions found for the selected date!";
        state.snackbar.severity = "info";
        return;
      }
      state.snackbar.message = "Transaction downloaded successfully!";
      state.snackbar.severity = "success";
    });
    builder.addCase(fetchTransactionSummary.pending, (state) => {
      state.transactionWithDateLoading = true;
    });
    builder.addCase(fetchTransactionSummary.rejected, (state, { payload }) => {
      state.transactionWithDateLoading = false;
      state.snackbar.open = true;
      state.snackbar.message =
        payload || "Failed to fetch transaction with date!";
      state.snackbar.severity = "error";
    });

    // UNMARK TRANSACTION
builder.addCase(unMarkTransactionApi.fulfilled, (state) => {
  state.loading = false;
  state.snackbar.open = true;
  state.snackbar.message = "Transaction Unmarked successfully!";
  state.snackbar.severity = "success";
});

builder.addCase(unMarkTransactionApi.pending, (state) => {
  state.loading = true;
});

builder.addCase(unMarkTransactionApi.rejected, (state, { payload }) => {
  state.loading = false;
  state.snackbar.open = true;
  state.snackbar.message = payload || "Failed to unmark transaction!";
  state.snackbar.severity = "error";
});


    // FETCH CREDITS SUMMARY
    builder.addCase(fetchCreditsSummary.fulfilled, (state, { payload }) => {
      state.creditsSummaryLoading = false;
      state.creditsAmount = payload.creditsAmount;
      state.creditsCount = payload.creditsCount;
      // state.snackbar.open = true;
      // state.snackbar.message = "Credits summary fetched successfully!";
      // state.snackbar.severity = "success";
    });
    builder.addCase(fetchCreditsSummary.pending, (state) => {
      state.creditsSummaryLoading = true;
    });
    builder.addCase(fetchCreditsSummary.rejected, (state, { payload }) => {
      state.creditsSummaryLoading = false;
      state.snackbar.open = true;
      state.snackbar.message = payload || "Failed to fetch credits summary!";
      state.snackbar.severity = "error";
    });
    builder.addCase(updateTransactionApi.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.transactions = state.transactions.map((t) => {
        if (t.id === payload.transaction.id) {
          return payload.transaction;
        }
        return t;
      });
      state.markedTransactions = state.markedTransactions.map((t) => {
        if (t.id === payload.transaction.id) {
          return payload.transaction;
        }
        return t;
      });
      state.snackbar.open = true;
      state.snackbar.message = "Transaction updated successfully!";
      state.snackbar.severity = "success";
    });
    builder
      .addCase(DeleteTransaction.pending, (state) => {
        state.deleteTransactionLoading = true;
        state.snackbar = {
          open: true,
          message: "Deleting transaction...",
          severity: "info",
        };
      })
      .addCase(DeleteTransaction.fulfilled, (state, action) => {
        state.deleteTransactionLoading = false;
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.meta.arg.transactionId
        );
        state.markedTransactions = state.markedTransactions.filter(
          (transaction) => transaction.id !== action.meta.arg.transactionId
        );
        state.snackbar = {
          open: true,
          message: "Transaction deleted successfully",
          severity: "success",
        };
      })
      .addCase(DeleteTransaction.rejected, (state, action) => {
        state.deleteTransactionLoading = false;
        state.snackbar = {
          open: true,
          message: action.payload || "Failed to delete transaction",
          severity: "error",
        };
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
