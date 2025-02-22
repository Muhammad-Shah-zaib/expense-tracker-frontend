import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import CustomGraph from "./CustomGraph";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { fetchCustomSummary } from "../../../store/graph/graphApi";
import { IGraphData } from "../../../interfaces/IGraphData";

type GraphType = "bar" | "line" | "pie";
type IntervalType = "day" | "week" | "month";
type DataType = "credit" | "debit" | "net";

interface DialogCustomGraphProps {
  open: boolean;
  onClose: () => void;
}

const DialogCustomGraph: React.FC<DialogCustomGraphProps> = ({
  open,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userSlice.userId);
  const { customSummary, loading, error } = useAppSelector(
    (state) => state.graphSlice
  );

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [graphType, setGraphType] = useState<GraphType>("bar");
  const [interval, setInterval] = useState<IntervalType>("day");
  const [dataType, setDataType] = useState<DataType>("net");
  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState<IGraphData>({
    labels: [],
    values: [],
    interval: interval,
    graphColor: "blue",
  });

  // Define color based on transaction type
  const getGraphColor = (type: DataType) => {
    switch (type) {
      case "credit":
        return "#4CAF50"; // Green for positive transactions
      case "debit":
        return "#F44336"; // Red for negative transactions
      case "net":
        return "#2196F3"; // Blue for balance
      default:
        return "#607D8B"; // Grey fallback
    }
  };

  // Handle API response update
  useEffect(() => {
    if (
      customSummary.creditData.length > 0 ||
      customSummary.debitData.length > 0
    ) {
      let values: number[] = [];
      if (dataType === "credit") {
        values = customSummary.creditData;
      } else if (dataType === "debit") {
        values = customSummary.debitData;
      } else {
        values = customSummary.creditData.map(
          (credit, index) => credit - customSummary.debitData[index]
        );
      }

      setGraphData((old) => ({
        ...old,
        labels: customSummary.yAxisLabels,
        values,
        interval: interval + " wise",
        graphColor: getGraphColor(dataType), // Dynamically setting color
      }));
      setShowGraph(true);
    }
  }, [customSummary, dataType]);

  const handleGenerateGraph = () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    const formattedStartDate = startDate.format("YYYY-MM-DD");
    const formattedEndDate = endDate.format("YYYY-MM-DD");

    dispatch(
      fetchCustomSummary({
        userId,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        interval,
      })
    );
    setShowGraph(true);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Select Graph Options</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex justify-between gap-4">
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              slotProps={{ textField: { fullWidth: true } }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              slotProps={{ textField: { fullWidth: true } }}
            />
          </div>
          <TextField
            select
            label="Graph Type"
            value={graphType}
            onChange={(e) => setGraphType(e.target.value as GraphType)}
            fullWidth
          >
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="line">Line Chart</MenuItem>
            <MenuItem value="pie">Pie Chart</MenuItem>
          </TextField>
          <TextField
            select
            label="Interval"
            value={interval}
            onChange={(e) => setInterval(e.target.value as IntervalType)}
            fullWidth
          >
            <MenuItem value="day">Daily</MenuItem>
            <MenuItem value="week">Weekly</MenuItem>
            <MenuItem value="month">Monthly</MenuItem>
          </TextField>
          <TextField
            select
            label="Data Type"
            value={dataType}
            onChange={(e) => setDataType(e.target.value as DataType)}
            fullWidth
          >
            <MenuItem value="credit">Credit</MenuItem>
            <MenuItem value="debit">Debit</MenuItem>
            <MenuItem value="net">Net (Credit - Debit)</MenuItem>
          </TextField>
          {loading && <CircularProgress className="mx-auto" />}
          {error && <p className="text-red-500">{error}</p>}
          {showGraph && <CustomGraph type={graphType} data={graphData} />}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleGenerateGraph}
          color="primary"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Graph"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCustomGraph;
