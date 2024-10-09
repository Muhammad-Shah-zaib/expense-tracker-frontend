export default interface ICardDetails {
  holderName: string;
  companyName: string;
  cardType: "Visa" | "UnionPay" | "MasterCard";
  balance: number;
  cardNumber: string;
}
