import { IUpdateUserRequestDto, IUserSliceState } from "./types.ts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import profileImage from "../../../public/me-welcome-seecs.jpeg";

const initialState: IUserSliceState = {
  name: "Muhammad Shahzaib",
  email: "MuhammdShahzaib@outlook.com",
  username: "Pace-Setter",
  image: profileImage,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(
      state,
      { payload: { name, image } }: PayloadAction<IUpdateUserRequestDto>,
    ) {
      state.name = name;
      state.image = image;
    },
  },
});

export default userSlice.reducer;

export const { updateUser } = userSlice.actions;
