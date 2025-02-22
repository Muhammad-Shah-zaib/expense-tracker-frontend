import { PieChart } from "@mui/x-charts";
import { IGraphData } from "../../../interfaces/IGraphData";

interface PieChartProps {
  data: IGraphData;
}

const CustomPieChart: React.FC<PieChartProps> = ({ data }) => {
  return (
    <div className="w-full h-full flex justify-center">
      <PieChart
        width={400}
        height={280}
        series={[
          {
            data: data.labels.map((label, index) => ({
              id: index,
              value: data.values[index],
              label: label,
            })),
            innerRadius: 50,
            outerRadius: 100,
          },
        ]}
      />
    </div>
  );
};

export default CustomPieChart;
