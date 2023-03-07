import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Typography } from "@mui/material";

import EmployeeProfile from "../../Common/EmployeeProfile";
import Loader from "../../Common/Loader";
import useEmployee from "../../PopUpHook/useEmployee";
import { useAppSelector, useAppDispatch } from "./../../../store/hooks";
import employeeValidationSchema from "../../hooks/useValidationSchema";

import { selectAuth } from "../../../store/auth/authSlice";
import { selectEmployees } from "../../../store/employee/employeeSlice";
import { employeeAsync } from "./../../../store/employee/employeeSlice";

import { containerStyle, ListStyle, ModalStatus } from "../../../util/constant";
import { getEmployeeProfileDefaultValue } from "../../../util/helper";
import { AsyncStatus } from "../../../store/type";
import { EmployeeDetailsType } from "../../../util/type";

const Home = () => {
  const { employeeValidation } = employeeValidationSchema();
  const dispatch = useAppDispatch();
  const { employees, status } = useAppSelector(selectEmployees);

  const user = useAppSelector(selectAuth);

  const method = useForm<EmployeeDetailsType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: getEmployeeProfileDefaultValue(),
    resolver: yupResolver(employeeValidation),
  });

  const { renderEmployeeProfileAction, handleClickOpen } = useEmployee({
    method,
  });

  useEffect(() => {
    dispatch(employeeAsync(user?.value?.accessToken as string));
  }, []);

  return (
    <FormProvider {...method}>
      {status === AsyncStatus.SUCCESS && (
        <Box component="main" sx={containerStyle}>
          <Box sx={{ justifyContent: "space-between", display: "flex" }}>
            <Box>
              <Typography
                component="span"
                variant="subtitle1"
                color="text.primary"
                fontWeight={"bold"}
              >
                EMPLOYEE LIST
              </Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
              <Button
                variant="contained"
                onClick={() => handleClickOpen({ status: ModalStatus.ADD })}
              >
                ADD NEW
              </Button>
            </Box>
          </Box>
          <List sx={ListStyle}>
            {employees?.map((item, index) => {
              const profile = {
                ...item,
                index: index + 1,
                employeeCount: employees.length || 0,
                handleClickOpen,
              };
              return <EmployeeProfile {...profile} key={index} />;
            })}
          </List>
        </Box>
      )}
      {status === AsyncStatus.LOADING && <Loader />}

      {renderEmployeeProfileAction()}
    </FormProvider>
  );
};

export default Home;
