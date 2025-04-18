import { createSlice } from "@reduxjs/toolkit";
import { IGraphState } from "./types";
import {
  fetchLastSevenDaysData,
  fetchLastMonthCreditDebitData,
  fetchPreviousFiveMonthData,
  fetchLastMonthCategoryWiseData,
  fetchCustomSummary,
} from "./graphApi";

// Initial state for the graph slice
const initialState: IGraphState = {
  lastMonthReport: {
    lastMonthWeeklyCreditData: [],
    lastMonthWeeklyDebitData: [],
    xAxisLabels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    yAxisLabel: "Budget Last Seven Days",
  },
  lastSevenDays: {
    xAxisLabels: ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"],
    yAxisLabel: "Budget Last Seven Days",
    creditData: [],
    debitData: [],
  },
  previousFiveMonthsReport: {
    xAxisLabels: [],
    creditData: [],
    debitData: [],
  },
  lastMonthCategoryWiseData: [],
  customSummary: {
    creditData: [],
    debitData: [],
    yAxisLabels: [],
  },
  loading: false,
  message: null,
  error: null,
};

// Graph slice
const graphSlice = createSlice({
  name: "graph",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle pending state for fetching last seven days data
    builder.addCase(fetchLastSevenDaysData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Handle fulfilled state for fetching last seven days data
    builder.addCase(fetchLastSevenDaysData.fulfilled, (state, action) => {
      state.loading = false;
      state.lastSevenDays.creditData = action.payload.creditData;
      state.lastSevenDays.debitData = action.payload.debitData;
      state.message = "Data fetched successfully";
    });
    // Handle rejected state for fetching last seven days data
    builder.addCase(fetchLastSevenDaysData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Handle pending state for fetching last month credit and debit data
    builder.addCase(fetchLastMonthCreditDebitData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Handle fulfilled state for fetching last month credit and debit data
    builder.addCase(
      fetchLastMonthCreditDebitData.fulfilled,
      (state, action) => {
        state.loading = false;
        state.lastMonthReport.lastMonthWeeklyCreditData =
          action.payload.weeklyCreditData;
        state.lastMonthReport.lastMonthWeeklyDebitData =
          action.payload.weeklyDebitData;
        state.message = "Last month data fetched successfully";
      }
    );
    // Handle rejected state for fetching last month credit and debit data
    builder.addCase(fetchLastMonthCreditDebitData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Handle pending state for fetching previous five months data
    builder.addCase(fetchPreviousFiveMonthData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Handle fulfilled state for fetching previous five months data
    builder.addCase(fetchPreviousFiveMonthData.fulfilled, (state, action) => {
      state.loading = false;
      state.previousFiveMonthsReport.xAxisLabels = action.payload.xAxisLabels;
      state.previousFiveMonthsReport.creditData = action.payload.creditData;
      state.previousFiveMonthsReport.debitData = action.payload.debitData;
      state.message = "Previous five months data fetched successfully";
    });
    // Handle rejected state for fetching previous five months data
    builder.addCase(fetchPreviousFiveMonthData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    // Handle pending state for fetching last month category-wise data
    builder.addCase(fetchLastMonthCategoryWiseData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Handle fulfilled state for fetching last month category-wise data
    builder.addCase(
      fetchLastMonthCategoryWiseData.fulfilled,
      (state, action) => {
        state.loading = false;
        state.lastMonthCategoryWiseData = action.payload.data.map((item) => ({
          category: item.category, // Ensure this matches the API response
          totalAmount: item.totalAmount,
        }));
        state.message =
          "Last month category-wise spending data fetched successfully";
      }
    );
    // Handle rejected state for fetching last month category-wise data
    builder.addCase(
      fetchLastMonthCategoryWiseData.rejected,
      (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
    );
    builder.addCase(fetchCustomSummary.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCustomSummary.fulfilled, (state, action) => {
      state.loading = false;
      state.customSummary.creditData = action.payload.creditData;
      state.customSummary.debitData = action.payload.debitData;
      state.customSummary.yAxisLabels = action.payload.yAxisLabels;
      state.message = action.payload.message;
    });
    builder.addCase(fetchCustomSummary.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default graphSlice.reducer;
