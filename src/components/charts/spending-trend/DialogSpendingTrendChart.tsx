import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axisClasses, LineChart } from "@mui/x-charts";
import { IPreviousFiveMonthsReport } from "../../../store/graph/types";

interface IDialogSpendingTrendChartProps {
  open: boolean;
  handleClose: () => void;
  SPENDING_TREND: string;
  PERCENTAGE_CHANGE: number;
  chartData: IPreviousFiveMonthsReport;
}

const DialogSpendingTrendChart: React.FC<IDialogSpendingTrendChartProps> = ({
  open,
  handleClose,
  chartData,
  SPENDING_TREND,
  PERCENTAGE_CHANGE
}) => {

  return (
    <Dialog maxWidth={"md"} fullWidth={true} open={open} onClose={handleClose}>
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
            className={`mb-4 text-lg font-playpen font-bold ${PERCENTAGE_CHANGE < 0 ? "text-emerald-500" : "text-rose-500"}`}
          >
            Spending Trend: {SPENDING_TREND}%
          </div>
          <div className="w-full h-full flex justify-center">
            <LineChart
              width={700}
              height={400}
              xAxis={[
                {
                  scaleType: "band",
                  data: chartData.xAxisLabels,
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
              series={[{ data: chartData.debitData, label: "Spending" }]}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSpendingTrendChart;
