import { createSlice } from "@reduxjs/toolkit";
import { IGraphState } from "./types";
import { fetchLastSevenDaysData } from "./graphApi";

// Initial state for the graph slice
const initialState: IGraphState = {
  lastSevenDays: {
    xAxisLabels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    yAxisLabel: "Budget Last Seven Days",
    creditData: [],
    debitData: [],
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
    builder
      .addCase(fetchLastSevenDaysData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLastSevenDaysData.fulfilled, (state, action) => {
        state.loading = false;
        state.lastSevenDays.creditData = action.payload.creditData;
        state.lastSevenDays.debitData = action.payload.debitData;
        state.message = "Data fetched successfully";
      })
      .addCase(fetchLastSevenDaysData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default graphSlice.reducer;
