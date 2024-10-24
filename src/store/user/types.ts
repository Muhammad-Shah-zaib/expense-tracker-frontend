export interface IUserSliceState {
  name: string;
  email: string;
  username: string;
  image: string;
}

export interface IUpdateUserRequestDto {
  name: string;
  image: string;
  username: string; // for validating the user
}

export interface IUpdateUsernameRequestDto {
  username: string;
  email: string; // for validating the user
}

export interface IUpdateEmailRequestDto {
  email: string;
  username: string; // for validating the user
}
