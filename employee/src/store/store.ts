import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


import authReducer, { AuthState } from "./auth/authSlice";
import authEmployeeReducer, { EmployeeState } from "./employee/employeeSlice";
import manageEmployeeReducer, { ManageState } from "./employee/employeeManageSlice";
import employeeSummeryReducer, { SummeryState } from "./employee/employeeSummery";

// Define the interface for the root state
interface Root {
  authUser: AuthState;
  employee: EmployeeState;
  deleteEmployee: ManageState;
  updateEmployee: ManageState;
  addEmployee: ManageState;
  employeeSummery: SummeryState;
}

// Combine the reducers into a root reducer
const rootReducer = combineReducers<Root>({
  authUser: authReducer,
  employee: authEmployeeReducer,
  deleteEmployee: manageEmployeeReducer.delete,
  updateEmployee: manageEmployeeReducer.update,
  addEmployee: manageEmployeeReducer.add,
  employeeSummery: employeeSummeryReducer,
});

// Create the persist config object
const persistConfig = {
  key: "root",
  storage,
};

// Wrap the root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
export const persistor = persistStore(store);

// Define the types for the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
