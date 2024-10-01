import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";

interface IExpenseDataTableProps {
  height?: string | number;
}
export default function ExpenseDataTable({ height }: IExpenseDataTableProps) {
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

  // Sample rows for demonstration
  const rows = [
    { id: 1, date: "2024-10-01", category: "Groceries", amount: 54.75 },
    { id: 2, date: "2024-09-30", category: "Utilities", amount: 120.0 },
    { id: 3, date: "2024-09-28", category: "Transport", amount: 15.5 },
    { id: 4, date: "2024-09-25", category: "Entertainment", amount: 45.0 },
    { id: 5, date: "2024-09-20", category: "Dining", amount: 30.25 },
    { id: 6, date: "2024-09-15", category: "Shopping", amount: 200.0 },
    { id: 7, date: "2024-09-10", category: "Health", amount: 75.0 },
    { id: 8, date: "2024-09-05", category: "Miscellaneous", amount: 20.0 },
    { id: 9, date: "2024-09-01", category: "Rent", amount: 1500.0 },
  ];

  // Pagination model
  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: height ? height : 300, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
