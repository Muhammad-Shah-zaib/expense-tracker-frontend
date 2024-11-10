import {
  ILoginResponseDto,
  ISetUser,
  ISignUpResponseDto,
  IUserSliceState,
} from "./types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import profileImage from "../../../public/me-welcome-seecs.jpeg";
import loginApiThunk from "./LoginApi.ts";
import { SignUpApiThunk } from "./SignUpApi.tsx";

const initialState: IUserSliceState = {
  token: null,
  firstname: "",
  lastname: "",
  email: "",
  username: "",
  image: profileImage,
  singUpSuccess: false,
  loginSuccess: false,
  signUpErrorMessage: null,
  signUpLoading: false,
  loginErrorMessage: null,
  loginLoading: false,
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
    setSignUpSuccess(state, { payload }: PayloadAction<boolean>) {
      state.singUpSuccess = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      loginApiThunk.fulfilled,
      (
        state,
        {
          payload: { statusCode, lastName, firstName, username, token },
        }: PayloadAction<ILoginResponseDto>,
      ) => {
        if (statusCode === 200) {
          localStorage.setItem("JWT", token);
          state.firstname = firstName;
          state.lastname = lastName;
          state.username = username;
          state.token = token;
        }
      },
    ),
      builder.addCase(
        SignUpApiThunk.fulfilled,
        (state, { payload }: PayloadAction<ISignUpResponseDto>) => {
          state.signUpLoading = false;
          // navigate to login
          if (payload.statusCode === 200) {
            state.singUpSuccess = true;
          } else {
            state.singUpSuccess = false;
            state.signUpErrorMessage = payload.message;
          }
        },
      ),
      builder.addCase(SignUpApiThunk.pending, (state) => {
        state.singUpSuccess = false;
        state.signUpLoading = true;
      }),
      builder.addCase(SignUpApiThunk.rejected, (state) => {
        state.signUpLoading = false;
        state.singUpSuccess = false;
      });
  },
});

export default userSlice.reducer;

export const { setUser, logout, setSignUpSuccess } = userSlice.actions;
