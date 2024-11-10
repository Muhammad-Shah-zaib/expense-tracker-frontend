import { ILoginResponseDto, ISetUser, IUserSliceState } from "./types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import profileImage from "../../../public/me-welcome-seecs.jpeg";
import loginApiThunk from "./LoginApi.ts";

const initialState: IUserSliceState = {
  token: null,
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  image: profileImage,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(
      state,
      {
        payload: { firstname, lastname, username, token },
      }: PayloadAction<ISetUser>,
    ) {
      state.firstname = firstname;
      state.lastname = lastname;
      state.username = username;
      state.token = token;
    },
    logout(state) {
      state.firstname = "";
      state.lastname = "";
      state.username = "";
      state.token = null;
      localStorage.setItem("JWT", "");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginApiThunk.fulfilled,
      (
        state,
        {
          payload: { statusCode, lastname, firstname, username, token },
        }: PayloadAction<ILoginResponseDto>,
      ) => {
        if (statusCode === 200) {
          localStorage.setItem("JWT", token);
          state.firstname = firstname;
          state.lastname = lastname;
          state.username = username;
          state.token = token;
        }
      },
    );
  },
});

export default userSlice.reducer;

export const { setUser, logout } = userSlice.actions;
