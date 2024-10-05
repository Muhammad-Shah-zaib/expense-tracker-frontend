import { axisClasses, BarChart } from "@mui/x-charts";
import { useMediaQuery } from "react-responsive";

const CurrentWeekBarChart = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // You can adjust the width based on your needs

  const chartData = {
    xAxisLabels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    yAxisLabel: "Budget Last Seven Days",
    creditData: [100, 280, 280, 280, 1500, 540, 1500],
    debitData: [0, 100, 50, 0, 0, 0, 500],
  };

  return (
    <>
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
        width={isMobile ? 280 : 350 } // Set width based on screen size
      />
    </>
  );
};

export default CurrentWeekBarChart;
