import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAuth, userLogout, userProfile, userRegistration } from "../api/baseAPI";
import { Profile, UserRegistration } from "../constants/interfaces";

export const registerUserThunk = createAsyncThunk(
  "users/register",
  (value: UserRegistration) => userRegistration(value)
);

export const loginUserThunk = createAsyncThunk("users/login", userAuth); 
export const logoutUserThunk = createAsyncThunk("users/logout", userLogout); 

export const userProfileThunk = createAsyncThunk("users/profile", userProfile);

export interface UserState {
  isLoading: boolean;
  isAuthUser: boolean;
  user: Profile | null;
  error: string | undefined;
}

const initialState: UserState = {
  isLoading: false,
  isAuthUser: false,
  user: null,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  selectors: {
    selectIsLoading: (sliceState) => sliceState.isLoading,
    selectIsAuthUser: (sliceState) => sliceState.isAuthUser,
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
        state.isAuthUser = true;
        localStorage.setItem("accessToken", action.payload.accessToken);
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
        state.isAuthUser = true;
        state.user = action.payload;
      });
    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.error = "";
        state.isLoading = true;
      })
      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthUser = false;
      });
  },
});

export const { selectIsLoading, selectIsAuthUser, selectError, selectUser } = userSlice.selectors;
