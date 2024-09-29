import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axisClasses, LineChart } from "@mui/x-charts";

interface IDialogSpendingTrendChartProps {
  open: boolean;
  handleClose: () => void;
}

const DialogSpendingTrendChart: React.FC<IDialogSpendingTrendChartProps> = ({
  open,
  handleClose,
}) => {
  // Hypothetical spending data for the last 7 months
  const spendingData = [12300, 11400, 15000, 14500, 14260, 18900, 16300];

  // Month labels for the previous 7 months
  const months = [
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
  ];

  // Calculate percentage change compared to the previous month
  const currentMonthSpending = spendingData[spendingData.length - 1];
  const previousMonthSpending = spendingData[spendingData.length - 2];
  const percentageChange =
    ((currentMonthSpending - previousMonthSpending) / previousMonthSpending) *
    100;

  return (
    <Dialog maxWidth={"sm"} fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Spending Trend{" "}
        <em className={`text-xs px-2 text-zinc-400`}>(Last 7 Months)</em>
      </DialogTitle>
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
      <DialogContent>
        <div className="flex flex-col items-center">
          <div
            className={`mb-4 text-lg font-playpen font-bold ${percentageChange < 0 ? "text-emerald-500" : "text-rose-500"}`}
          >
            Spending Trend: {percentageChange.toFixed(2)}%
          </div>
          <div className="w-full h-full flex justify-center">
            <LineChart
              width={400}
              height={400}
              xAxis={[
                {
                  scaleType: "band",
                  data: months,
                },
              ]}
              yAxis={[{ label: "Total Spending ($)" }]}
              sx={[
                {
                  [`.${axisClasses.left} .${axisClasses.label}`]: {
                    transform: "translate(-25px, 0)",
                  },
                },
              ]}
              series={[{ data: spendingData, label: "Spending" }]}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSpendingTrendChart;
