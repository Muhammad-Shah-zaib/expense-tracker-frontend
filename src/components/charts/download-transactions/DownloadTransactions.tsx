import { motion } from "framer-motion";
import Button from "@mui/material/Button";

const DownloadTransactions = () => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 w-full py-4 bg-primary rounded-lg`}
    >
      <span className={`text-secondary font-bold font-mulish`}>Invoices</span>

      <form className={`w-full flex flex-col gap-4 px-2`}>
        <input
          type={"date"}
          className={`bg-primary-900 outline-none rounded-xl p-2`}
        />
        <span
          className={`w-full text-center font-playpen font-bold text-primary-400`}
        >
          to
        </span>

        <input
          type={"date"}
          className={`bg-primary-900 outline-none rounded-xl p-2`}
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
