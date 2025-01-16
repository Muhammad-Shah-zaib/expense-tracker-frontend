import {
  ILoginResponseDto,
  ISetUser,
  ISignUpResponseDto,
  IUserSliceState,
} from "./types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import profileImage from "../../../public/me-welcome-seecs.jpeg";
import loginApiThunk from "./LoginApi.ts";
import { SignUpApiThunk } from "./SignUpApi.ts";

const initialState: IUserSliceState = {
  userId: -1,
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
        payload: { firstname, lastname, username, token, userId },
      }: PayloadAction<ISetUser>
    ) {
      state.userId = userId;
      state.firstname = firstname;
      state.lastname = lastname;
      state.username = username;
      state.token = token;
    },
    logout(state) {
      state.userId = -1;
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
      (state, { payload }: PayloadAction<ILoginResponseDto>) => {
        state.loginLoading = false;
        if (payload.statusCode === 200) {
          localStorage.setItem("JWT", payload.token);
          state.userId = payload.userId
          state.firstname = payload.firstName;
          state.lastname = payload.lastName;
          state.username = payload.username;
          state.loginSuccess = true;
          state.token = payload.token;
        } else if (payload.statusCode === 404) {
          if (payload.errors) state.loginErrorMessage = payload.errors[0]!;
          else state.loginErrorMessage = "username is incorrect";
          state.loginSuccess = false;
        } else {
          state.loginErrorMessage = payload.message;
          state.loginSuccess = false;
        }
      }
    ),
      builder.addCase(loginApiThunk.pending, (state) => {
        state.loginLoading = true;
      }),
      builder.addCase(loginApiThunk.rejected, (state) => {
        state.loginLoading = false;
        state.loginSuccess = false;
        state.loginErrorMessage =
          "Something went wrong, not your fault. We are working on it, please try again later...";
      }),
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
        }
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
