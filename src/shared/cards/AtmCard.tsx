import React from "react";
import visaLogo from "./visaLogo.svg"; // Add the other logos as needed
import unionPayLogo from "./unionPayLogo.svg"; // Example for UnionPay
import masterCardLogo from "./masterCardLogo.svg"; // Example for MasterCard

// Define the interface for the props
interface AtmCardProps {
  holderName: string;
  companyName: string;
  cardType: "Visa" | "UnionPay" | "MasterCard"; // You can add more types if needed
  balance: number; // Assuming balance is a number
  cardNumber: string; // Card number as a string
}

const AtmCard: React.FC<AtmCardProps> = ({
  holderName,
  companyName,
  cardType,
  balance,
  cardNumber,
}) => {
  let backgroundClass = "from-rose-600 to-blue-600"; // Default for Visa
  let logo = visaLogo; // Default logo

  switch (cardType) {
    case "UnionPay":
      backgroundClass = "bg-primary-700"; // Change to your desired class
      logo = unionPayLogo;
      break;
    case "MasterCard":
      backgroundClass = "bg-blue-800"; // Change to your desired class
      logo = masterCardLogo;
      break;
    // Add more cases for other card types if needed
  }

  return (
    <div
      className={`w-full max-w-[350px] rounded-lg shadow-lg shadow-primary-900 bg-gradient-to-br flex justify-center items-center p-2 ${backgroundClass} text-gray-100`}
    >
      <div
        className={`w-full flex flex-col rounded-lg justify-between max-w-[300px] h-[160px]`}
      >
        {/* Header */}
        <header className={`w-full flex items-center justify-between`}>
          <span className={`font-medium`}>{cardType}</span>
          <span className={`font-medium font-mulish`}>{companyName}</span>
        </header>
        <body className={`flex flex-col gap-1 bg-transparent items-center`}>
          <span className={`text-2xl font-bold font-playpen`}>
            Rs. {balance}
          </span>
          <span className={`text-lg font-bold font-mono`}>
            {cardNumber.replace(/(\d{4})(?=\d)/g, "$1   ")}{" "}
            {/* Format card number */}
          </span>
        </body>
        <footer className={`w-full flex justify-between items-center`}>
          <span className={`text-xs font-bold font-mono`}>{holderName}</span>
          <span>
            <img src={logo} alt={`${cardType} logo`} />
          </span>
        </footer>
      </div>
    </div>
  );
};

export default AtmCard;
