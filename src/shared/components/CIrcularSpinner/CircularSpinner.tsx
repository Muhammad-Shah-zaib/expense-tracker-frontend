import { CircularProgress } from "@mui/material";

interface CircularSpinnerProps {
  size: number;
  color: "primary" | "secondary" | "inherit";
  bgOpacityCLass?: string
}
const CircularSpinner = ({
  size = 32,
  color = "primary",
  bgOpacityCLass
}: CircularSpinnerProps) => {
  return (
    <div
      className={`w-full h-full flex items-center justify-center absolute inset-0`}
    >
      {/* Overlay */}
      <div className={`w-full h-full absolute inset-0 bg-black ${bgOpacityCLass ? bgOpacityCLass : 'opacity-80'}`} />
      <div className={`z-30`}>
        <CircularProgress size={size} color={color} />
      </div>
    </div>
  );
};

export default CircularSpinner;
