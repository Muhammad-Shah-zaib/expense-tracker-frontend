import { AppDispatch, RootState } from "../store/store.ts";
import { ITransactionState } from "../store/transactions/types.ts";
import {
  addTransaction,
  changeSelectedTransaction,
  updateTransaction,
} from "../store/transactions/transactionSlice.ts";
import { DeleteTransaction as deleteTransaction } from "../store/transactions/transactionApi.ts";
import { bindActionCreators } from "@reduxjs/toolkit";
import Transactions from "../components/transactions/Transactions.tsx";
import { connect } from "react-redux";
import { fetchTransactionById, markTransactionApi } from "../store/transactions/transactionApi.ts";

export type TMapStateToProps = (state: RootState) => ITransactionState;
export type TMapDispatchToProps = (dispatch: AppDispatch) => {
  markTransaction: typeof markTransactionApi;
  addTransaction: typeof addTransaction;
  deleteTransaction: typeof deleteTransaction;
  changeSelectedTransaction: typeof changeSelectedTransaction;
  updateTransaction: typeof updateTransaction;
  fetchTransactionById: typeof fetchTransactionById;
};

export const mapStateToProps: TMapStateToProps = ({
  transactionSlice,
}: RootState) => transactionSlice;

export const mapDispatchToProps: TMapDispatchToProps = (
  dispatch: AppDispatch,
) => {
  return bindActionCreators(
    {
      markTransaction: markTransactionApi,
      addTransaction,
      deleteTransaction,
      changeSelectedTransaction,
      updateTransaction,
      fetchTransactionById,
    },
    dispatch,
  );
};

const TransactionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transactions);

export default TransactionContainer;
