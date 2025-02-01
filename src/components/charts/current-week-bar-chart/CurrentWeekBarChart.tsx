import { axisClasses, BarChart } from "@mui/x-charts";
import { useMediaQuery } from "react-responsive";
import CircularSpinner from "../../../shared/components/CIrcularSpinner/CircularSpinner";

interface ICurrentWeekBarChartProps {
  chartData: {
    xAxisLabels: string[];
    yAxisLabel: string;
    creditData: number[];
    debitData: number[];
  };
  loading: boolean;
}

const CurrentWeekBarChart = ({ chartData, loading }: ICurrentWeekBarChartProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // If loading is true, render the spinner
  if (loading) {
    return (
      <div className="w-full h-full z-[1000] relative max-w-[370px] rounded-md shadow-lg shadow-black overflow-hidden">
        <CircularSpinner size={40} color="primary" bgOpacityCLass="opacity-10" />
      </div>
    );
  }

  // Otherwise, render the chart
  return (
    <div className="max-h-[300px] h-full rounded-md shadow-lg shadow-black px-4 max-w-[370px]">
      <BarChart
        colors={["blue", "red"]}
        xAxis={[
          {
            scaleType: "band",
            data: chartData.xAxisLabels,
          },
        ]}
        yAxis={[
          {
            label: chartData.yAxisLabel,
          },
        ]}
        sx={[
          {
            [`.${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translate(-10px, 0)",
            },
          },
        ]}
        series={[
          { label: "Credit", data: chartData.creditData },
          { label: "Debit", data: chartData.debitData },
        ]}
        width={isMobile ? 280 : 350}
      />
    </div>
  );
};

export default CurrentWeekBarChart;
