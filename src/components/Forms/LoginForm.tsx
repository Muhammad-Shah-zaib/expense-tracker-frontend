import { Button, CircularProgress, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginRequestDto } from "../../store/user/types.ts";
import { useNavigate } from "react-router-dom";
import {
  TMapStateToProps,
  TMapDispatchToProps,
} from "../../containers/LoginFormContainer.tsx";

type ILoginFormProps = ReturnType<TMapStateToProps> &
  ReturnType<TMapDispatchToProps>;

export default function LoginForm({
  loginApiThunk,
  loading,
  errorMessage,
}: ILoginFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginRequestDto>();

  const onSubmit: SubmitHandler<ILoginRequestDto> = (data) => {
    loginApiThunk(data);
  };
  return (
    <div className="flex flex-col items-center justify-between gap-4 p-8 bg-zinc-900 max-w-[400px] md:h-[400px]">
      {/* For proper spacing */}
      <div className={`flex justify-center`}>
        {errorMessage && (
          <span className={`text-center font-medium text-sm text-red-400`}>
            {errorMessage}
          </span>
        )}
      </div>
      {/* Form Fields */}
      <div className={`space-y-4`}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          {...register("username", { required: "Username is required" })}
          error={!!errors.username} // Sets error flag for red border
          helperText={errors.username ? errors.username.message : ""}
        />
        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          {...register("password", { required: "Password is required" })}
          error={!!errors.password} // Sets error flag for red border
          helperText={errors.password ? errors.password.message : ""}
        />
      </div>
      {/* Action Buttons */}
      <div className="flex justify-end flex-row-reverse gap-4 w-full ">
        <motion.div
          className={`w-full`}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
          >
            {loading && <CircularProgress size={12} className={`mr-4`} />}
            {loading ? "logging in..." : "Login"}
          </Button>
        </motion.div>
        <motion.div
          className={`w-full`}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => navigate("/signup")}
            variant="outlined"
            color="secondary"
            fullWidth
            disabled={loading}
          >
            Sign Up
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
