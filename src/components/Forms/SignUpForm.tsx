import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TMapDispatchToProps,
  TMapStateToProps,
} from "../../containers/SignUpContainer.tsx";

type ISignUpFormProps = ReturnType<TMapDispatchToProps> &
  ReturnType<TMapStateToProps>;

interface ISignUpFormFields {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export default function SignUpForm({
  signUpApiThunk,
  loading,
  errorMessage,
  success,
}: ISignUpFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignUpFormFields>();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit: SubmitHandler<ISignUpFormFields> = (data) => {
    signUpApiThunk(data);
  };

  useEffect(() => {
    if (!loading && success) {
      navigate("/login");
    }
  }, [loading, success]);

  return (
    <div className="flex flex-col items-center justify-between gap-4 p-8 bg-zinc-900 w-[400px] h-[500px]">
      <div></div>
      <div className="space-y-4 w-full">
        {errorMessage && (
          <span className={`text-sm font-medium text-red-400`}>
            {errorMessage}
          </span>
        )}
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          {...register("firstName", { required: "First Name is required" })}
          error={!!errors.firstName}
          helperText={errors.firstName ? errors.firstName.message : ""}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          {...register("lastName", { required: "Last Name is required" })}
          error={!!errors.lastName}
          helperText={errors.lastName ? errors.lastName.message : ""}
        />
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username ? errors.username.message : ""}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password ? errors.password.message : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="flex justify-end flex-row-reverse gap-4 w-full mt-4">
        <motion.div
          className="w-full"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit(onSubmit)}
          >
            {loading ? "Loading..." : "Sign Up"}
          </Button>
        </motion.div>
        <motion.div
          className="w-full"
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => navigate("/login")}
            variant="outlined"
            color="secondary"
            fullWidth
          >
            Login
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
