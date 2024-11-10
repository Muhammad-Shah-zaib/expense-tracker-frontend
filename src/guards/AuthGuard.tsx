import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/user/userSlice";
import { IJwtToken } from "../interfaces/IJwtToken";
import { ISetUser } from "../store/user/types";
import { RootState } from "../store/store.ts";
import { useEffect } from "react"; // Import your Redux action

const AuthGuard = () => {
  const jwtTokenFromStorage = localStorage.getItem("JWT");
  const jwtToken = useSelector((state: RootState) => state.userSlice.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!jwtToken) return navigate("/login");
  }, [jwtToken]);

  // If there is no token, redirect to the login page
  if (!jwtTokenFromStorage) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Decode the token and extract details
    const decodedToken: IJwtToken = jwtDecode(jwtTokenFromStorage);
    const obj: ISetUser = {
      firstname: decodedToken.FirstName,
      lastname: decodedToken.LastName,
      username: decodedToken.sub,
      token: jwtTokenFromStorage!,
    };
    dispatch(setUser(obj));
    console.log(
      decodedToken.FirstName + "   from auth guard after dispatching",
    );
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default AuthGuard;
