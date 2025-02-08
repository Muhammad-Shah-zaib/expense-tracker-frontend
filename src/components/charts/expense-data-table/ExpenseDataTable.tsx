import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchTransactionById } from "../../../store/transactions/transactionApi";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";

interface IExpenseDataTableProps {
  height?: string | number;
}

export default function ExpenseDataTable({ height }: IExpenseDataTableProps) {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(
    (state) => state.transactionSlice.transactions
  );
  const userId = useAppSelector((state) => state.userSlice.userId);

  useEffect(() => {
    if (transactions.length === 0 && userId) {
      dispatch(fetchTransactionById({ id: userId }));
    }
  }, [dispatch, userId, transactions.length]);

  // Define the columns for the DataGrid
  const columns: GridColDef[] = [
    { field: "id", headerName: "Transaction ID", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "category", headerName: "Transaction Category", width: 180 },
    {
      field: "amount",
      headerName: "Transaction Amount",
      type: "number",
      width: 150,
    },
  ];

  // Ensure transactions exist and map properly
  const rows =
    transactions
      ?.slice(0, 7)
      .map((t) => ({
        id: t.id,
        date: t.date,
        category: t.purpose,
        amount: t.amount,
      })) || [];

  // Pagination model
  const paginationModel = { page: 0, pageSize: 7 };

  return (
    <Paper
      sx={{
        height: height ? height : 300,
        width: "100%",
        position: "relative",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[7]}
        checkboxSelection
        sx={{ border: 0 }}
      />
      <NavLink to="/transactions" style={{ textDecoration: "none" }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ position: "absolute", bottom: 5, right: 5 }}
        >
          View All Transactions
        </Button>
      </NavLink>
    </Paper>
  );
}
