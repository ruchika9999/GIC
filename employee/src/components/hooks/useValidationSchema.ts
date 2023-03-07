import { object, string } from "yup";
import { FieldConstant, Name } from "../../util/constant";

import "yup-phone-lite";


const employeeValidationSchema = () => {
  const emailValidation = string()
    .required("Email is required")
    .email("Must be a valid email");

  const nameValidation = (name: Name) => {
    return string()
      .required(
        name === Name.FIRST ? "First Name is required" : "Last Name is required"
      )
      .test("Test min length", "Minimum 6 characters", (value) => {
        return value.length >= 6;
      });
  };
  const mobileValidation = string()
    .phone("SG", "Please enter a valid phone number")
    .required("A phone number is required");

  const genderValidation = string().required("Gender is required");

  const dateValidation = string().required("Date is Required");

  const passwordValidation = string().required("Password is Required");

  const employeeValidation = {
    [FieldConstant.EMAIL]: emailValidation,
    [FieldConstant.FIRST_NAME]: nameValidation(Name.FIRST),
    [FieldConstant.LAST_NAME]: nameValidation(Name.LAST),
    [FieldConstant.MOBILE]: mobileValidation,
    [FieldConstant.JOINED_DATE]: dateValidation,
    [FieldConstant.GENDER]: genderValidation,
  };

  const logInValidation = {
    [FieldConstant.EMAIL]: emailValidation,
    [FieldConstant.PASSWORD]: passwordValidation,
  };

  return {
    employeeValidation: object(employeeValidation),
    logInValidation: object(logInValidation),
  };
};

export default employeeValidationSchema;
