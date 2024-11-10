import { createAsyncThunk } from "@reduxjs/toolkit";
import { ILoginRequestDto, ILoginResponseDto, IUserSliceState } from "./types";
import { LOGIN_URL } from "../../environment/development";

// actions
const LOGIN_API = "user/login";

// Thunk to handle login API call
const loginApiThunk = createAsyncThunk<
  ILoginResponseDto,
  ILoginRequestDto,
  { state: IUserSliceState }
>(LOGIN_API, async (requestDto, { rejectWithValue }) => {
  try {
    // Make the POST request with username and password in the body
    const response = await fetch(LOGIN_URL, {
      method: "POST", // Use POST method
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
      },
      body: JSON.stringify(requestDto), // Send username and password in the body
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      const errorData = await response.json();
      return rejectWithValue(errorData); // Reject with error message if not ok
    }

    // Parse and return the JSON response on success
    const data: ILoginResponseDto = await response.json();
    return data;
  } catch (error) {
    // Handle network or other errors
    return rejectWithValue({
      message: error || "Something went wrong",
    });
  }
});

export default loginApiThunk;
