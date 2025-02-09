import { Card, CardContent } from "@mui/material";
import CustomBarChart from "./CustomBarChart";

interface CustomGraphProps {
  type: "bar" | "pie" | "line";
  data: any; // Replace with a proper type based on your graph library
}

const CustomGraph: React.FC<CustomGraphProps> = ({ type, data }) => {
  return (
    <Card className="p-4 w-full h-[300px] flex items-center justify-center bg-neutral-800">
      <CardContent>
        {type === "bar" && <div className="text-gray-500">{<CustomBarChart data={data} /> }</div>}
        {type === "pie" && <div className="text-gray-500">Pie Chart Placeholder</div>}
        {type === "line" && <div className="text-gray-500">Line Chart Placeholder</div>}
      </CardContent>
    </Card>
  );
};

export default CustomGraph;
