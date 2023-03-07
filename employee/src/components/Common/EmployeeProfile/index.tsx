import React from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ModeOutlinedIcon from "@mui/icons-material/ModeOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, Button, Divider } from "@mui/material";

import { useDeleteConfirm } from "../../PopUpHook/useDeleteConfirm";

import { token } from "../../../store/auth/authSlice";
import { employeeDeleteAsync } from "./../../../store/employee/employeeManageSlice";
import { updateEmployeeList } from "../../../store/employee/employeeSlice";
import { useAppSelector, useAppDispatch } from "./../../../store/hooks";

import { ModalStatus } from "../../../util/constant";
import { formatDate } from "../../../util/helper";
import { subDetails, subHeader } from "../helper";
import { ProfileActionType, EmployeeDetailsType } from "../../../util/type";

const EmployeeProfile = (profile: EmployeeDetailsType & ProfileActionType) => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(token);

  const {
    firstName,
    lastName,
    gender,
    mobile,
    joinedDate,
    email,
    index,
    employeeCount,
    handleClickOpen,
    _id,
  } = profile;
  const { renderDeleteConfirm, handleDeleteConfirmOpen, handleClose } =
    useDeleteConfirm({
      userName: `${firstName} ${lastName}`,
      deleteEmployee: () => {
        const params = { token: accessToken, employeeId: _id };
        dispatch(employeeDeleteAsync(params)).then((data) =>
          dispatch(updateEmployeeList(data.payload as EmployeeDetailsType))
        );
        handleClose();
      },
    });

  const isLastRow = index !== employeeCount;

  const employeeData = {
    firstName,
    lastName,
    gender,
    mobile,
    joinedDate,
    email,
    _id,
  };

  return (
    <>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          {" "}
          <Avatar />
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="subtitle1"
              color="text.primary"
              fontWeight={"bold"}
            >
              {firstName} {lastName}
            </Typography>
          }
          secondary={
            <React.Fragment>
              <Box display={"flex"}>
                <Box>
                  <Typography variant="overline" {...subHeader}>
                    Email :
                  </Typography>

                  <Typography {...subDetails} variant="body2">
                    {email}
                  </Typography>
                </Box>
                <Box marginLeft={3}>
                  <Typography {...subHeader} variant="overline">
                    Mobile :
                  </Typography>
                  <Typography {...subDetails} variant="body2">
                    {mobile}
                  </Typography>
                </Box>
                <Box marginLeft={3}>
                  <Typography {...subHeader} variant="overline">
                    Gender :
                  </Typography>

                  <Typography {...subDetails} variant="body2">
                    {gender}
                  </Typography>
                </Box>
                <Box marginLeft={3}>
                  <Typography {...subHeader} variant="overline">
                    Joined date :
                  </Typography>

                  <Typography {...subDetails} variant="body2">
                    {formatDate(joinedDate)}
                  </Typography>
                </Box>
              </Box>
            </React.Fragment>
          }
        />
        <Box marginTop={2.5}>
          <Button
            sx={{ mr: 1 }}
            onClick={() => handleDeleteConfirmOpen()}
            size="medium"
            color="error"
            startIcon={<DeleteOutlineOutlinedIcon />}
          >
            DELETE
          </Button>
          <Button
            onClick={() =>
              handleClickOpen({ employeeData, status: ModalStatus.EDIT })
            }
            size="medium"
            startIcon={<ModeOutlinedIcon />}
          >
            Edit
          </Button>
        </Box>
      </ListItem>
      {isLastRow && <Divider variant="inset" component="li" />}
      {renderDeleteConfirm()}
    </>
  );
};

export default EmployeeProfile;
