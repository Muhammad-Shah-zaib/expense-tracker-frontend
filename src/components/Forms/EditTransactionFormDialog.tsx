import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import ITransactions from "../../interfaces/ITransactions";

interface EditTransactionFormDialogProps {
  selectedTransaction: ITransactions;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ITransactions) => void;
}

const EditTransactionFormDialog: React.FC<EditTransactionFormDialogProps> = ({
  selectedTransaction,
  open,
  onClose,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITransactions>({
    defaultValues: selectedTransaction!,
  });

  // Update form values when the dialog opens and selectedTransaction changes
  useEffect(() => {
    if (open && selectedTransaction) {
      reset(selectedTransaction);
    }
  }, [open, selectedTransaction, reset]);

  const handleFormSubmit = (data: ITransactions) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Transaction</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 pt-2"
        >
          <Controller
            name="transactionType"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Transaction Type" select fullWidth>
                <MenuItem value="credit">Credit</MenuItem>
                <MenuItem value="debit">Debit</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="purpose"
            control={control}
            rules={{ required: "Purpose is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Purpose"
                select
                fullWidth
                error={!!errors.purpose}
                helperText={errors.purpose?.message}
              >
                <MenuItem value="Bill Payment">Bill Payment</MenuItem>
                <MenuItem value="Donations / Charity / Zakat">
                  Donations / Charity / Zakat
                </MenuItem>
                <MenuItem value="Educational Payment">
                  Educational Payment
                </MenuItem>
                <MenuItem value="Transfer to own accounts">
                  Transfer to own accounts
                </MenuItem>
                <MenuItem value="Traveling">Traveling</MenuItem>
                <MenuItem value="Food & Groceries">Food & Groceries</MenuItem>
                <MenuItem value="Investment">Investment</MenuItem>
                <MenuItem value="Vendor">Vendor</MenuItem>
                <MenuItem value="Transfer to family account">
                  Transfer to family account
                </MenuItem>
                <MenuItem value="Subscription">Subscription</MenuItem>
                <MenuItem value="Salary">Salary</MenuItem>
                <MenuItem value="Loan">Loan</MenuItem>
                <MenuItem
                  value="Others"
                  className={`text-rose-400 font-playpen`}
                >
                  Others
                </MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Amount is required",
              min: { value: 0, message: "Amount must be a positive number" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Amount"
                fullWidth
                error={!!errors.amount}
                helperText={errors.amount?.message}
              />
            )}
          />
          <Controller
            name="date"
            control={control}
            rules={{ required: "Date is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                type="date"
                fullWidth
                error={!!errors.date}
                helperText={errors.date?.message}
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                fullWidth
                multiline
                rows={4}
              />
            )}
          />
          <Controller
            name="cardNumber"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Card Number" fullWidth />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit(handleFormSubmit)} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTransactionFormDialog;
