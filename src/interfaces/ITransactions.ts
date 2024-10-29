// Define the type for a transaction
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
  date: string;
  description: string;
  cardNumber: string;
  marked: boolean;
}
