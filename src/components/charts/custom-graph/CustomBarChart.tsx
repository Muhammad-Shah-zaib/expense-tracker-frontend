import { BarChart } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts";
import { IGraphData } from "../../../interfaces/IGraphData";

const CustomBarChart: React.FC<{ data: IGraphData }> = ({ data }) => {
  return (
    <div className="w-full h-full flex justify-center">
      <BarChart
        width={400} // Increased width
        height={280} // Increased height
        xAxis={[{ scaleType: "band", data: data.labels, label: data.interval }]}
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
        series={[{ data: data.values, label: "Data", color: data.graphColor }]}
      />
    </div>
  );
};

export default CustomBarChart;
