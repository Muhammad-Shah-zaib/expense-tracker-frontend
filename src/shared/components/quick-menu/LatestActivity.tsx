import latestActivityObj from "../../../dummy-data/LatestActivity.ts";
import "./QuickMenu.css";

const LatestActivity = () => {
  const o = latestActivityObj;
  return (
    <div className={`max-h-[200px] scrollbar-thin overflow-auto pr-3`}>
      {o.map((o) => (
        <div className={`flex justify-center flex-col gap-2`} key={o.id}>
          {/* day */}
          <span
            className={`text-sm text-primary-500 font-playpen w-full text-center pt-2 pb-4`}
          >
            {o.day}
          </span>
          {/* transactions */}
          <div className={`flex flex-col gap-4`}>
            {o.transactions.map((t) => (
              <div
                className={`flex justify-between items-center border-b border-primary-600`}
              >
                <div className={`flex gap-2 items-center`}>
                  {/* colored div */}
                  <div
                    className={`bg-${t.color} rounded-full w-[32px] h-[32px]`}
                  />
                  {/*content of transaction*/}
                  <div key={t.id} className={`flex flex-col gap-1`}>
                    <span>{t.title}</span>
                    <span className={`font-mono text-xs text-primary-500`}>
                      {t.timestamp}
                    </span>
                  </div>
                </div>
                <span
                  className={`font-playpen font-bold text-sm ${t.type == "credit" ? " text-red-500" : " text-tertiary"}`}
                >
                  {t.type == "credit" ? "-" : "+"}Rs.{t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestActivity;
