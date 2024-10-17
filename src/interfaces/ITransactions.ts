// Define the type for a transaction
export default interface ITransactions {
  id: number;
  transactionType: "debit" | "credit";
  purpose: string;
  amount: number;
  date: string;
  description: string;
  cardNumber: string;
}
