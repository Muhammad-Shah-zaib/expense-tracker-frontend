import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axisClasses, BarChart } from "@mui/x-charts";

interface IDialogDebitChartProps {
  open: boolean;
  handleClose: () => void;
}

const DialogDebitChart: React.FC<IDialogDebitChartProps> = ({
  open,
  handleClose,
}) => {
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
                data: ["Week 1", "Week 2", "Week 3", "Week 4"],
              },
            ]}
            yAxis={[{ label: "Debits" }]}
            sx={[
              {
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                  transform: "translate(-25px, 0)",
                },
              },
            ]}
            series={[{ data: [500, 0, 700, 240], label: "Debits" }]} // Adjust data as needed
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDebitChart;
