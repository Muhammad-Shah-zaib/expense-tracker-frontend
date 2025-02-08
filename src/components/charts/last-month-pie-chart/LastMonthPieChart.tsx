import { useState } from "react";
import { PieChart } from "@mui/x-charts";
import { motion } from "framer-motion";
import DialogPieChart from "./DialogPieChart";
import Button from "@mui/material/Button";
import { useMediaQuery } from "react-responsive";
import { useAppSelector } from "../../../store/store";

const LastMonthPieChart = () => {
  // state for mobile
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(false);
  const data = useAppSelector(
    (state) => {
      const filteredData = state.graphSlice.lastMonthCategoryWiseData.filter(item =>  item.totalAmount > 0);
      return filteredData;
    }
  );

  const COLOR_PALETTE = [
    "#FF6384", // Soft Red
    "#36A2EB", // Blue
    "#FFCE56", // Yellow
    "#4BC0C0", // Teal
    "#9966FF", // Purple
    "#FF9F40", // Orange
    "#8D44AD", // Deep Violet
    "#00C49F", // Green
    "#FF5B5B", // Bright Red
    "#2D87BB", // Dark Blue
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className={`flex flex-col gap-4`}>
      <div
        className={`max-w-[300px] w-full h-[280px] rounded-lg bg-primary overflow-hidden p-4 gap-2 flex flex-col`}
      >
        <h2 className={`text-primary-400 text-sm`}>
          Total spending of last month
        </h2>
        <div
          onClick={handleOpen}
          className={`w-full h-full select-none overflow-none`}
        >
          <motion.div
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            className={`w-full h-full outline-none`}
          >
            <PieChart
              width={400}
              height={300}
              series={[
                {
                  data: data.map(({ category, totalAmount }, index) => ({
                    id: category,
                    value: totalAmount,
                    color: COLOR_PALETTE[index % COLOR_PALETTE.length], // Assign colors in a loop
                  })),
                  outerRadius: 90,
                  cornerRadius: 3,
                  cx: isMobile ? 95 : 105,
                  cy: 100,
                },
              ]}
              colors={COLOR_PALETTE}
            />
          </motion.div>
        </div>

        {/* Use DialogPieChart component */}
        <DialogPieChart open={open} handleClose={handleClose} data={data} />
      </div>
      <div
        className={`w-full h-[150px] bg-primary rounded-lg max-w-[300px] relative flex items-center justify-center`}
      >
        <div className={`absolute blur-xl bg-primary-900 w-full h-full`}></div>
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button variant={`text`}>View Custom Graph</Button>
        </motion.div>
      </div>
    </div>
  );
};

export default LastMonthPieChart;
