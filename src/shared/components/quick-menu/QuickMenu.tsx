import { IconButton } from "@mui/material";
import { KeyboardArrowDownSharp } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store.ts";
import { fetchCreditsSummary } from "../../../store/transactions/transactionApi.ts";

const QuickMenu = () => {
  const NAME = "Muhammad Shahzaib";
  const DESIGNATION = "CS student at NUST";
  const userId = useAppSelector((state) => state.userSlice.userId);
  const creditsAmount = useAppSelector(
    (state) => state.transactionSlice.creditsAmount
  );
  const creditsSummaryLoading = useAppSelector(
    (state) => state.transactionSlice.creditsSummaryLoading
  );
  const dispatch = useAppDispatch();

  // states
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedCreditsOption, setselectedCreditsOption] =
    useState<string>("overall");

  // Ref for the dropdown menu
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    dispatch(
      fetchCreditsSummary({
        userId: userId,
        creditReportType: selectedCreditsOption,
      })
    );
  }, [fetchCreditsSummary, selectedCreditsOption, userId]);
  return (
    <div
      className={`text-gray-100 max-h-[100vh] w-full h-full bg-primary px-4 py-4 flex flex-col gap-4 h-md:justify-start justify-between h-md:gap-7 overflow-hidden`}
    >
      {/* NAME & designation OF THE USER */}
      <header className={`w-full text-gray-100 flex flex-col gap-1`}>
        <span className={`font-playpen font-bold`}>{NAME}</span>
        <span className={`font-roboto text-xs text-zinc-600`}>
          {DESIGNATION}
        </span>
      </header>

      {/* Current Balance card */}
      <section className={`flex flex-col gap-3 h-full items-center justify-center`}>
        {/* Current balance card */}
        {/* <CurrentBalanceCard /> */}

        {/* CREDITS SUMMARY */}
        <div className={`w-full`}>
          {/* HEADER */}
          <div className={`p-2 flex justify-between items-center`}>
            <span className={`font-medium`}>
              Credits - {selectedCreditsOption}
            </span>
            <div className={`flex gap-2`}>
              {/* DROP-DOWN TO CHANGE CARD */}
              <div className={`flex flex-col gap-2 relative`}>
                <div
                  className={`hover:bg-zinc-600 ${dropdownOpen && "bg-zinc-700"} rounded-md`}
                >
                  <div
                    className={`transition-transform duration-300 ${dropdownOpen ? "rotate-180" : "rotate-0"}`}
                    onClick={() => {
                      setDropdownOpen(!dropdownOpen);
                    }}
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
                    <div
                      className={`hover:bg-primary-600 p-2 rounded-sm cursor-pointer`}
                      onClick={() => {
                        setselectedCreditsOption("overall");
                        setDropdownOpen(false);
                      }}
                    >
                      <span>overall</span>
                    </div>
                    <div
                      className={`hover:bg-primary-600 p-2 rounded-sm cursor-pointer`}
                      onClick={() => {
                        setselectedCreditsOption("this-month");
                        setDropdownOpen(false);
                      }}
                    >
                      <span>This Month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={`cursor-pointer w-full max-w-[400px] rounded-lg shadow-lg shadow-primary-900 bg-gradient-to-br flex justify-center items-center p-2 from-rose-500 to-indigo-600 text-gray-100 transition-all duration-200`}
          >
            <div
              className={`w-full flex flex-col rounded-lg justify-between max-w-[300px] h-[160px]`}
            >
              {/* Header */}
              <header className={`w-full flex items-center justify-between`}>
                <span className={`font-medium`}>Credits Report</span>
                <span className={`font-medium font-mulish`}>
                  {selectedCreditsOption.replace("-", " ")}
                </span>
              </header>
              <main
                className={`flex flex-col gap-1 bg-transparent items-center`}
              >
                <span className={`text-2xl font-bold font-playpen`}>
                  Rs. {creditsSummaryLoading ? "..." : creditsAmount}
                </span>
                <span className={`text-lg font-bold font-mono`}>
                  {/* Format card number */}
                </span>
              </main>
              <footer className={`w-full flex items-center`}>
                <span className={`text-xs font-bold font-mono`}>
                  Muhammad Shahzaib
                </span>
              </footer>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Activity */}
      {/* <section>
        <div className={`py-2 `}>
          <div className={`border-b-2 border-secondary`}>
            <span>Latest Activity</span>
          </div>
          <LatestActivity />
        </div>
      </section> */}
    </div>
  );
};

export default QuickMenu;
