import { AppDispatch, RootState } from "../store/store.ts";
import {
  addTransaction,
  changeSelectedTransaction,
  deleteTransaction,
  markTransaction,
  updateTransaction,
} from "../store/transactions/transactionSlice.ts";
import { bindActionCreators } from "@reduxjs/toolkit";
import Transactions from "../components/transactions/Transactions.tsx";
import { connect } from "react-redux";
import ITransactions from "../interfaces/ITransactions.ts";
import { fetchTransactionById } from "../store/transactions/transactionApi.ts";

export type TMapStateToProps = (state: RootState) => {
  transactions: ITransactions[];
  selectedTransaction: ITransactions | null;
};
export type TMapDispatchToProps = (dispatch: AppDispatch) => {
  markTransaction: typeof markTransaction;
  addTransaction: typeof addTransaction;
  deleteTransaction: typeof deleteTransaction;
  changeSelectedTransaction: typeof changeSelectedTransaction;
  updateTransaction: typeof updateTransaction;
  fetchTransactionById: typeof fetchTransactionById;
};

export const mapStateToProps: TMapStateToProps = ({
  transactionSlice,
}: RootState) => ({
  transactions: transactionSlice.markedTransactions,
  selectedTransaction: transactionSlice.selectedTransaction,
});

export const mapDispatchToProps: TMapDispatchToProps = (
  dispatch: AppDispatch,
) => {
  return bindActionCreators(
    {
      markTransaction,
      addTransaction,
      deleteTransaction,
      changeSelectedTransaction,
      updateTransaction,
      fetchTransactionById,
    },
    dispatch,
  );
};

const MarkedTransactionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Transactions);

export default MarkedTransactionsContainer;
