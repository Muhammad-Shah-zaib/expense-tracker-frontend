import { useState } from "react";
import { PieChart } from "@mui/x-charts";
import { motion } from "framer-motion";
import DialogPieChart from "./DialogPieChart";

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
    <div
      className={`w-full h-[280px] rounded-lg bg-primary overflow-hidden p-4 gap-2 flex flex-col`}
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
  );
};

export default LastMonthPieChart;
