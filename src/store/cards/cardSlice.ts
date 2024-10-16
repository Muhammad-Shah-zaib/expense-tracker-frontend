import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cards } from "../../dummy-data/cards";
import {
  IAddCardRequestDto,
  ICardState,
  IChangeCardToEditDto,
  IChangeQuickMenuCardDto,
  IEditCardRequestDto,
  IRemoveCardRequestDto,
} from "./types";

const initialState: ICardState = {
  cards,
  quickMenuCard: cards[0],
  cardToEdit: null,
};

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    // reducers realted to server requests
    addCard(state, { payload: { card } }: PayloadAction<IAddCardRequestDto>) {
      state.cards.push(card);
    },
    removeCard(
      state,
      { payload: { cardNumber } }: PayloadAction<IRemoveCardRequestDto>,
    ) {
      state.cards = state.cards.filter(
        (card) => card.cardNumber !== cardNumber,
      );
    },
    editCard(
      state,
      {
        payload: { cardNumber, updatedCard },
      }: PayloadAction<IEditCardRequestDto>,
    ) {
      const cardIndex = state.cards.findIndex(
        (card) => card.cardNumber === cardNumber,
      );
      state.cards[cardIndex] = updatedCard;
    },

    // reducers related to UI
    changeQuickMenuCard(
      state,
      { payload: { card } }: PayloadAction<IChangeQuickMenuCardDto>,
    ) {
      state.quickMenuCard = card;
    },
    changeCardToEdit(
      state,
      { payload: { card } }: PayloadAction<IChangeCardToEditDto>,
    ) {
      state.cardToEdit = card;
    },
  },
});

// exporting the reducer and actions
export default cardSlice.reducer;
export const {
  addCard,
  removeCard,
  editCard,
  changeCardToEdit,
  changeQuickMenuCard,
} = cardSlice.actions;
