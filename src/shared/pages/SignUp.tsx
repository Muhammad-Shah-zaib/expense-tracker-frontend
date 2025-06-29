import { motion } from "framer-motion";
import { useAppSelector } from "../../store/store.ts";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SignUpContainer from "../../containers/SignUpContainer.tsx";

const Login = () => {
  const jwtToken = useAppSelector((state) => state.userSlice.token);
  const navigate = useNavigate();
  const jwtTokenFromStorage = localStorage.getItem("JWT");
  useEffect(() => {
    if (jwtToken) navigate("/charts");
  }, [jwtToken]);

  if (jwtTokenFromStorage) {
    return <Navigate to="/charts" />;
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-primary flex items-center justify-center">
      <div className="shadow-xl shadow-primary-900">
        <div className="max-w-[780px] md:max-h-[500px] flex md:flex-row flex-col  items-center overflow-hidden rounded-sm">
          <div className="w-[400px] md:h-[500px] p-8 bg-zinc-900 flex justify-between flex-col gap-4">
            <div className="w-full text-center text-5xl font-playpen">
              SignUp
            </div>
            <div className="flex items-center flex-col">
              <div className="text-4xl font-bold">Expense Tracker</div>
              <div className="text-lg text-zinc-400">
                Manage your expenses efficiently
              </div>
            </div>
            <div className="flex justify-between text-zinc-500 font-medium font-mono">
              <motion.div whileTap={{ scale: 0.9 }}>
                <span
                  onClick={() => navigate("/login")}
                  className={`cursor-pointer hover:text-teal-500 transition-all duration-300 hover:underline underline-offset-2`}
                >
                  I already have an account.
                </span>
              </motion.div>
              <motion.div whileTap={{ scale: 0.9 }}>
                <span
                  className={`cursor-pointer hover:text-sky-500 transition-all duration-300 hover:underline underline-offset-2`}
                >
                  About
                </span>
              </motion.div>
            </div>
          </div>

          <SignUpContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
