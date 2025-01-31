import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { axisClasses, BarChart } from "@mui/x-charts";

interface IDialogBarChartPropts {
  open: boolean;
  handleClose: () => void;
}
const DialogBarChart: React.FC<IDialogBarChartPropts> = ({
  open,
  handleClose,
}) => {
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
        <div className={`w-full h-full flex justify-center`}>
          <BarChart
            width={400}
            height={400}
            xAxis={[
              {
                scaleType: "band",
                data: ["Week 1", "Week 2", "Week 3", "Week 4"],
              },
            ]}
            yAxis={[{ label: "Credits" }]}
            sx={[
              {
                [`.${axisClasses.left} .${axisClasses.label}`]: {
                  transform: "translate(-25px, 0)",
                },
              },
            ]}
            series={[{ data: [5000, 6200, 2000, 1200], label: "Credits" }]}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBarChart;
