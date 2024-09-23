import searchIcon from "../../assets/search.svg";
import { useRef } from "react";
import { motion } from "framer-motion";
import MeImg from "../../../public/me-welcome-seecs.jpeg";

const Header = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearchFocus = () => {
    if (searchInputRef.current) searchInputRef.current.focus();
  };
  return (
    <div className={`w-full flex justify-end px-4 py-2`}>
      <div className={`flex gap-4 items-center`}>
        {/*Search*/}
        <form
          onClick={handleSearchFocus}
          className={`cursor-pointer bg-primary w-[350px] px-4 py-2 rounded-lg flex gap-2`}
        >
          <input
            ref={searchInputRef}
            placeholder={`Search transactions`}
            className={`font-mono font-bold text-sm outline-none bg-transparent border-none w-full`}
          />
          <button
            type={"submit"}
            onClick={(e) => {
              e.preventDefault();
              if (searchInputRef.current) searchInputRef.current.value = "";
            }}
            className={`p-1`}
          >
            <img src={searchIcon} />
          </button>
        </form>

        {/* Add expense button */}
        <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
          <button
            className={`font-medium bg-tertiary text-tertiary-950 px-4 py-2 rounded-lg hover:bg-tertiary-600 transition-all duration-200 shadow-lg shadow-primary-950`}
          >
            Add Expense
          </button>
        </motion.div>
        {/* Image of the user */}
        <div
          className={`w-[64px] h-[64px] rounded-full overflow-hidden border-2 border-secondary`}
        >
          <img src={MeImg} />
        </div>
      </div>
    </div>
  );
};

export default Header;
