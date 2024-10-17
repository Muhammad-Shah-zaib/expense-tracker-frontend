import React, { useState } from "react";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ICardDetails from "../../interfaces/ICardDetails.ts";
import EditCardFormDialog from "../Forms/EditCardFormDIalog.tsx";
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import { changeCardToEdit } from "../../store/cards/cardSlice.ts";

interface ManageCardsDialogProps {
  open: boolean;
  onClose: () => void;
  handleAddCardBtn: () => void;
  onEditCard: (cardNumber: string, card: ICardDetails) => void;
  onRemoveCard: (cardNumber: string) => void;
}

const ManageCardsDialog: React.FC<ManageCardsDialogProps> = ({
  open,
  onClose,
  handleAddCardBtn,
  onEditCard,
  onRemoveCard,
}) => {
  const dispatch = useAppDispatch();
  const [editCardDialogOpen, setEditCardDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { cards } = useAppSelector((state) => state.cardSlice);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    card: ICardDetails,
  ) => {
    setAnchorEl(event.currentTarget);
    dispatch(changeCardToEdit({ card }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action: string) => {
    handleClose();
    if (action === "REMOVE_CARD" && anchorEl) {
      const card = cards.find(
        (c) => c.cardNumber === anchorEl.dataset.cardNumber,
      );
      if (card) {
        onRemoveCard(card.cardNumber);
      }
    } else if (action === "EDIT_CARD") {
      setEditCardDialogOpen(true);
    }
  };

  const handleEditCardSubmit = (updatedCard: ICardDetails) => {
    onEditCard(updatedCard.cardNumber, updatedCard);
    setEditCardDialogOpen(false);
  };

  return (
    <>
      <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
        <DialogTitle>
          <div className={`flex justify-between`}>
            <span>Manage Cards</span>
            <IconButton
              onClick={() => {
                onClose();
                setTimeout(() => {
                  handleAddCardBtn();
                }, 0);
              }}
            >
              <LibraryAddIcon className="text-tertiary" />
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow className="bg-primary-900">
                  <TableCell>Holder Name</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Card Type</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Card Number</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cards.map((card, index) => (
                  <TableRow
                    key={card.cardNumber}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "#18181b" : "#27272a",
                    }}
                  >
                    <TableCell>{card.holderName}</TableCell>
                    <TableCell>{card.companyName}</TableCell>
                    <TableCell>{card.cardType}</TableCell>
                    <TableCell>{card.balance}</TableCell>
                    <TableCell>{card.cardNumber}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        className="font-bold font-mono text-xl shadow-xl shadow-primary-900"
                        onClick={(event) => handleClick(event, card)}
                        data-card-number={card.cardNumber}
                      >
                        ...
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        <MenuItem
                          onClick={() => handleMenuItemClick("EDIT_CARD")}
                        >
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleMenuItemClick("REMOVE_CARD")}
                        >
                          Remove
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handleMenuItemClick("VIEW_TRANSACTIONS")
                          }
                        >
                          View Transactions
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions className="pr-6 pb-6">
          <Button size="large" onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Card Form Dialog */}
      <EditCardFormDialog
        open={editCardDialogOpen}
        onClose={() => setEditCardDialogOpen(false)}
        onSubmit={handleEditCardSubmit}
      />
    </>
  );
};

export default ManageCardsDialog;
