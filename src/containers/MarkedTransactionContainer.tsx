import { AppDispatch, RootState } from "../store/store.ts";
import {
  changeSelectedTransaction,
  updateTransaction,
} from "../store/transactions/transactionSlice.ts";
import { DeleteTransaction, addTransactionApi, unMarkTransactionApi } from "../store/transactions/transactionApi.ts";
import { bindActionCreators } from "@reduxjs/toolkit";
import Transactions from "../components/transactions/Transactions.tsx";
import { connect } from "react-redux";
import ITransactions from "../interfaces/ITransactions.ts";
import {
  fetchTransactionById,
  markTransactionApi,
} from "../store/transactions/transactionApi.ts";

export type TMapStateToProps = (state: RootState) => {
  transactions: ITransactions[];
  selectedTransaction: ITransactions | null;
  loading: boolean;
};
export type TMapDispatchToProps = (dispatch: AppDispatch) => {
  markTransaction: typeof markTransactionApi;
  addTransaction: typeof addTransactionApi;
  deleteTransaction: typeof DeleteTransaction;
  changeSelectedTransaction: typeof changeSelectedTransaction;
  updateTransaction: typeof updateTransaction;
  fetchTransactionById: typeof fetchTransactionById;
  unMarkTransactionApi: typeof unMarkTransactionApi;
};

const mapStateToProps: TMapStateToProps = ({
  transactionSlice,
}: RootState) => ({
  transactions: transactionSlice.markedTransactions,
  selectedTransaction: transactionSlice.selectedTransaction,
  loading: transactionSlice.loading,
});

const mapDispatchToProps: TMapDispatchToProps = (dispatch: AppDispatch) => {
  return bindActionCreators(
    {
      markTransaction: markTransactionApi,
      addTransaction: addTransactionApi,
      deleteTransaction: DeleteTransaction,
      changeSelectedTransaction,
      updateTransaction,
      fetchTransactionById,
      unMarkTransactionApi
    },
    dispatch
  );
};

const MarkedTransactionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Transactions);

export default MarkedTransactionsContainer;
