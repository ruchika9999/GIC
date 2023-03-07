import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";

import { logout, selectAuth } from "./../../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import useAccess from "../../hooks/useAccess";
import { Permission, ROUTE } from "../../../util/constant";
import { MenuItemType } from "../../../util/type";
import { displayMenuItem } from "../helper";

const TopNavigation = () => {
  const navigator = useNavigate();
  const haveAccess = useAccess();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuth)


  const menuItems: MenuItemType[] = [
    {
      name: "Home",
      key: 1,
      route: ROUTE.HOME,
      isVisible: true,
    },
    {
      name: "Chart",
      key: 2,
      route: ROUTE.CHART,
      isVisible: haveAccess(Permission.ADMIN_CHART_ACCESS),
    },
  ];

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Box sx={{ ml: 5, mr: 5 }}>
        <Toolbar disableGutters>
          <BadgeOutlinedIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            EMPLOYEE
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user.userProfile?.userName} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menuItems.map((item) => (
                <MenuItem
                  key={item.key}
                  onClick={() => navigator(item.route)}
                  sx={{ display: displayMenuItem(item.isVisible) }}
                >
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
              <MenuItem onClick={logOut}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default TopNavigation;
