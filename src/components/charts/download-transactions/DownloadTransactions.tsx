import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import CircularSpinner from "../../../shared/components/CIrcularSpinner/CircularSpinner";
import { fetchTransactionSummary } from "../../../store/transactions/transactionApi";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { generateExcel } from "../../../utils/generateExcel";
import { showSnackbar } from "../../../store/transactions/transactionSlice";

const DownloadTransactions = () => {
  const dispatch = useAppDispatch();
  const { transactionWIthDateDate, transactionWithDateLoading } =
    useAppSelector((state) => state.transactionSlice);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleDownload = async () => {
    if (!startDate || !endDate || startDate === null || endDate === null) {
      dispatch(
        showSnackbar({
          message: "Please select both start and end dates",
          severity: "error",
        })
      );
      return;
    }

    await dispatch(
      fetchTransactionSummary({
        userId: 1,
        startDate: startDate.format("YYYY-MM-DD"),
        endDate: endDate.format("YYYY-MM-DD"),
      })
    );
  };

  useEffect(() => {
    if (transactionWIthDateDate.length > 0)
      generateExcel(
        transactionWIthDateDate,
        startDate!.format("YYYY-MM-DD"),
        endDate!.format("YYYY-MM-DD")
      );
  }, [transactionWIthDateDate, generateExcel]);
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full py-4 bg-primary rounded-lg relative">
      {transactionWithDateLoading && (
        <CircularSpinner size={64} color="primary" />
      )}
      <span className="text-secondary font-bold font-mulish">Invoices</span>

      <form className="w-full flex flex-col gap-4 px-2">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{ textField: { fullWidth: true, variant: "outlined" } }}
        />
        <span className="w-full text-center font-playpen font-bold text-primary-400">
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
          className="flex justify-center"
        >
          <Button
            variant="contained"
            onClick={handleDownload}
            className="bg-tertiary w-full"
          >
            Download Excel
          </Button>
        </motion.div>
      </form>
    </div>
  );
};

export default DownloadTransactions;
