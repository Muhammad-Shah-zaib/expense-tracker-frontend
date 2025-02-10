import { PieChart } from "@mui/x-charts";

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
  };
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
