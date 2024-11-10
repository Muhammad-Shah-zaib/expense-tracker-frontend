import { IResponse } from "../types.ts";

export interface IUserSliceState {
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  image: string;
  token: string | null;
}

export interface ISetUser {
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
  token: string;
  username: string;
  firstname: string;
  lastname: string;
}
