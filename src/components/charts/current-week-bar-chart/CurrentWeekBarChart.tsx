import { axisClasses, BarChart } from "@mui/x-charts";

const CurrentWeekBarChart = () => {
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
            data: chartData.xAxisLabels, // Use the labels from the object
          },
        ]}
        yAxis={[
          {
            label: chartData.yAxisLabel, // Use the label from the object
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
        ]} // Use the series data from the object
      />
    </>
  );
};

export default CurrentWeekBarChart;
