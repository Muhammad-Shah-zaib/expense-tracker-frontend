import { bindActionCreators } from "@reduxjs/toolkit";
import { connect } from "react-redux";
import { useEffect } from "react";
import CurrentWeekBarChart from "../components/charts/current-week-bar-chart/CurrentWeekBarChart";
import { fetchLastSevenDaysData } from "../store/graph/graphApi";
import { IChartData } from "../store/graph/types";
import { RootState, AppDispatch } from "../store/store";

/**
 * Maps the required state from the Redux store to component props.
 */
const mapStateToProps = (state: RootState) => ({
  lastSevenDaysData: state.graphSlice.lastSevenDays, // Graph data for the last seven days
  loading: state.graphSlice.loading, // Loading state for the graph data
  userId: state.userSlice.userId, // Current user's ID
});

/**
 * Maps the required dispatch actions to component props.
 */
const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators(
    {
      fetchLastSevenDaysData, // Thunk action for fetching graph data
    },
    dispatch
  );

/**
 * Props for the CurrentWeekBarChartContainer component.
 */
interface ICurrentWeekBarChartContainerProps {
  lastSevenDaysData: IChartData; // Chart data for the last seven days
  loading: boolean; // Loading state
  userId: number; // Current user's ID
  fetchLastSevenDaysData: typeof fetchLastSevenDaysData; // Function to fetch last seven days' data
}

/**
 * Container component for the CurrentWeekBarChart.
 * It fetches the required data on component mount and passes it to the chart component.
 */
const CurrentWeekBarChartContainer = ({
  lastSevenDaysData,
  loading,
  userId,
  fetchLastSevenDaysData,
}: ICurrentWeekBarChartContainerProps) => {
  useEffect(() => {
    // Fetch data for the last seven days when the component mounts or userId changes
    fetchLastSevenDaysData({ userId });
  }, [userId, fetchLastSevenDaysData]);

  // Prepare chart data to pass to the CurrentWeekBarChart component
  const chartData = {
    xAxisLabels: lastSevenDaysData.xAxisLabels,
    yAxisLabel: lastSevenDaysData.yAxisLabel,
    creditData: lastSevenDaysData.creditData,
    debitData: lastSevenDaysData.debitData,
  };

  // Render the chart component with the prepared data and loading state
  return <CurrentWeekBarChart chartData={chartData} loading={loading} />;
};

// Connect the container component to the Redux store
const ConnectedCurrentWeekBarChartContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentWeekBarChartContainer);

export default ConnectedCurrentWeekBarChartContainer;
