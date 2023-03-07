import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";

import { MenuItemType } from "../../../util/type";
import { Permission, ROUTE } from "../../../util/constant";
import useAccess from "../../hooks/useAccess";
import { displayMenuItem } from "../helper";

const drawerWidth = 240;

const LeftNavigation = () => {
  const navigator = useNavigate();
  const haveAccess = useAccess();

  const menuItems: MenuItemType[] = [
    {
      name: "Home",
      icon: <HouseOutlinedIcon />,
      key: 1,
      route: ROUTE.HOME,
      isVisible: true,
    },
    {
      name: "Chart",
      icon: <InsertChartOutlinedIcon />,
      key: 2,
      route: ROUTE.CHART,
      isVisible: haveAccess(Permission.ADMIN_CHART_ACCESS),
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.key}
              disablePadding
              sx={{ display: displayMenuItem(item.isVisible) }}
            >
              <ListItemButton onClick={() => navigator(item.route)}>
                <ListItemIcon sx={{ ml: 3 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default LeftNavigation;
