import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar, Alert } from "@mui/material";
import { RootState } from "../../store/store.ts";
import { hideSnackbar } from "../../store/transactions/transactionSlice.ts"; // Adjust path

const TransactionSnackbar = () => {
  const dispatch = useDispatch();
  const snackbar = useSelector(
    (state: RootState) => state.transactionSlice.snackbar,
  );

  // Close snackbar after a certain period
  useEffect(() => {
    if (snackbar.open) {
      setTimeout(() => {
        dispatch(hideSnackbar());
      }, 3000);
    }
  }, [snackbar.open, dispatch]);

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => dispatch(hideSnackbar())}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Alert
        onClose={() => dispatch(hideSnackbar())}
        severity={snackbar.severity}
        sx={{ width: "100%" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default TransactionSnackbar;
