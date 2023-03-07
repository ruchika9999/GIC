import { useEffect, useState } from "react";
import {  Box, Button, CircularProgress, Grid } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import useValidationSchema from "../../hooks/useValidationSchema";
import { useAppSelector, useAppDispatch } from "./../../../store/hooks";
import Password from "../../Common/Inputs/Password";
import Email from "../../Common/Inputs/Email";

import { selectAuth } from "../../../store/auth/authSlice";
import { authAsync } from "./../../../store/auth/authSlice";
import { AsyncStatus } from "../../../store/type";

import {
  DisplayMessage,
  FieldConstant,
  ROUTE,
  Space,
} from "../../../util/constant";
import { getLoginDefaultValues } from "../../../util/helper";
import { UserLoginType } from "../../../util/type";
import { LoginForm } from "./styles";
import useAlerts from "../../hooks/useAlert";

const Login = () => {
  const [isLoginStatusFailed, setFailedLoginStatus] = useState(false);
  const { logInValidation } = useValidationSchema();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { status } = useAppSelector(selectAuth);
  const method = useForm<UserLoginType>({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: getLoginDefaultValues(),
    resolver: yupResolver(logInValidation),
  });

  const { displayMissingField } = useAlerts();

  const { handleSubmit, watch } = method;

  const onSubmit: SubmitHandler<UserLoginType> = (data) => {
    dispatch(authAsync(data));
  };

  const onError: SubmitErrorHandler<UserLoginType> = (data) => {
    setFailedLoginStatus(true);
  };

  const isLoginSuccess = status === AsyncStatus.SUCCESS;
  const isLoading = status === AsyncStatus.LOADING;
  const isLoginFailed = status === AsyncStatus.FAILED;
  const isEmailUpdate = watch(FieldConstant.EMAIL);
  const isPasswordUpdate = watch(FieldConstant.PASSWORD);

  useEffect(() => {
    if (isLoginSuccess) {
      navigate(ROUTE.HOME);
    }
    if (isLoginFailed) {
      setFailedLoginStatus(true);
    }
  }, [status]);

  useEffect(() => {
    setFailedLoginStatus(false);
  }, [isEmailUpdate, isPasswordUpdate]);

  return (
    <FormProvider {...method}>
      <LoginForm marginTop={Space.SIX}>
        <Box
          component="form"
          marginTop={Space.THREE}
          marginBottom={Space.THREE}
          sx={{ flexGrow: 1 }}
        >
          <Grid container columns={Space.TWELVE}>
            {isLoginStatusFailed && (
              <Grid item xs={12} sx={{ mb: 2 }} padding={Space.ONE_AND_HALF}>
                {displayMissingField({
                  message: DisplayMessage.FAILED_TO_LOGIN,
                  display: isLoginStatusFailed,
                  fullWith : true
                })}
              </Grid>
            )}

            <Grid item xs={12} padding={Space.ONE_AND_HALF}>
              <Email />
            </Grid>
            <Grid xs={12} padding={Space.ONE_AND_HALF}>
              <Password />
            </Grid>
          </Grid>
          <Grid item xs={12} padding={Space.ONE_AND_HALF}>
            <Button
              fullWidth
              type="button"
              variant="contained"
              onClick={handleSubmit(onSubmit, onError)}
            >
              {isLoading ? <CircularProgress /> : "Log in"}
            </Button>
          </Grid>
        </Box>
      </LoginForm>
    </FormProvider>
  );
};

export default Login;
