// Header.tsx
import { useState } from "react";
import searchIcon from "../../assets/search.svg";
import { useRef } from "react";
import { motion } from "framer-motion";
import MeImg from "../../../public/me-welcome-seecs.jpeg";
import Button from "@mui/material/Button";
import AddExpenseFormDialogContainer from "../../containers/AddExpenseFormDialogContainer.tsx";

const Header = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleSearchFocus = () => {
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div className={`w-full flex justify-end px-4 py-2`}>
      <div className={`flex gap-4 items-center`}>
        {/* Search */}
        <form
          onClick={handleSearchFocus}
          className={`hidden sm:flex cursor-pointer bg-primary w-[350px] px-4 py-2 rounded-lg gap-2`}
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
          <Button
            variant={"contained"}
            color={"success"}
            onClick={handleOpenDialog}
            className={`sm:font-medium text-xs sm:text-base bg-tertiary text-tertiary-950 px-4 py-2 rounded-lg hover:bg-tertiary-600 transition-all duration-200 shadow-lg shadow-primary-950`}
          >
            Add Expense
          </Button>
        </motion.div>

        {/* Image of the user */}
        <div
          className={`w-[64px] h-[64px] rounded-full overflow-hidden border-2 border-secondary`}
        >
          <img src={MeImg} />
        </div>
      </div>

      {/* Dialog for Adding Expense */}
      <AddExpenseFormDialogContainer
        open={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
};

export default Header;
