import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import DialogSpendingTrendChart from "./DialogSpendingTrendChart.tsx";
import { useAppSelector } from "../../../store/store.ts";

const SpendingTrend = () => {
  const chartData = useAppSelector(
    (state) => state.graphSlice.previousFiveMonthsReport
  );
  // Calculate percentage change compared to the previous month
  const currentMonthSpending =
    chartData.debitData[chartData.debitData.length - 1];
  const previousMonthSpending =
    chartData.debitData[chartData.debitData.length - 2];
  const percentageChange =
    ((currentMonthSpending - previousMonthSpending) / previousMonthSpending) *
    100 || 0;

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const SPENDING_TREND = percentageChange.toFixed(2);

  const ClickBtn = (ref: React.RefObject<HTMLButtonElement>) => {
    if (ref.current) ref.current.click();
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <div className={`flex flex-col p-2 gap-4 w-full bg-primary rounded-lg`}>
      <div className={`flex flex-col gap-2 border-b border-primary-500 pb-2`}>
        <span className={`text-sm font-bold font-mulish text-primary-400`}>
          Spending Trend
        </span>
        <span className={`font-playpen font-bold ${percentageChange >= 0 ? "text-rose-500": "text-green-500"}  text-sm`}>
          <span className={`${percentageChange >= 0 ? "inline" : "hidden"}`}>+</span>
          
          {SPENDING_TREND}%
        </span>
      </div>
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-none py-8`}
      >
        <div className={`absolute w-full h-full blur-lg bg-primary-900`}></div>
        <motion.div
          onClick={() => ClickBtn(btnRef)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`z-20 flex items-center justify-center w-full h-full text-center cursor-pointer bg-transparent absolute inset-0`}
        >
          <Button onClick={handleDialogOpen} ref={btnRef} variant={"text"}>
            View Line Graph
          </Button>
        </motion.div>
        <DialogSpendingTrendChart
          {...{ open: dialogOpen, handleClose: handleDialogClose, SPENDING_TREND, chartData, PERCENTAGE_CHANGE: percentageChange }}
        />
      </div>
    </div>
  );
};

export default SpendingTrend;
