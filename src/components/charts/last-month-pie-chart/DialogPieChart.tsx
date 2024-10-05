import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PieChart } from "@mui/x-charts";
import { useMediaQuery } from "react-responsive";

interface IData {
  label: string;
  value: number;
  color: string;
  id: number;
}

interface IDialogPieChartProps {
  open: boolean;
  handleClose: () => void;
  data: IData[];
}

const Legend = ({ data }: { data: IData[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3">
      {data.map((item) => (
        <Box key={item.id} display="flex" mx={1}>
          <Box
            width={10}
            height={10}
            bgcolor={item.color}
            mr={1}
          />
          <span className={`text-sm`}>{item.label}</span>
        </Box>
      ))}
    </div>
  );
};

const DialogPieChart = ({ open, handleClose, data }: IDialogPieChartProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const total = data.reduce((acc: number, item: IData) => acc + item.value, 0);
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  // Assign colors to the data
  const coloredData = data.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length], // Cycle through colors if there are more data points than colors
  }));

  return (
    <Dialog maxWidth={"sm"} fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Total Spending Last Month
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>
          {/* Render the legend above the pie chart */}
          <div className={`w-full h-full overflow-hidden`}>
            <PieChart
            legend={{
                direction: "row",
                  position: {horizontal: "middle", vertical: "top"},
            }}
              width={isMobile ? 250: 500}
              height={350}
              series={[
                {
                  data: coloredData,
                  arcLabel: (item) =>
                    `${((item.value / total) * 100).toFixed(0)}%`,
                  outerRadius: isMobile ? 100 : 130,
                  cornerRadius: 3,
                  cx: isMobile ? 130 : 250, // Adjust the center X position
                  cy: 200, // Keep the center Y position
                },
              ]}
              colors={coloredData.map(item => item.color)} // Use the colors from the coloredData
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPieChart;
