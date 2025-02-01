import { IResponse } from "../types";

export interface IChartData {
  xAxisLabels: string[]; // Labels for X-axis (e.g., ["Mon", "Tue"])
  yAxisLabel: string; // Label for Y-axis (e.g., "Budget Last Seven Days")
  creditData: number[]; // Data for "Credit" series
  debitData: number[]; // Data for "Debit" series
}
export interface ILastMonthReport {
  lastMonthWeeklyCreditData: number[];
  lastMonthWeeklyDebitData: number[];
  xAxisLabels: string[];
  yAxisLabel: string;
}
// Graph slice state
export interface IGraphState {
  lastMonthReport: ILastMonthReport;
  lastSevenDays: IChartData; // Data for the last seven days
  loading: boolean; // To track data fetch state
  message: string | null;
  error: string | null; // To track errors during API calls
}

export interface IFetchLastMonthCreditDebitDataResponseDto extends IResponse {
  weeklyCreditData: number[];
  weeklyDebitData: number[];
}
export interface IFetchLastMonthCreditDebitDataRequestDto {
  userId: number;
}
// Request DTO for fetching data
export interface IGetGraphDataRequestDto {
  userId: number;
}

// Response DTO for fetching data
export interface IGetGraphDataResponseDto extends IResponse {
  creditData: number[];
  debitData: number[];
}
