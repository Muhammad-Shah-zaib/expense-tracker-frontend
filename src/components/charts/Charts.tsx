import CurrentWeekBarChart from "./CurrentWeekBarChart.tsx";
import CurrentMonthBarChart from "./CurrentMonthBarChart.tsx";
import DownloadTransactions from "./DownloadTransactions.tsx";

const Charts = () => {
  return (
    <div className={`w-full h-full px-8 flex flex-col gap-4`}>
      {/*current week chart*/}
      <div className={`w-[70%] h-[280px] grid grid-cols-3`}>
        <div className={`col-span-2 h-full`}>
          <CurrentWeekBarChart />
        </div>
        <div className={`flex items-center`}>
          <DownloadTransactions />
        </div>
      </div>

      {/*other charts*/}
      <div className={`flex gap-4 w-[50%]`}>
        <CurrentMonthBarChart />
        <div className={`w-full`}></div>
      </div>
    </div>
  );
};

export default Charts;
