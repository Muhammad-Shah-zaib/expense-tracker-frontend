import React, { useState } from "react";
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
import transactions from "../../dummy-data/transactions";

const Transactions: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedTransaction, setSelectedTransaction] =
    useState<null | ITransactions>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    transaction: ITransactions,
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTransaction(transaction);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTransaction(null);
  };

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to the first page when changing rows per page
  };

  // Calculate the current transactions to display
  const currentTransactions = transactions.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <div>
      <TableContainer className={`max-h-[70vh] lg:max-h-[75vh] overflow-auto`}>
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
                <TableCell>{transaction.transactionType}</TableCell>
                <TableCell>{transaction.purpose}</TableCell>
                <TableCell
                  className={
                    transaction.transactionType === "debit" ? "debit" : "credit"
                  }
                >
                  {transaction.transactionType === "debit"
                    ? `+${transaction.amount}`
                    : `-${transaction.amount}`}
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell style={{ width: 150 }}>
                  {" "}
                  {/* Fixed width for card number */}
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
                      <MenuItem onClick={handleMenuClose}>Remove</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Mark</MenuItem>
                      <MenuItem onClick={handleMenuClose}>Update</MenuItem>
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
    </div>
  );
};

export default Transactions;
