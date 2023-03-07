import dayjs, { Dayjs } from "dayjs";
import { DATE_FORMAT, FieldConstant } from "./constant";
import { EmployeeDetailsType } from "./type";

export const getEmployeeProfileDefaultValue = () => {
  return {
    [FieldConstant.EMAIL]: "",
    [FieldConstant.FIRST_NAME]: "",
    [FieldConstant.LAST_NAME]: "",
    [FieldConstant.GENDER]: "",
    [FieldConstant.MOBILE]: "",
    [FieldConstant.JOINED_DATE]: "",
  };
};

export const getLoginDefaultValues = () => {
  return {
    [FieldConstant.EMAIL]: "",
    [FieldConstant.PASSWORD]: "",
  };
};

export const defaultEmployeeData: EmployeeDetailsType = {
  email: "",
  firstName: "",
  lastName: "",
  gender: "",
  mobile: "",
  _id: "",
  joinedDate: "",
};

export const formatDate = (date: string | Dayjs) =>
  dayjs(date).format(DATE_FORMAT);

export const setToDisplayDate = (date: string | Dayjs) => dayjs(date);

export const matchEmployeeEdit = (
  currentEmployeeData: EmployeeDetailsType[] | undefined,
  editedEmployeeData: EmployeeDetailsType
): boolean => {
  const [employee] = currentEmployeeData as EmployeeDetailsType[];

  const { _id, email, firstName, lastName, gender, joinedDate, mobile } =
    employee;

  const current = {
    gender,
    joinedDate: formatDate(joinedDate),
    mobile,
    lastName,
    firstName,
    email,
    _id,
  };
  const edit = {
    ...editedEmployeeData,
    joinedDate: formatDate(editedEmployeeData.joinedDate),
  };

  return JSON.stringify(current) === JSON.stringify(edit);
};
