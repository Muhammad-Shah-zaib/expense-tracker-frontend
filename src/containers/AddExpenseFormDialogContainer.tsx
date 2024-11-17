import { AppDispatch, RootState } from "../store/store.ts";
import { addTransactionApi } from "../store/transactions/transactionApi.ts";
import { bindActionCreators } from "@reduxjs/toolkit";
import AddExpenseFormDialog from "../components/Forms/AddExpenseFormDialog.tsx";
import { connect } from "react-redux";

interface IOwnProps {
  onClose: () => void;
  open: boolean;
}
type TMapStateToProps = (
  state: RootState,
  ownProps: IOwnProps,
) => {
  loading: boolean;
  onClose: () => void;
  open: boolean;
};

type TMapDispatchToProps = (dispatch: AppDispatch) => {
  addTransactionApi: typeof addTransactionApi;
};

export type TAddExpenseFormDialogProps = ReturnType<TMapStateToProps> &
  ReturnType<TMapDispatchToProps>;

const mapStateToProps: TMapStateToProps = (state, ownProps) => ({
  loading: state.transactionSlice.addTransactionLoading,
  ...ownProps,
});

const mapDispatchToProps: TMapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTransactionApi: addTransactionApi,
    },
    dispatch,
  );
};

const AddExpenseFormDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddExpenseFormDialog);

export default AddExpenseFormDialogContainer;
