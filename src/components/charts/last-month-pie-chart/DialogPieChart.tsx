import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { PieChart } from "@mui/x-charts";

interface IData {
  label: string;
  value: number;
  id: number;
}

interface IDialogPieChartProps {
  open: boolean;
  handleClose: () => void;
  data: IData[];
}

const DialogPieChart = ({ open, handleClose, data }: IDialogPieChartProps) => {
  const total = data.reduce((acc: number, item: IData) => acc + item.value, 0);
  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

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
          <div className={`w-full h-full overflow-hidden`}>
            <PieChart
              width={550}
              height={500}
              series={[
                {
                  data,
                  arcLabel: (item) =>
                    `${((item.value / total) * 100).toFixed(0)}%`,
                  outerRadius: 150,
                  cornerRadius: 3,
                  cx: 200,
                  cy: 250,
                },
              ]}
              colors={COLORS}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogPieChart;
