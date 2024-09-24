import visaLogo from "./visaLogo.svg";

const AtmCard = () => {
  const CARD_BALANCE = 23000;
  return (
    <div
      className={`w-full rounded-lg shadow-lg shadow-primary-900 bg-gradient-to-br flex justify-center items-center p-2 from-rose-600 to-blue-600 text-gray-100`}
    >
      <div
        className={`w-full flex flex-col rounded-lg  justify-between max-w-[300px] h-[160px]`}
      >
        {/* Header */}
        <header className={`w-full flex items-center justify-between`}>
          <span className={`font-medium`}>Debt</span>
          <span className={`font-medium font-mulish`}>Sadapay</span>
        </header>
        <body className={`flex flex-col gap-1 bg-transparent items-center`}>
          <span className={`text-2xl font-bold font-playpen`}>
            Rs. {CARD_BALANCE}
          </span>
          <span className={`text-lg font-bold font-mono`}>
            {`5355   0348   5945   5045`}
          </span>
        </body>
        <footer className={`w-full flex justify-between items-center`}>
          <span className={`text-xs font-bold font-mono`}>
            Muhammad Shahzaib
          </span>
          <span>
            <img src={visaLogo} />
          </span>
        </footer>
      </div>
    </div>
  );
};

export default AtmCard;
