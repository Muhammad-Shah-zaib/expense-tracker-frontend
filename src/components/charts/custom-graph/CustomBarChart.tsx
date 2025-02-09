import { BarChart } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts";

const CustomBarChart: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="w-full h-full flex justify-center">
      <BarChart
        width={400} // Increased width
        height={280} // Increased height
        xAxis={[{ scaleType: "band", data: data.labels, label: "Categories" }]}
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
        series={[{ data: data.values, label: "Data" }]}
      />
    </div>
  );
};

export default CustomBarChart;
