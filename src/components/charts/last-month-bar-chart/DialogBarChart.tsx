import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axisClasses, BarChart } from "@mui/x-charts";
import { useAppSelector } from "../../../store/store";

interface IDialogBarChartProps {
  open: boolean;
  handleClose: () => void;
}

const DialogBarChart: React.FC<IDialogBarChartProps> = ({ open, handleClose }) => {
  // Select last month's credit data from Redux store
  const {lastMonthWeeklyCreditData, xAxisLabels, yAxisLabel} = useAppSelector((state) => state.graphSlice.lastMonthReport);

  return (
    <Dialog maxWidth={"sm"} fullWidth={true} open={open} onClose={handleClose}>
      <DialogTitle sx={{ m: 0, p: 2 }}>Spent Last Month</DialogTitle>
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
        <div className="w-full h-full flex justify-center">
          <BarChart
            width={400}
            height={400}
            xAxis={[
              {
                scaleType: "band",
                data: xAxisLabels, // Fetching labels from Redux state
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
            series={[
              {
                data: lastMonthWeeklyCreditData, // Fetching credit data only
                label: "Credits",
              },
            ]}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBarChart;
