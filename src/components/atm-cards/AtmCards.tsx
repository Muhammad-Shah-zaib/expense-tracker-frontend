import { IconButton } from "@mui/material";
import AtmCard from "../../shared/cards/AtmCard";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import ICardDetails from "../../interfaces/ICardDetails.ts";

const AtmCards = () => {
  const NAME = "Muhammad Shahzaib";
  // Card details
  const cardDetails: ICardDetails = {
    holderName: NAME,
    companyName: "Sadapay",
    cardType: "Visa", // or "UnionPay", "MasterCard"
    balance: 23000,
    cardNumber: "5355034859455045",
  };
  return (
    <div className={`flex flex-col gap-4 px-4 w-full h-full`}>
      <div
        className={`w-full border-b-2 border-primary flex items-center justify-between`}
      >
        <div className={`font-medium text-xl`}>Atm Cards</div>
        <div>
          <IconButton>
            <LibraryAddIcon className="text-tertiary" />
          </IconButton>
        </div>
      </div>
      <AtmCard
        holderName={cardDetails.holderName}
        companyName={cardDetails.companyName}
        cardType={cardDetails.cardType}
        balance={cardDetails.balance}
        cardNumber={cardDetails.cardNumber}
      />
    </div>
  );
};

export default AtmCards;
