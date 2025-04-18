import ITransactions from "../../interfaces/ITransactions.ts";
import { IResponse } from "../types.ts";

export type TSnackBarSeverity = "error" | "info" | "success" | "warning";

export interface ITransactionState {
  transactions: ITransactions[];
  markedTransactions: ITransactions[];
  selectedTransaction: ITransactions | null;
  loading: boolean;
  addTransactionLoading: boolean;
  transactionWithDateLoading: boolean;
  transactionWIthDateDate: ITransactions[];
  creditsCount: number | null;
  creditsAmount: number | null;
  creditsSummaryLoading: boolean;
  deleteTransactionLoading: boolean;
  snackbar: {
    open: boolean;
    message: string;
    severity: "error" | "info" | "success" | "warning";
  };
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

export interface IAddTransactionRequestDto extends ITransactions {
  userId: number;
}
export interface IAddTransactionResponseDto extends IResponse {
  transaction: ITransactions;
}

export interface IMarkTransactionResponseDto extends IResponse {
  success: boolean;
}

export interface IMarkTransactionRequestDto {
  userId: number;
  transactionId: number;
}

export interface IFetchTRansactionWithDateRequestDto {
  userId: number;
  startDate: string;
  endDate: string;
}

export interface IFetchTRansactionWithDateResponseDto extends IResponse {
  dayWiseTransactions: ITransactions[];
}

export interface IFetchCreditsSummaryRequestDto {
  userId: number;
  creditReportType: string; // "overall" or "this-month"
}

export interface IFetchCreditsSummaryResponseDto extends IResponse {
  creditsAmount: number;
  creditsCount: number;
}

export interface IDeleteTransactionRequestDto {
  userId: number;
  transactionId: number;
}
export interface IUpdateTransactionRequestDto {
  userId: number;
  transaction: ITransactions;
}
export interface IUpdateTransactionResponseDto extends IResponse {
  transaction: ITransactions;
}

export interface IDeleteTransactionResponseDto extends IResponse {}
