import { motion } from "framer-motion";
import { useRef } from "react";

const TotalDebitsThisMonth = () => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const DEBITS_THIS_MONTH = 8500;

  const ClickBtn = (ref: React.RefObject<HTMLButtonElement>) => {
    if (ref.current) ref.current.focus();
  };
  return (
    <div className={`flex flex-col p-2 gap-4 w-full bg-primary rounded-lg`}>
      <div className={`flex flex-col gap-2 border-b border-primary-500 pb-2`}>
        <span className={`text-sm font-bold font-mulish text-primary-400`}>
          Total Debits this month
        </span>
        <span className={`font-playpen font-bold text-tertiary text-sm`}>
          Rs. {DEBITS_THIS_MONTH}
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
          className={`z-20 w-full h-full text-center cursor-pointer bg-transparent absolute inset-0`}
        >
          <button className={`w-full h-full`}>View Transactions</button>
        </motion.div>
      </div>
    </div>
  );
};

export default TotalDebitsThisMonth;