export interface IChartData {
  xAxisLabels: string[]; // Labels for X-axis (e.g., ["Mon", "Tue"])
  yAxisLabel: string; // Label for Y-axis (e.g., "Budget Last Seven Days")
  creditData: number[]; // Data for "Credit" series
  debitData: number[]; // Data for "Debit" series
}

export interface IGraphState {
  lastSevenDays: IChartData; // Data for the last seven days
  loading: boolean; // To track data fetch state
  message: string | null;
  error: string | null; // To track errors during API calls
}

// Request DTO for fetching data
export interface IGetGraphDataRequestDto {
  userId: number;
}

// Response DTO for fetching data
export interface IGetGraphDataResponseDto {
  creditData: number[];
  debitData: number[];
}