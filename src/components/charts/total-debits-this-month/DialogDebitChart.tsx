import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axisClasses, BarChart } from "@mui/x-charts";
import { useAppSelector } from "../../../store/store";

interface IDialogDebitChartProps {
  open: boolean;
  handleClose: () => void;
}

const DialogDebitChart: React.FC<IDialogDebitChartProps> = ({
  open,
  handleClose,
}) => {
  const { lastMonthWeeklyDebitData, xAxisLabels, yAxisLabel } = useAppSelector(
    (state) => state.graphSlice.lastMonthReport
  );

  return (
    <Dialog maxWidth={"sm"} fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Received Last Month</DialogTitle>
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
        <div className={`w-full h-full flex justify-center`}>
          <BarChart
            colors={["#10b981"]}
            width={400}
            height={400}
            xAxis={[
              {
                scaleType: "band",
                data: xAxisLabels,
              },
            ]}
            yAxis={[{ label: yAxisLabel }]}
            sx={[
              {
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                  transform: "translate(-25px, 0)",
                },
              },
            ]}
            series={[{ data: lastMonthWeeklyDebitData, label: "Debits" }]} // Adjust data as needed
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDebitChart;
