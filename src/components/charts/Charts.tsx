import { axisClasses, BarChart } from "@mui/x-charts";

const Charts = () => {
  return (
    <div className={`w-full h-full px-8`}>
      <div className={`w-[400px] h-[350px]`}>
        <BarChart
          xAxis={[
            {
              scaleType: "band",
              data: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
            },
          ]}
          yAxis={[
            {
              label: "Budget Last seven days",
            },
          ]}
          sx={[
            {
              [`.${axisClasses.left} .${axisClasses.label}`]: {
                transform: "translate(-20px, 0)",
              },
            },
          ]}
          series={[{ data: [500, 800, 100, 280, 380, 500, 1000] }]}
        />
      </div>
    </div>
  );
};

export default Charts;
