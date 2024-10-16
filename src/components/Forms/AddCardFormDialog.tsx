import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
} from '@mui/material';

interface ICardDetails {
  holderName: string;
  companyName: string;
  cardType: 'Visa' | 'UnionPay' | 'MasterCard';
  balance: number;
  cardNumber: string;
}

interface AddCardFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ICardDetails) => void;
}

const AddCardFormDialog: React.FC<AddCardFormDialogProps> = ({ open, onClose, onSubmit }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<ICardDetails>();

  const handleFormSubmit = (data: ICardDetails) => {
    // clear the form after submission
    reset();
    onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} className={`pt-4`}>
      <DialogTitle>Add Card Details</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 pt-2">
          <Controller
            name="holderName"
            control={control}
            defaultValue=""
            rules={{ required: 'Holder name is required' }}
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
            defaultValue=""
            rules={{ required: 'Company name is required' }}
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
            defaultValue="Visa"
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Card Type"
                fullWidth
              >
                <MenuItem value="Visa">Visa</MenuItem>
                <MenuItem value="UnionPay">UnionPay</MenuItem>
                <MenuItem value="MasterCard">MasterCard</MenuItem>
              </TextField>
            )}
          />
          <Controller
            name="balance"
            control={control}
            defaultValue={0}
            rules={{ required: 'Balance is required', min: { value: 0, message: 'Balance must be a positive number' } }}
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
            defaultValue=""
            rules={{ required: 'Card number is required',
                minLength: { value: 19, message: 'Card number must be 16 digits' },
                maxLength: { value: 19, message: 'Card number must be 16 digits' }
             }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Card Number"
                fullWidth
                error={!!errors.cardNumber}
                helperText={errors.cardNumber?.message}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  const formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
                  field.onChange(formattedValue);
                }}
              />
            )}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit(handleFormSubmit)} color="primary">Add Card</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddCardFormDialog;
