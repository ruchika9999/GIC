import { ReactNode } from "react";
import { Dayjs } from "dayjs";
import { FieldConstant, ModalStatus, ROUTE } from "./constant";

export type MenuItemType = {
  name: string;
  icon?: ReactNode;
  key: number;
  route: ROUTE;
  isVisible: boolean;
};

export type SummeryType ={
  year : number,
  total : number
}


export type EmployeeDetailsType = {
  [FieldConstant.EMAIL]: string;
  [FieldConstant.FIRST_NAME]: string;
  [FieldConstant.LAST_NAME]: string;
  [FieldConstant.GENDER]: string;
  [FieldConstant.JOINED_DATE]: Dayjs | string;
  [FieldConstant.MOBILE]: string;
  [FieldConstant.ID]: string;
};


export type ModalDataType = {
  employeeData?: EmployeeDetailsType;
  status: ModalStatus;
};

export type ProfileActionType = {
  index: number;
  employeeCount: number;
  handleClickOpen: (modalData: ModalDataType) => void;
};



export type UserLoginType = {
  [FieldConstant.EMAIL]: string;
  [FieldConstant.PASSWORD]: string;
};
