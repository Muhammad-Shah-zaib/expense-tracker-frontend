import { LineChart, axisClasses } from "@mui/x-charts";

interface LineChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

const CustomLineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex justify-center">
      <LineChart
        width={400} // Adjusted width
        height={280} // Adjusted height
        xAxis={[{ scaleType: "point", data: data.labels, label: "Categories" }]} // Using "point" scale for line chart
        yAxis={[{ label: "Value" }]}
        sx={{
          [`& .${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translate(-25px, 0)",
            fontSize: "14px",
          },
          [`& .${axisClasses.bottom} .${axisClasses.label}`]: {
            fontSize: "14px",
          },
        }}
        series={[
          {
            data: data.values,
            label: "Data",
            showMark: true,
            color: "#3b82f6",
          },
        ]}
      />
    </div>
  );
};

export default CustomLineChart;
