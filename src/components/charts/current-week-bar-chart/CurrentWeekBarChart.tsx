import { axisClasses, BarChart } from "@mui/x-charts";
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

const CurrentWeekBarChart = ({
  chartData,
  loading,
}: ICurrentWeekBarChartProps) => {
  if (loading) {
    return (
      <div className="w-full h-full z-[1000] relative max-w-[500px] rounded-md shadow-lg shadow-black overflow-hidden">
        <CircularSpinner
          size={40}
          color="primary"
          bgOpacityCLass="opacity-10"
        />
      </div>
    );
  }

  return (
    <div
      /* phones → tiny laptops → FHD → QHD → 4‑K */
      className="
        w-[280px]           sm:w-[350px]
        md:w-[450px]        lg:w-[600px]
        2xl:w-[800px]       4xl:w-[1000px]
        max-w-full rounded-md shadow-lg shadow-black px-4
      "
    >
      <BarChart
        height={300} // keep height fixed or add a responsive class if you prefer
        colors={["blue", "red"]}
        xAxis={[{ scaleType: "band", data: chartData.xAxisLabels }]}
        yAxis={[{ label: chartData.yAxisLabel }]}
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
      />
    </div>
  );
};

export default CurrentWeekBarChart;
