import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import maleAnimatedImage from "../../../public/male-animated-dp.jpg";
import femaleAnimatedImage from "../../../public/female-animated-dp.jpg";
import Button from "@mui/material/Button";
import AddExpenseFormDialogContainer from "../../containers/AddExpenseFormDialogContainer.tsx";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Header = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dpChoice, setDpChoice] = useState<"male" | "female">("male");

  // Load from localStorage on mount
  useEffect(() => {
    const savedChoice = localStorage.getItem("userDp") as
      | "male"
      | "female"
      | null;
    if (savedChoice) setDpChoice(savedChoice);
  }, []);


  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDpChange = (choice: "male" | "female") => {
    setDpChoice(choice);
    localStorage.setItem("userDp", choice);
    handleMenuClose();
  };

  const currentDp =
    dpChoice === "male" ? maleAnimatedImage : femaleAnimatedImage;

  return (
    <div className="w-full flex justify-end px-4 py-2">
      <div className="flex gap-4 items-center">
        {/* Search */}
        {/* <form
          onClick={handleSearchFocus}
          className="hidden sm:flex cursor-pointer bg-primary w-[350px] px-4 py-2 rounded-lg gap-2"
        >
          <input
            ref={searchInputRef}
            placeholder="Search transactions"
            className="font-mono font-bold text-sm outline-none bg-transparent border-none w-full"
          />
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              if (searchInputRef.current) searchInputRef.current.value = "";
            }}
            className="p-1"
          >
            <img src={searchIcon} />
          </button>
        </form> */}

        {/* Add expense button */}
        <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.05 }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleOpenDialog}
            className="sm:font-medium text-xs sm:text-base bg-tertiary text-tertiary-950 px-4 py-2 rounded-lg hover:bg-tertiary-600 transition-all duration-200 shadow-lg shadow-primary-950"
          >
            Add Expense
          </Button>
        </motion.div>

        {/* User Profile DP + Dropdown */}
        <div className="relative flex items-center gap-1 cursor-pointer">
          <div
            className="w-[64px] h-[64px] rounded-full overflow-hidden border-2 border-secondary"
            onClick={handleMenuOpen}
          >
            <img src={currentDp} alt="User DP" />
          </div>
          <div onClick={handleMenuOpen} style={{ cursor: "pointer" }}>
            <ArrowDropDownIcon />
          </div>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleDpChange("male")}>Male</MenuItem>
            <MenuItem onClick={() => handleDpChange("female")}>
              Female
            </MenuItem>
          </Menu>
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
