import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import ExpenseDataTable from "./ExpenseDataTable.tsx";
import FilterListIcon from "@mui/icons-material/FilterList";

// Define the props type
interface SlideDialogExpenseDataTableProps {
  open: boolean;
  onClose: () => void;
}

// Define the transition component
const Transition = React.forwardRef(function Transition(
  props: React.ComponentProps<typeof Slide>,
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SlideDialogExpenseDataTable: React.FC<
  SlideDialogExpenseDataTableProps
> = ({ open, onClose }) => {
  return (
    <Dialog
      maxWidth={"md"}
      fullWidth={true}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Expense Details
          </Typography>
          <IconButton
            sx={{ borderRadius: "3px" }}
            autoFocus
            color="inherit"
            onClick={onClose}
            className={`flex gap-1 items-center`}
          >
            Filter
            <FilterListIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Add the table here */}
      <ExpenseDataTable height={"100%"} />
    </Dialog>
  );
};

export default SlideDialogExpenseDataTable;
