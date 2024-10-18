import {
  IAddTransactionDto,
  IChangeSelectedTransactionDto,
  IDeleteTransactionDto,
  IMarkTransactionDto,
  ITransactionState,
  IUpdateTransactionDto,
} from "./types.ts";
import transactions from "../../dummy-data/transactions.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ITransactionState = {
  transactions: transactions,
  markedTransactions: [],
  selectedTransaction: null,
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
});

export default transactionSlice.reducer;
export const {
  markTransaction,
  deleteTransaction,
  addTransaction,
  changeSelectedTransaction,
  updateTransaction,
} = transactionSlice.actions;
