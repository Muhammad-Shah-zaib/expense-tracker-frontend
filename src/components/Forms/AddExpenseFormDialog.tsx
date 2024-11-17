import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker"; // Correct import
import { TAddExpenseFormDialogProps } from "../../containers/AddExpenseFormDialogContainer.tsx";
import { IAddTransactionRequestDto } from "../../store/transactions/types.ts";
import { Dayjs } from "dayjs";

interface FormValues extends Omit<IAddTransactionRequestDto, "date"> {
  date: Dayjs | null; // Override the type for 'date'
}

const AddExpenseFormDialog: React.FC<TAddExpenseFormDialogProps> = ({
  open,
  onClose,
  loading,
  addTransactionApi,
}) => {
  const { handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      type: "credit",
      description: "",
      date: null,
      cardNumber: "",
      purpose: "Bill Payment",
      userId: 0,
      amount: 0,
      marked: false,
    },
  });

  const handleFormSubmit = (data: FormValues) => {
    addTransactionApi({ ...data, userId: 10 });
    onClose();
  };

  // Format the card number with dashes
  const formatCardNumber = (value: string) => {
    // Remove all non-numeric characters
    const cleaned = value.replace(/\D/g, "");
    // Add a dash every 4 characters
    return cleaned.replace(/(.{4})(?=.)/g, "$1-");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Expense</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={`relative`}>
          {/* Type Dropdown */}
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Type"
                fullWidth
                margin="normal"
              >
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="debit">Debit</MenuItem>
              </TextField>
            )}
          />

          {/* Date Picker */}
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                label="Date"
                onChange={(date) => field.onChange(date)}
                value={field.value}
              />
            )}
          />

          {/* Card Number Input with formatting */}
          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Card Number"
                fullWidth
                margin="normal"
                value={formatCardNumber(field.value)}
                onChange={(e) => field.onChange(e.target.value)}
                onBlur={() => field.onBlur()}
              />
            )}
          />

          {/* Purpose Dropdown */}
          <Controller
            name="purpose"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Purpose"
                fullWidth
                margin="normal"
              >
                {[
                  "Bill Payment",
                  "Donations / Charity / Zakat",
                  "Educational Payment",
                  "Transfer to own accounts",
                  "Traveling",
                  "Food & Groceries",
                  "Others",
                  "Investment",
                  "Vendor",
                  "Transfer to family account",
                  "Subscription",
                  "Salary",
                  "Loan",
                ].map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          {/* Amount Input */}
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                type="number"
                fullWidth
                margin="normal"
              />
            )}
          />

          {/* Description Textarea */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                multiline
                rows={4}
                fullWidth
                margin="normal"
              />
            )}
          />

          {/* Marked Checkbox */}
          <Controller
            name="marked"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} />}
                label="Marked"
                style={{ marginTop: "8px" }}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={handleSubmit(handleFormSubmit)}
          color="primary"
        >
          {loading ? "Adding" : "Add Expense"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseFormDialog;
