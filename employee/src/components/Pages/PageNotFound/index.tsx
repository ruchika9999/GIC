import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACK_BUTTON_NAME, ROUTE, Space } from "../../../util/constant";
import { Box, Button,Typography } from "@mui/material";
import { useAppSelector } from "../../../store/hooks";
import { selectAuth } from "../../../store/auth/authSlice";

const BadRoute = () => {
  const [buttonStatus, setButtonName] = useState({
    name: BACK_BUTTON_NAME.BACK_TO_HOME,
    route: ROUTE.HOME,
  });

  const profile = useAppSelector(selectAuth);
  const navigator = useNavigate();

  useEffect(() => {

    if (profile.userProfile?.id) {
      setButtonName((state) => ({
        ...state,
        name: BACK_BUTTON_NAME.BACK_TO_HOME,
        route: ROUTE.HOME,
      }));
    } else {
      setButtonName((state) => ({
        ...state,
        name: BACK_BUTTON_NAME.BACK_TO_LOGIN,
        route: ROUTE.LOGIN,
      }));
    }
  }, [profile]);

  const goBack = () => {
    navigator(buttonStatus.route);
  };

  return (
    <Box
      component="form"
      marginTop={Space.THREE}
      marginBottom={Space.THREE}
      sx={{
        flexGrow: 1,
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection : "column"
    
      }}
    >

      <Typography
        component="span"
        variant="subtitle1"
        color="text.primary"
        fontWeight={"bold"}
        sx={{mb :2}}
      >
        PAGE NOT FOUND
      </Typography>
      <Button type="button" variant="contained" onClick={() => goBack()}>
        {buttonStatus.name}
      </Button>
    </Box>
  );
};

export default BadRoute;
