import { useState } from "react";
import { Button, IconButton } from "@mui/material";
import AtmCard from "../../shared/cards/AtmCard";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ManageCardsDialog from "./ManageCardsDialog";
import AddCardFormDialog from "../Forms/AddCardFormDialog.tsx";
import ICardDetails from "../../interfaces/ICardDetails.ts";
import { useAppDispatch, useAppSelector } from "../../store/store.ts";
import {
  addCard,
  changeQuickMenuCard,
  editCard,
  removeCard,
} from "../../store/cards/cardSlice.ts";

const AtmCards = () => {
  const dispatch = useAppDispatch();
  const [openManageCardsDialog, setManageCardsDialog] = useState(false);
  const [openAddCardDialog, setAddCardDialog] = useState(false); // state for AddCardFormDialog
  const cards = useAppSelector((state) => state.cardSlice.cards);

  const handleAddCardSubmit = (data: ICardDetails) => {
    dispatch(addCard({ card: data }));
    setAddCardDialog(false); // Close the dialog after submission
  };

  const onEditCard = (cardNumber: string, updatedCard: ICardDetails) => {
    // edit the card
    dispatch(editCard({ cardNumber, updatedCard }));
  };
  return (
    <div className={`flex flex-col gap-4 px-1 md:px-4 w-full`}>
      <div
        className={`w-full border-b-2 border-primary flex items-center justify-between`}
      >
        <div className={`font-medium text-xl`}>ATM Cards</div>
        <div>
          <IconButton
            id={"ADD-ATM-CARD"}
            onClick={() => setAddCardDialog(true)}
          >
            {" "}
            {/* Open AddCardFormDialog */}
            <LibraryAddIcon className="text-tertiary" />
          </IconButton>
        </div>
      </div>
      <div
        className={`w-full flex flex-col md:px-0 px-2 md:items-center gap-8 h-[77vh] overflow-auto`}
      >
        <div className={`grid md:grid-cols-2 gap-4 lg:w-[700px]`}>
          {cards.map((card, index) => (
            <div onClick={() => dispatch(changeQuickMenuCard({ card }))}>
              <AtmCard
                key={index}
                holderName={card.holderName}
                companyName={card.companyName}
                cardType={card.cardType}
                balance={card.balance}
                cardNumber={card.cardNumber}
              />
            </div>
          ))}
        </div>
        <div className={`w-full flex justify-end max-w-[700px]`}>
          <div className="space-x-2">
            <Button
              size="large"
              variant="outlined"
              onClick={() => setManageCardsDialog(true)}
            >
              View transactions
            </Button>
            <Button
              size="large"
              variant="contained"
              onClick={() => setManageCardsDialog(true)}
            >
              Manage Cards
            </Button>
          </div>
        </div>
      </div>

      {/* AddCardFormDialog for adding a new card */}
      <AddCardFormDialog
        open={openAddCardDialog}
        onClose={() => setAddCardDialog(false)}
        onSubmit={handleAddCardSubmit}
      />

      {/* ManageCardsDialog for managing existing cards */}
      <ManageCardsDialog
        onRemoveCard={(cardNumber) => dispatch(removeCard({ cardNumber }))}
        onEditCard={onEditCard}
        handleAddCardBtn={() => setAddCardDialog(true)}
        open={openManageCardsDialog}
        onClose={() => setManageCardsDialog(false)}
      />
    </div>
  );
};

export default AtmCards;
