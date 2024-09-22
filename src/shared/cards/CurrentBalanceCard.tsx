import walletIcon from "../../assets/wallet.svg";
import design from "./CurrentBalanceCardDesign.svg";

const CurrentBalanceCard = () => {
  const CURRENT_BALANCE = 24000;
  return (
    <div
      className={`relative w-full h-[150px] rounded-lg shadow-lg shadow-primary-900 overflow-hidden bg-secondary`}
    >
      {/* current balance card */}
      <div className={`p-4 flex flex-col gap-4 text-secondary-950`}>
        <span className={`font-bold text-sm`}>Current Balance</span>
        <div className={`flex gap-2 items-center`}>
          <img src={walletIcon} className={`h-[70px]`} />
          <div className={`flex flex-col gap-1`}>
            <h3 className={`font-bold text-2xl`}>Rs. {CURRENT_BALANCE}</h3>
            <button className={`group items-center`}>
              <span
                className={`text-xs font-playpen inline-block group-hover:underline underline-offset-4 underline-secondary-800 px-2 py-0.5 rounded-lg`}
              >
                View Details
              </span>
            </button>
          </div>
        </div>
      </div>

      {/*  design at the end of card*/}
      <span className={`absolute top-0 right-0`}>
        <img src={design} className={`h-[150px]`} />
      </span>
    </div>
  );
};

export default CurrentBalanceCard;
