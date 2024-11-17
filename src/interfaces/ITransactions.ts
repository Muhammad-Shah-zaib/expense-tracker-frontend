// Define the type for a transaction
import { Dayjs } from "dayjs";

export default interface ITransactions {
  id: number;
  type: "debit" | "credit";
  purpose:
    | "Bill Payment"
    | "Donations / Charity / Zakat"
    | "Educational Payment"
    | "Transfer to own accounts"
    | "Traveling"
    | "Food & Groceries"
    | "Others"
    | "Investment"
    | "Vendor"
    | "Transfer to family account"
    | "Subscription"
    | "Salary"
    | "Loan";
  amount: number;
  date: string | null | Dayjs;
  description: string;
  cardNumber: string;
  marked: boolean;
}
