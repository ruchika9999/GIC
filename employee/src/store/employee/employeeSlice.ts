import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AsyncStatus } from "../type";
import { Employee } from "../../api/employee";
import { AppThunk, RootState } from "../store";
import { EmployeeDetailsType } from "../../util/type";

export interface EmployeeState {
  employees: EmployeeDetailsType[] | null;
  status: AsyncStatus;
}

const initialState: EmployeeState = {
  employees: [],
  status: AsyncStatus.INITIAL,
};


export const employeeAsync = createAsyncThunk(
  "fetch employee list",
  async (token: string) => {
    const api = new Employee();
    const response = await api.fetchEmployeeList(token);
    return response.data;
  }
);


export const employee = createSlice({
  name: "employee",
  initialState,
  reducers: {
    updateEmployees: (state, action) => {
      state.employees = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(employeeAsync.pending, (state) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(employeeAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.employees = action.payload;
      })
      .addCase(employeeAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const selectEmployees = (state: RootState) => state.employee;

export const { updateEmployees } = employee.actions;

export const updateEmployeeList =
  (deletedEmployee: EmployeeDetailsType): AppThunk =>
  (dispatch, getState) => {
    const employeeState = selectEmployees(getState());
    const newState = employeeState.employees?.filter(
      (employee) => employee._id !== deletedEmployee._id
    );
    dispatch(updateEmployees(newState));
    return employeeState;
  };

export default employee.reducer;
