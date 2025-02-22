import { LineChart, axisClasses } from "@mui/x-charts";
import { IGraphData } from "../../../interfaces/IGraphData";

interface LineChartProps {
  data: IGraphData;
}

const CustomLineChart: React.FC<LineChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex justify-center">
      <LineChart
        width={400} // Adjusted width
        height={280} // Adjusted height
        xAxis={[
          { scaleType: "point", data: data.labels, label: data.interval },
        ]} // Using "point" scale for line chart
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
            color: data.graphColor,
          },
        ]}
      />
    </div>
  );
};

export default CustomLineChart;
