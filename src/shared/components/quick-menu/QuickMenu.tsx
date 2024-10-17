import CurrentBalanceCard from "../../cards/CurrentBalanceCard.tsx";
import AtmCard from "../../cards/AtmCard.tsx";
import { motion } from "framer-motion";
import LatestActivity from "./LatestActivity.tsx";
import { useAppDispatch, useAppSelector } from "../../../store/store.ts";
import { IconButton } from "@mui/material";
import { KeyboardArrowDownSharp } from "@mui/icons-material";
import { useRef, useState } from "react";
import { changeQuickMenuCard } from "../../../store/cards/cardSlice.ts";
import { useNavigate } from "react-router-dom";


const QuickMenu = () => {
  // router hooks
  const navigate= useNavigate();

  const NAME = "Muhammad Shahzaib";
  const DESIGNATION = "CS student at NUST";

  // get the dispatch
  const dispatch = useAppDispatch();

  // states
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  // Card details
  const { cardDetails, cards } = useAppSelector((state) => ({
    cardDetails: state.cardSlice.quickMenuCard,
    cards: state.cardSlice.cards,
  }));

  // Ref for the dropdown menu
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className={`text-gray-100 max-h-[800px] w-full h-full bg-primary px-4 py-4 flex flex-col gap-4 h-md:justify-start justify-between h-md:gap-7 overflow-hidden`}
    >
      {/* NAME & designation OF THE USER */}
      <header className={`w-full text-gray-100 flex flex-col gap-1`}>
        <span className={`font-playpen font-bold`}>{NAME}</span>
        <span className={`font-roboto text-xs text-zinc-600`}>
          {DESIGNATION}
        </span>
      </header>

      {/* Current Balance card */}
      <section className={`flex flex-col gap-3 items-center`}>
        {/* Current balance card */}
        <CurrentBalanceCard />

        {/* ATM CARD */}
        <div className={`w-full`}>
          {/* HEADER */}
          <div className={`p-2 flex justify-between items-center`}>
            <span className={`font-medium`}>ATM Cards</span>
            <div className={`flex gap-2`}>
              <motion.button
                onClick={()=> navigate(`/atm-cards`)}
                className={`px-2 py-0.5 hover:bg-primary-900 rounded-lg shadow shadow-primary-900 font-playpen`}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
              >
                View All
              </motion.button>

              {/* DROP-DOWN TO CHANGE CARD */}
              <div className={`flex flex-col gap-2 relative`}>
                <div className={`hover:bg-zinc-600 ${dropdownOpen && "bg-zinc-700"} rounded-md`}>
                  <div
                    className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <IconButton
                      className={`bg-transparent hover:bg-transparent`}
                    >
                      <KeyboardArrowDownSharp />
                    </IconButton>
                  </div>
                </div>
                <div
                  ref={dropdownRef}
                  className={`absolute right-0 top-10 min-w-[150px] bg-primary-700 rounded-sm shadow-lg transition-all duration-300 ${
                    dropdownOpen
                      ? "max-h-[124px] opacity-100"
                      : "max-h-0 opacity-0"
                  } overflow-auto`}
                >
                  <div className={`py-2 flex flex-col`}>
                    {cards.map((card) => (
                      <div
                        key={card.cardNumber}
                        onClick={() => {
                          dispatch(changeQuickMenuCard({ card }));
                          setDropdownOpen(false);
                        }}
                        className={`hover:bg-primary-600 p-2 rounded-sm cursor-pointer`}
                      >
                        <span>{card.companyName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <AtmCard
            holderName={cardDetails.holderName}
            companyName={cardDetails.companyName}
            cardType={cardDetails.cardType}
            balance={cardDetails.balance}
            cardNumber={cardDetails.cardNumber}
          />
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
