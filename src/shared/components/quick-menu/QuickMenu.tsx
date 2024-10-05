import CurrentBalanceCard from "../../cards/CurrentBalanceCard.tsx";
import AtmCard from "../../cards/AtmCard.tsx";
import { motion } from "framer-motion";
import LatestActivity from "./LatestActivity.tsx";

const QuickMenu = () => {
  const NAME = "Muhammad Shahzaib";
  const DESIGNATION = "CS student at NUST";
  return (
    <div
      className={`text-gray-100 max-h-[800px] w-full h-full bg-primary px-4 py-4 flex flex-col gap-4 h-md:justify-start justify-between h-md:gap-7 overflow-hidden`}
    >
      {/*NAME & designation OF THE USER*/}
      <header className={`w-full text-gray-100 flex flex-col gap-1`}>
        <span className={`font-playpen font-bold`}>{NAME}</span>
        <span className={`font-roboto text-xs text-zinc-600`}>
          {DESIGNATION}
        </span>
      </header>

      {/*Current Balance card*/}
      <section className={`flex flex-col gap-3 items-center`}>
        {/*Current balance card */}
        <CurrentBalanceCard />

        {/* ATM CARD */}
        <div className={`w-full`}>
          {/*HEADER*/}
          <div className={`p-2 flex justify-between items-center`}>
            <span className={`font-medium`}>ATM Cards</span>
            <motion.button
              className={`px-2 py-0.5 hover:bg-primary-900 rounded-lg shadow shadow-primary-900 font-playpen`}
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
            >
              View All
            </motion.button>
          </div>
          <AtmCard />
        </div>
      </section>
      {/* Latest Activity */}
      <section>
        <div className={`py-2 h-md:block hidden`}>
          <div className={`border-b-2 border-secondary`}>
            <span>Latest Activity</span>
          </div>
          <LatestActivity />
        </div>
      </section>
    </div>
  );
};

export default QuickMenu;
