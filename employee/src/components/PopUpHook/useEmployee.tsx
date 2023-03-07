import { useState, useRef, useEffect } from "react";
import {
  SubmitErrorHandler,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, Grid } from "@mui/material";

import Gender from "../Common/Inputs/Gender";
import Email from "../Common/Inputs/Email";
import UserName from "../Common/Inputs/Name";
import Mobile from "../Common/Inputs/Mobile";
import Date from "../Common/Inputs/Date";

import {
  employeeUpdateAsync,
  employeeAddAsync,
  updatedEmployee,
  addedEmployee,
} from "../../store/employee/employeeManageSlice";
import {
  employeeAsync,
  selectEmployees,
} from "../../store/employee/employeeSlice";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { token } from "../../store/auth/authSlice";
import { AsyncStatus } from "../../store/type";
import { ModalDataType, EmployeeDetailsType } from "../../util/type";
import {
  DisplayMessage,
  FieldConstant,
  ModalStatus,
  Space,
} from "../../util/constant";
import {
  defaultEmployeeData,
  setToDisplayDate,
  matchEmployeeEdit,
} from "../../util/helper";
import useAlerts from "../hooks/useAlert";

type EmployeeFormType = {
  method: UseFormReturn<EmployeeDetailsType, any>;
};

const useUserProfile = (props: EmployeeFormType) => {
  const descriptionElementRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [validationError, setError] = useState({
    status: false,
    errorMessage: DisplayMessage.MISSING_FIELDS,
  });

  const [modalData, setModalData] = useState<ModalDataType>({
    employeeData: defaultEmployeeData,
    status: ModalStatus.ADD,
  });

  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(token);
  const update = useAppSelector(updatedEmployee);
  const add = useAppSelector(addedEmployee);
  const { employees } = useAppSelector(selectEmployees);

  const { method } = props;

  const { handleSubmit, clearErrors, reset, setValue, watch } = method;

  const { email, firstName, lastName, joinedDate, mobile, gender } = watch();

  const isErrors =
    validationError.status ||
    update.status === AsyncStatus.FAILED ||
    add.status === AsyncStatus.FAILED;

  const { displayMissingField } = useAlerts();

  const setEmployeeData = (modalStatus: ModalDataType) => {
    setModalData((status) => ({
      ...status,
      userData: modalStatus?.employeeData,
      status: modalStatus?.status,
    }));

    if (modalStatus.status === ModalStatus.EDIT && modalStatus.employeeData) {
      const { email, firstName, lastName, mobile, _id, joinedDate, gender } =
        modalStatus.employeeData;

      setValue(FieldConstant.EMAIL, email);
      setValue(FieldConstant.FIRST_NAME, firstName);
      setValue(FieldConstant.LAST_NAME, lastName);
      setValue(FieldConstant.MOBILE, mobile);
      setValue(FieldConstant.GENDER, gender);
      setValue(FieldConstant.ID, _id);
      setValue(FieldConstant.JOINED_DATE, setToDisplayDate(joinedDate));
    }
  };

  const handleClickOpen = (modalStatus: ModalDataType) => {
    setEmployeeData(modalStatus);
    setOpen(true);
  };

  const handleClose = () => {
    clearErrors();
    reset();
    setOpen(false);
  };

  useEffect(() => {
    setError((currentStatus) => ({ ...currentStatus, status: false }));
  }, [email, firstName, lastName, joinedDate, mobile, gender]);

  const onSubmit: SubmitHandler<EmployeeDetailsType> = (data) => {
    if (modalData?.status === ModalStatus.EDIT) {
      const currentEmployeeData = employees?.filter(
        (employee) => employee._id === data._id
      );

      if (matchEmployeeEdit(currentEmployeeData, data))
        return setError((currentStatus) => ({
          ...currentStatus,
          status: true,
          errorMessage: DisplayMessage.NO_CHANGES,
        }));
      dispatch(
        employeeUpdateAsync({
          employeeId: data._id,
          token: accessToken,
          employeeDetails: data,
        })
      ).then((res) => {
        if (res.payload) {
          handleClose();
          dispatch(employeeAsync(accessToken as string));
        }
      });
    }
    if (modalData?.status === ModalStatus.ADD) {
      dispatch(
        employeeAddAsync({
          token: accessToken,
          employeeDetails: data,
        })
      ).then((res) => {
        if (res.payload) {
          handleClose();
          dispatch(employeeAsync(accessToken as string));
        }
      });
    }
  };

  const onError: SubmitErrorHandler<EmployeeDetailsType> = (data) => {
    setError((currentStatus) => ({
      ...currentStatus,
      status: Object.keys(data).length > 0,
      errorMessage: DisplayMessage.MISSING_FIELDS,
    }));
  };

  const renderEmployeeProfileAction = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title" fontWeight={"bold"}>
          {modalData.status === ModalStatus.ADD
            ? ModalStatus.ADD
            : ModalStatus.EDIT}
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {displayMissingField({
              message: validationError.errorMessage,
              display: isErrors,
            })}
          </DialogContentText>
          <Box
            component="form"
            marginTop={Space.THREE}
            marginBottom={Space.THREE}
          >
            <Grid container columns={Space.TWELVE}>
              <Grid item xs={Space.SIX} padding={Space.ONE_AND_HALF}>
                <UserName name={FieldConstant.FIRST_NAME} />
              </Grid>
              <Grid item xs={Space.SIX} padding={Space.ONE_AND_HALF}>
                <UserName name={FieldConstant.LAST_NAME} />
              </Grid>
              <Grid item xs={Space.TWELVE} padding={Space.ONE_AND_HALF}>
                <Gender />
              </Grid>
              <Grid item xs={Space.TWELVE} padding={Space.ONE_AND_HALF}>
                <Email />
              </Grid>
              <Grid item xs={Space.TWELVE} padding={Space.ONE_AND_HALF}>
                <Mobile />
              </Grid>
              <Grid item xs={Space.TWELVE} padding={Space.ONE_AND_HALF}>
                <Date />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              setError((status) => ({
                ...status,
                status: false,
              }));
            }}
          >
            CANCEL
          </Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit, onError)}>
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return { renderEmployeeProfileAction, handleClickOpen };
};

export default useUserProfile;
