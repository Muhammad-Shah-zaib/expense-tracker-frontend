import { axisClasses, BarChart } from "@mui/x-charts";
import { useMediaQuery } from "react-responsive";

interface ICurrentWeekBarChartProps {
  chartData: {
    xAxisLabels: string[];
    yAxisLabel: string;
    creditData: number[];
    debitData: number[];
  };
}

const CurrentWeekBarChart = ({ chartData }: ICurrentWeekBarChartProps) => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <div className="max-h-[300px] h-full">
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
