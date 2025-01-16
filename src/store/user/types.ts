import { IResponse } from "../types.ts";

export interface IUserSliceState {
  userId: number;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  image: string;
  token: string | null;
  loginLoading: boolean;
  loginErrorMessage: string | null;
  loginSuccess: boolean;
  signUpLoading: boolean;
  signUpErrorMessage: string | null;
  singUpSuccess: boolean;
}

export interface ISetUser {
  userId: number;
  firstname: string;
  lastname: string;
  username: string;
  token: string;
}

export interface IUpdateUsernameRequestDto {
  username: string;
  email: string; // for validating the user
}

export interface IUpdateEmailRequestDto {
  email: string;
  username: string; // for validating the user
}

export interface ILoginRequestDto {
  username: string;
  password: string;
}

export interface ILoginResponseDto extends IResponse {
  userId: number;
  token: string;
  username: string;
  firstName: string;
  lastName: string;
}

export interface ISignUpRequestDto {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export type ISignUpResponseDto = IResponse;
