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
import { useAppSelector } from "../../store/store.ts";

interface ICardDetails {
  holderName: string;
  companyName: string;
  cardType: "Visa" | "UnionPay" | "MasterCard";
  balance: number;
  cardNumber: string;
}

interface EditCardFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ICardDetails) => void;
}

const EditCardFormDialog: React.FC<EditCardFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
}) => {
  const cardToEdit = useAppSelector((state) => state.cardSlice.cardToEdit);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICardDetails>({
    defaultValues: {
      holderName: "",
      companyName: "",
      cardType: "Visa",
      balance: 0,
      cardNumber: "",
    },
  });

  // Update form values when the dialog opens and cardToEdit changes
  useEffect(() => {
    if (open && cardToEdit) {
      reset(cardToEdit);
    }
  }, [open, cardToEdit, reset]);

  const handleFormSubmit = (data: ICardDetails) => {
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Card Details</DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4 pt-2"
        >
          <Controller
            name="holderName"
            control={control}
            rules={{ required: "Holder name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Holder Name"
                fullWidth
                error={!!errors.holderName}
                helperText={errors.holderName?.message}
              />
            )}
          />
          <Controller
            name="companyName"
            control={control}
            rules={{ required: "Company name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Company Name"
                fullWidth
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            )}
          />
          <Controller
            name="cardType"
            control={control}
            render={({ field }) => (
              <TextField {...field} select label="Card Type" fullWidth>
                <MenuItem value="Visa">Visa</MenuItem>
                <MenuItem value="UnionPay">UnionPay</MenuItem>
                <MenuItem value="MasterCard">MasterCard</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="balance"
            control={control}
            rules={{
              required: "Balance is required",
              min: { value: 0, message: "Balance must be a positive number" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="number"
                label="Balance"
                fullWidth
                error={!!errors.balance}
                helperText={errors.balance?.message}
              />
            )}
          />
          <Controller
            name="cardNumber"
            control={control}
            rules={{
              required: "Card number is required",
              minLength: {
                value: 16,
                message: "Card number must be 16 digits",
              },
              maxLength: {
                value: 16,
                message: "Card number must be 16 digits",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Card Number"
                fullWidth
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
                  field.onChange(formattedValue);
                }}
              />
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

export default EditCardFormDialog;
