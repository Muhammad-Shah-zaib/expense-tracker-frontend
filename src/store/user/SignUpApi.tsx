import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ISignUpRequestDto,
  ISignUpResponseDto,
  IUserSliceState,
} from "./types.ts";
import { SIGN_UP_URL } from "../../environment/development.ts";
import { delay } from "../../utils/delay.ts";

const SIGN_UP_API = "SIGN_UP_API";
export const SignUpApiThunk = createAsyncThunk<
  ISignUpResponseDto,
  ISignUpRequestDto,
  { state: IUserSliceState }
>(SIGN_UP_API, async (requestDto) => {
  const response = await fetch(SIGN_UP_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestDto),
  });
  await delay(250);
  return await response.json();
});
