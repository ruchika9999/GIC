import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AsyncStatus,
  EmployeeUpdateType,
  EmployeeDeleteType,
  EmployeeAddType,
} from "../type";
import { Employee } from "../../api/employee";
import { RootState } from "../store";
import { EmployeeDetailsType } from "../../util/type";

export interface ManageState {
  employee: EmployeeDetailsType | null;
  status: AsyncStatus;
}

const initialState: ManageState = {
  employee: null,
  status: AsyncStatus.INITIAL,
};

export const employeeDeleteAsync = createAsyncThunk(
  "delete employee list",
  async (employee: EmployeeDeleteType) => {
    const api = new Employee();
    const response = await api.deleteEmployee(employee);
    return response.data;
  }
);

export const employeeUpdateAsync = createAsyncThunk(
  "delete employee list",
  async (employee: EmployeeUpdateType) => {
    const api = new Employee();
    const response = await api.updateEmployee(employee);
    return response.data;
  }
);

export const employeeAddAsync = createAsyncThunk(
  "delete employee list",
  async (employee: EmployeeAddType) => {
    const api = new Employee();
    const response = await api.addEmployee(employee);
    return response.data;
  }
);

export const deleteEmployee = createSlice({
  name: "employee delete",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(employeeDeleteAsync.pending, (state) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(employeeDeleteAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.employee = action.payload;
      })
      .addCase(employeeDeleteAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const updateEmployee = createSlice({
  name: "employee update",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(employeeUpdateAsync.pending, (state) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(employeeUpdateAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.employee = action.payload;
      })
      .addCase(employeeUpdateAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

export const addEmployee = createSlice({
  name: "add update",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(employeeUpdateAsync.pending, (state) => {
        state.status = AsyncStatus.LOADING;
      })
      .addCase(employeeUpdateAsync.fulfilled, (state, action) => {
        state.status = AsyncStatus.SUCCESS;
        state.employee = action.payload;
      })
      .addCase(employeeUpdateAsync.rejected, (state) => {
        state.status = AsyncStatus.FAILED;
      });
  },
});

const manageEmployee = {
  delete: deleteEmployee.reducer,
  update: updateEmployee.reducer,
  add: addEmployee.reducer,
};

export const deletedEmployee = (state: RootState) => state.deleteEmployee;
export const updatedEmployee = (state: RootState) => state.updateEmployee;
export const addedEmployee = (state: RootState) => state.addEmployee;

export default manageEmployee;
