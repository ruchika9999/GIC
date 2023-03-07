import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncStatus } from "../type";
import { Employee } from "../../api/employee";
import {  RootState } from "../store";
import { SummeryType } from "../../util/type";

export interface SummeryState {
  employeesSummery: SummeryType[] | null;
  status: AsyncStatus;
}

const initialState: SummeryState = {
    employeesSummery: [],
  status: AsyncStatus.INITIAL,
};


export const employeeSummeryAsync = createAsyncThunk(
  "fetch employee list",
  async (token: string | undefined) => {
    const api = new Employee();
    const response = await api.fetchEmployeeSummery(token);
    return response.data;
  }
);


export const employeeSummery = createSlice({
  name: "employee summery",
  initialState,
  reducers: {
    updateEmployees: (state, action) => {
      state.employeesSummery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(employeeSummeryAsync.pending, (state) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(employeeSummeryAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.employeesSummery = action.payload;
      })
      .addCase(employeeSummeryAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const summery = (state: RootState) => state.employeeSummery;


export default employeeSummery.reducer;
