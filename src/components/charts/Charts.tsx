import * as React from "react";
import CurrentWeekBarChart from "./current-week-bar-chart/CurrentWeekBarChart.tsx";
import LastMonthBarChart from "./last-month-bar-chart/LastMonthBarChart.tsx";
import DownloadTransactions from "./download-transactions/DownloadTransactions.tsx";
import TotalDebitsThisMonth from "./total-debits-this-month/TotalDebitsThisMonth.tsx";
import SpendingTrend from "./spending-trend/SpendingTrend.tsx";
import LastMonthPieChart from "./last-month-pie-chart/LastMonthPieChart.tsx";
import ExpenseDataTable from "./expense-data-table/ExpenseDataTable.tsx";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { IconButton } from "@mui/material";
import { motion } from "framer-motion";
import SlideDialogExpenseDataTable from "./expense-data-table/SlideDialogExpenseDataTable.tsx";

const Charts = () => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className={`w-full max-h-[85vh] overflow-auto`}>
      <div
        className={`flex flex-col items-center justify-center gap-4 px-8 w-full mb-8 sm:max-h-[115vh] h-md:h-[130vh]`}
      >
        <div className={`w-full flex sm:flex-row flex-col gap-4`}>
          <div className={`sm:w-[70%] h-full flex flex-col gap-4`}>
            {/* Current week chart */}
            <div
              className={`sm:w-full h-[350px] sm:h-[280px] grid sm:grid-cols-3`}
            >
              <div className={`sm:col-span-2 h-full`}>
                <CurrentWeekBarChart />
              </div>
              <div className={`hidden sm:flex items-center`}>
                <DownloadTransactions />
              </div>
            </div>
            {/* Other charts */}
            <div className={`flex sm:flex-row flex-col gap-4 w-full`}>
              <div className={`w-full`}>
                <LastMonthBarChart />
              </div>
              <div className={`w-full`}>
                <TotalDebitsThisMonth />
              </div>
              <div className={`w-full`}>
                <SpendingTrend />
              </div>
            </div>
          </div>
          {/* PIE CHART */}
          <div className={`w-full sm:w-[30%]`}>
            <LastMonthPieChart />
          </div>
        </div>
        <div
          className={`flex justify-center items-center p-2 rounded-lg w-full`}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            className={`bg-primary w-full h-full outline-none rounded-lg h-md:hidden flex justify-center items-center`}
            onClick={handleOpenDialog}
          >
            <IconButton>
              <KeyboardArrowUpIcon />
            </IconButton>
          </motion.div>
        </div>

        {/* EXPENSE DATA TABLE */}
        <div
          className={`w-full relative mb-10 h-md:block hidden h-[300px] py-2 items-center justify-center gap-8 overflow-hidden bg-primary`}
        >
          <ExpenseDataTable />
        </div>
      </div>

      {/* Dialog for displaying the table */}
      <SlideDialogExpenseDataTable
        open={openDialog}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default Charts;
