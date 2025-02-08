import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PieChart } from "@mui/x-charts";
import { useMediaQuery } from "react-responsive";
import { ILastMonthCategoryWiseData } from "../../../store/graph/types";
import CustomLegend from "./CustomLegend";

interface IDialogPieChartProps {
  open: boolean;
  handleClose: () => void;
  data: ILastMonthCategoryWiseData[];
}

const DialogPieChart = ({ open, handleClose, data }: IDialogPieChartProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const totalAmount = data.reduce((sum, item) => sum + item.totalAmount, 0);

  const COLOR_PALETTE = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#8D44AD",
    "#00C49F",
    "#FF5B5B",
    "#2D87BB",
  ];

  // ✅ Create legend data (no filtering applied)
  const legendData = data.map((item, index) => ({
    id: item.category,
    value: item.totalAmount,
    percentage: ((item.totalAmount / totalAmount) * 100).toFixed(3),
    color: COLOR_PALETTE[index % COLOR_PALETTE.length],
  }));

  // ✅ Create Pie Chart data (filter: min 1% share)
  const pieChartData = legendData.filter(
    (item) => (item.value / totalAmount) * 100 >= 1
  );

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Total Spending Last Month
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div className="w-full h-full overflow-hidden flex flex-col items-center">
          <PieChart
            width={isMobile ? 300 : 500}
            height={300}
            series={[
              {
                data: pieChartData,
                arcLabel: (item) =>
                  `${((item.value / totalAmount) * 100).toFixed(0)}%`, // Show % in chart
                outerRadius: isMobile ? 100 : 130,
                cornerRadius: 3,
                cx: isMobile ? 130 : 250,
                cy: 130,
              },
            ]}
          />
          {/* Custom Legend Component */}
          <CustomLegend data={legendData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPieChart;
