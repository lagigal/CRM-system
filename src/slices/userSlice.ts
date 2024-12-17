import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAuth, userProfile, userRegistration } from "../api/baseAPI";
import { Profile, UserRegistration } from "../constants/interfaces";
import { setCookie } from "../utils";

export const registerUserThunk = createAsyncThunk(
  "users/register",
  (value: UserRegistration) => userRegistration(value)
);

export const loginUserThunk = createAsyncThunk("users/login", userAuth); 

export const userProfileThunk = createAsyncThunk("users/profile", userProfile);

export interface UserState {
  isLoading: boolean;
  user: Profile | null;
  error: string | undefined;
}

const initialState: UserState = {
  isLoading: false,
  user: null,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectError: (sliceState) => sliceState.error,
    selectUser: (sliceState) => sliceState.user,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      });
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        setCookie("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      });
    builder
      .addCase(userProfileThunk.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })
      .addCase(userProfileThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(userProfileThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      });
  },
});

export const { selectIsLoading, selectError, selectUser } = userSlice.selectors;
