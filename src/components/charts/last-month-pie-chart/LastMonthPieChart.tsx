import { useState } from "react";
import { PieChart } from "@mui/x-charts";
import { motion } from "framer-motion";
import DialogPieChart from "./DialogPieChart";
import Button from "@mui/material/Button";

const LastMonthPieChart = () => {
  const [open, setOpen] = useState(false);

  // Dummy data for expenses
  const data = [
    { id: 0, value: 400, label: "Food/Orders" },
    { id: 1, value: 300, label: "Groceries" },
    { id: 2, value: 200, label: "Bills and utilities" },
    { id: 3, value: 250, label: "Fuel" },
    { id: 4, value: 150, label: "Bike Maintainence" },
  ];

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

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
                  data: [...data.map(({ id, value }) => ({ id, value }))],
                  outerRadius: 90,
                  cornerRadius: 3,
                  cx: 110,
                  cy: 100,
                },
              ]}
              colors={COLORS}
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
