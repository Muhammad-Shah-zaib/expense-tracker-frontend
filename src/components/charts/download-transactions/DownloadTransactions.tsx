import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

const DownloadTransactions = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 w-full py-4 bg-primary rounded-lg`}
    >
      <span className={`text-secondary font-bold font-mulish`}>Invoices</span>

      <form className={`w-full flex flex-col gap-4 px-2`}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
        />
        <span
          className={`w-full text-center font-playpen font-bold text-primary-400`}
        >
          to
        </span>
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
        />

        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className={`flex justify-center`}
        >
          <Button
            variant={"contained"}
            onClick={(e) => e.preventDefault()}
            className={`bg-tertiary w-full`}
          >
            Download
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default DownloadTransactions;
