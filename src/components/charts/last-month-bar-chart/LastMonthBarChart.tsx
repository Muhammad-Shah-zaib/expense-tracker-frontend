import { motion } from "framer-motion";
import { useRef, useState } from "react";
import DialogBarChart from "./DialogBarChart.tsx";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../store/store.ts";

const LastMonthBarChart = () => {
  const { lastMonthWeeklyCreditData } = useAppSelector(
    (state) => state.graphSlice.lastMonthReport
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const btnRef = useRef<HTMLButtonElement>(null);
  const ClickBtn = (btnRef: React.RefObject<HTMLButtonElement>) => {
    const btnElement = btnRef.current;
    if (btnElement) btnElement.click();
  };

  const TOTAL_SPENDING_LAST_MONTH: number = lastMonthWeeklyCreditData.reduce(
    (acc: number, curr: number) => {
      return acc + curr;
    },
    0
  );
  return (
    <div className={`flex flex-col p-2 gap-4 w-full bg-primary rounded-lg`}>
      <div className={`flex flex-col gap-2 border-b border-primary-500 pb-2`}>
        <span className={`text-sm font-bold font-mulish text-primary-400`}>
          Spent last month
        </span>
        <span className={`font-playpen font-bold text-tertiary text-sm`}>
          Rs. {TOTAL_SPENDING_LAST_MONTH}
        </span>
      </div>
      <div
        className={`relative w-full h-full flex items-center justify-center  overflow-none py-8`}
      >
        <div className={`absolute w-full h-full blur-lg bg-primary-900`}></div>
        <motion.div
          onClick={() => ClickBtn(btnRef)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`z-20 w-full h-full flex items-center justify-center text-center cursor-pointer bg-transparent absolute inset-0`}
        >
          <Button ref={btnRef} variant={"text"} onClick={handleDialogOpen}>
            View Bar Graph
          </Button>
        </motion.div>
        <DialogBarChart open={dialogOpen} handleClose={handleDialogClose} />
      </div>
    </div>
  );
};

export default LastMonthBarChart;
