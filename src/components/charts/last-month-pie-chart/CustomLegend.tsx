import React from "react";

interface CustomLegendProps {
  data: { id: string; value: number; color: string; percentage: number }[];
}

const CustomLegend: React.FC<CustomLegendProps> = ({ data }) => {
  return (
    <div className="flex flex-wrap justify-center mt-4">
      {data.map((item) => (
        <div key={item.id} className="relative flex items-center m-2 group">
          <span
            className="absolute -top-0 group-hover:-top-5 px-1 py-0.5 rounded-full opacity-70 transition-all invisible group-hover:visible text-[0.6rem] font-mulish font-extrabold right-2"
            style={{ backgroundColor: item.color }}
          >
            {item.percentage}%
          </span>
          <div
            className="w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="text-sm font-medium">{`${item.id}`}</span>{" "}
          <span
            className={`font-playpen text-[0.7rem] rounded-full px-1 ml-1 font-extrabold py-1.5 bg-zinc-700`}
            style={{
              color: item.color,
            }}
          >{`(${Math.round(item.value).toLocaleString()})`}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
