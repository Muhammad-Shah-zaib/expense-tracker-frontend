import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

type GraphType = "bar" | "line" | "pie";

interface DialogCustomGraphProps {
  open: boolean;
  onClose: () => void;
}

const DialogCustomGraph: React.FC<DialogCustomGraphProps> = ({ open, onClose }) => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [graphType, setGraphType] = useState<GraphType>("bar");

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
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => console.log({ startDate, endDate, graphType })}
          color="primary"
        >
          Generate Graph
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogCustomGraph;
