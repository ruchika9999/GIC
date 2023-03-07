import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTokenData, RESET } from "../helper";

import {
  AccessToken,
  AsyncStatus,
  UserCredentialType,
  UserType,
} from "../type";
import { UserApi } from "./../../api/auth";
import { RootState } from "./../store";

export interface AuthState {
  value: AccessToken | null;
  status: AsyncStatus;
  userProfile: UserType | null;
}

const initialStateProfile = { email: "", roles: [], userName: "", id: "" };

const initialState: AuthState = {
  value: null,
  status: AsyncStatus.INITIAL,
  userProfile: initialStateProfile,
};

const users = new UserApi();

export const authAsync = createAsyncThunk(
  "auth user",
  async (user: UserCredentialType) => {
    const response = await users.getUsers(user);
    return response.data;
  }
);

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.value = RESET;
      state.userProfile = initialStateProfile;
      state.status = AsyncStatus.INITIAL;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authAsync.pending, (state: AuthState) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(authAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.value = action.payload;
        state.userProfile = getTokenData(action.payload.accessToken);
      })
      .addCase(authAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const { logout } = auth.actions;

export const selectAuth = (state: RootState) => state.authUser;
export const token = (state: RootState) => state.authUser.value?.accessToken;

export default auth.reducer;
