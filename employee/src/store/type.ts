import { EmployeeDetailsType } from "../util/type";

export enum AsyncStatus {
  SUCCESS = "success",
  FAILED = "failed",
  INITIAL = "initial",
  LOADING = "loading",
}

export type UserCredentialType = {
  email: string;
  password: string;
};

export type AccessToken = {
  accessToken: string;
};

export type UserType = {
  email: string;
  id: string;
  userName: string;
  roles: string[] | undefined;
};

export type LoginUserType = {
  user: UserType;
};

export type EmployeeDeleteType = {
  token: string | undefined;
  employeeId: string;
};

export type EmployeeUpdateType = {
  token: string | undefined;
  employeeDetails: EmployeeDetailsType;
  employeeId: string;
};

export type EmployeeAddType = {
  token: string | undefined;
  employeeDetails: EmployeeDetailsType;
};