import CurrentWeekBarChart from "./CurrentWeekBarChart.tsx";
import LastMonthBarChart from "./last-month-bar-chart/LastMonthBarChart.tsx";
import DownloadTransactions from "./DownloadTransactions.tsx";
import TotalDebitsThisMonth from "./total-debits-this-month/TotalDebitsThisMonth.tsx";
import SpendingTrend from "./spending-trend/SpendingTrend.tsx";
import LastMonthPieChart from "./last-month-pie-chart/LastMonthPieChart.tsx";

const Charts = () => {
  return (
    <div className={`w-full h-full px-8 flex gap-4`}>
      <div className={`w-[70%] h-full flex flex-col gap-4`}>
        {/*current week chart*/}
        <div className={`w-full h-[280px] grid grid-cols-3`}>
          <div className={`col-span-2 h-full`}>
            <CurrentWeekBarChart />
          </div>
          <div className={`flex items-center`}>
            <DownloadTransactions />
          </div>
        </div>
        {/*other charts*/}
        <div className={`flex gap-4 w-full`}>
          <div className={`w-full`}>
            <LastMonthBarChart />
          </div>
          <div className={`w-full`}>
            <TotalDebitsThisMonth />
          </div>
          <div className={`w-full`}>
            <SpendingTrend />
          </div>
        </div>
      </div>
      <div className={`w-[30%]`}>
        <LastMonthPieChart />
      </div>
    </div>
  );
};

export default Charts;
