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
export interface IPreviousFiveMonthsReport {
  xAxisLabels: string[];
  creditData: number[];
  debitData: number[];
}
export interface ILastMonthCategoryWiseData {
  category: string;
  totalAmount: number;
}
export interface ICustomGraphData {
  creditData: number[];
  debitData: number[];
  yAxisLabels: string[];
};

// Updated Graph slice state
export interface IGraphState {
  lastMonthReport: ILastMonthReport;
  lastSevenDays: IChartData;
  previousFiveMonthsReport: IPreviousFiveMonthsReport;
  lastMonthCategoryWiseData: ILastMonthCategoryWiseData[];
  customSummary: ICustomGraphData;
  loading: boolean;
  message: string | null;
  error: string | null;
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

// Request DTO for fetching previous-5-months data
export interface IGetPreviousFiveMonthDataRequestDto {
  userId: number;
}

// Response DTO for fetching previous-5-months data
export interface IGetPreviousFiveMonthDataResponseDto extends IResponse {
  xAxisLabels: string[];
  creditData: number[];
  debitData: number[];
}

// Request DTO for last month category wise spending
export interface IGetLastMonthCategoryWiseSpendingRequestDto {
  userId: number;
}

// Response DTO for last month category wise spending
export interface IGetLastMonthCategoryWiseSpendingResponseDto
  extends IResponse {
  data: ILastMonthCategoryWiseData[];
}

// Define the request DTO
export interface IFetchCustomSummaryRequestDto {
  startDate: string;
  endDate: string;
  userId: number;
  interval: "day" | "week" | "month";
}

// Define the response DTO
export interface IFetchCustomSummaryResponseDto extends IResponse {
  creditData: number[];
  debitData: number[];
  yAxisLabels: string[];
}
