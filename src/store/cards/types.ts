import ICardDetails from "../../interfaces/ICardDetails";

export interface ICardState {
  cards: ICardDetails[];
  quickMenuCard: ICardDetails; // current card used to display card in quick menu
  cardToEdit: ICardDetails | null; // card to be edited
}

export interface IAddCardRequestDto {
  card: ICardDetails;
}

export interface IRemoveCardRequestDto {
  cardNumber: string;
}

export interface IEditCardRequestDto {
  cardNumber: string; // cardNumber of the card to be edited
  updatedCard: ICardDetails; // Updated card details
}

// CHANGE CARD
interface IChangeCard {
  card: ICardDetails;
}

export type IChangeQuickMenuCardDto = IChangeCard;

export type IChangeCardToEditDto = IChangeCard;
