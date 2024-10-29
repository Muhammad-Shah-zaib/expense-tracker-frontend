import ITransactions from "../../interfaces/ITransactions.ts";
import { IResponse } from "../types.ts";

export interface ITransactionState {
  transactions: ITransactions[];
  markedTransactions: ITransactions[];
  selectedTransaction: ITransactions | null;
  loading: boolean;
}
// mark transaction DTO
export interface IMarkTransactionDto {
  transactionId: number;
}
// delete transaction DTO
export interface IDeleteTransactionDto {
  transactionId: number;
}
// add transaction DTO
export interface IAddTransactionDto {
  transaction: ITransactions;
}
// update transaction DTO
export interface IUpdateTransactionDto {
  newTransaction: ITransactions;
}

// change selected transaction
export interface IChangeSelectedTransactionDto {
  transaction: ITransactions | null;
}

// fetch transaction with userId -- api => "api/transaction/{id:int}"
export interface IFetchNotesRequestDto {
  id: number;
}
export interface IFetchNotesResponseDto extends IResponse {
  transactions: ITransactions[];
}
