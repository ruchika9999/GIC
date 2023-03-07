import axios, { Axios } from "axios";
import {
  EmployeeAddType,
  EmployeeDeleteType,
  EmployeeUpdateType,
} from "../store/type";
import { EmployeeDetailsType , SummeryType } from "../util/type";

export class Employee {
  _url: String;
  _network: Axios;

  constructor() {
    this._url = "http://localhost:5001/api/employee";
    this._network = axios;
  }

  fetchEmployeeList = (token: string | undefined) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this._network.get<EmployeeDetailsType[]>(`${this._url}/all`, {
      headers,
    });
  };

  addEmployee = (employee: EmployeeAddType) => {
    const { employeeDetails, token } = employee;

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this._network.post<EmployeeDetailsType>(
      `${this._url}/create`,
      employeeDetails,
      {
        headers,
      }
    );
  };

  deleteEmployee = (employee: EmployeeDeleteType) => {
    const { employeeId, token } = employee;
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this._network.delete<EmployeeDetailsType>(`${this._url}/${employeeId}`, {
      headers,
    });
  };

  updateEmployee = (employee: EmployeeUpdateType) => {
    const { employeeId, employeeDetails, token } = employee;

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this._network.put<EmployeeDetailsType>(
      `${this._url}/${employeeId}`,
      employeeDetails,
      { headers }
    );
  };

  fetchEmployeeSummery = (token: string | undefined) => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this._network.get<SummeryType[]>(`${this._url}/summery`, {
      headers,
    });
  };
}
