import React, { useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ITransactions from "../../interfaces/ITransactions";
import {
  addTransaction,
  changeSelectedTransaction,
  deleteTransaction,
  markTransaction,
  updateTransaction,
} from "../../store/transactions/transactionSlice.ts";
import EditTransactionFormDialog from "../Forms/EditTransactionFormDialog";
import { fetchTransactionById } from "../../store/transactions/transactionApi.ts";
import CircularSpinner from "../../shared/components/CIrcularSpinner/CircularSpinner.tsx";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../store/store.ts";

export interface ITransactionsProps {
  transactions: ITransactions[];
  loading: boolean;
  selectedTransaction: ITransactions | null;
  markTransaction: typeof markTransaction;
  deleteTransaction: typeof deleteTransaction;
  addTransaction: typeof addTransaction;
  updateTransaction: typeof updateTransaction;
  changeSelectedTransaction: typeof changeSelectedTransaction;
  fetchTransactionById: typeof fetchTransactionById;
}

const Transactions: React.FC<ITransactionsProps> = ({
  transactions,
  changeSelectedTransaction,
  selectedTransaction,
  deleteTransaction,
  markTransaction,
  updateTransaction,
  fetchTransactionById,
  loading,
}) => {
  const userId: number = useAppSelector((state) => state.userSlice.userId);
  useEffect(() => {
    if (userId && userId != -1)
      fetchTransactionById({ id: userId });
  }, [userId]);

  const [lastSelectedTransaction, setLastSelectedTransaction] =
    useState<ITransactions>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    transaction: ITransactions,
  ) => {
    setAnchorEl(event.currentTarget);
    changeSelectedTransaction({ transaction });
    setLastSelectedTransaction(transaction);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    changeSelectedTransaction({ transaction: null });
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleUpdate = (newTransaction: ITransactions) => {
    updateTransaction({ newTransaction });
    closeDialog();
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  let currentTransactions = transactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  if (loading) {
    return (
      <div className={`w-full relative h-full`}>
        <CircularSpinner size={40} color={`primary`} />
      </div>
    );
  }

  return (
    <div>
      <TableContainer className="max-h-[70vh] lg:max-h-[75vh] overflow-auto">
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Transaction Type</TableCell>
              <TableCell>Purpose</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Card Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTransactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                className="hover:bg-primary-700 transition-colors duration-200"
              >
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.purpose}</TableCell>
                <TableCell
                  className={transaction.type === "debit" ? "debit" : "credit"}
                >
                  {transaction.type === "debit"
                    ? `+${transaction.amount}`
                    : `-${transaction.amount}`}
                </TableCell>
                <TableCell>{transaction.date as string}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell style={{ width: 150 }}>
                  <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
                    {transaction.cardNumber}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="action-button">
                    <IconButton
                      onClick={(event) => handleMenuClick(event, transaction)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={
                        Boolean(anchorEl) && selectedTransaction === transaction
                      }
                      onClose={handleMenuClose}
                    >
                      <MenuItem
                        onClick={() => {
                          deleteTransaction({
                            transactionId: selectedTransaction!.id,
                          });
                          handleMenuClose();
                        }}
                      >
                        Remove
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          markTransaction({
                            transactionId: selectedTransaction!.id,
                          });
                          handleMenuClose();
                        }}
                      >
                        Mark
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          openDialog();
                          handleMenuClose();
                        }}
                      >
                        Edit
                      </MenuItem>
                    </Menu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={transactions.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(_, p) => handleChangePage(p)}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <EditTransactionFormDialog
        selectedTransaction={{
          ...lastSelectedTransaction!,
        }}
        open={isDialogOpen}
        onClose={closeDialog}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default Transactions;
