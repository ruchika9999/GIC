import Box from "@mui/material/Box";

import LeftNavigation from "../../Common/LeftNavigation";
import TopNavigation from "../../Common/TopNavigation";

function withLayout() {
  return (WrapperComponent: React.ComponentType) =>
    (props: JSX.IntrinsicAttributes) =>
      (
        <Box sx={{ display: "flex" }}>
          <TopNavigation />
          <LeftNavigation />
          <WrapperComponent {...props} />
        </Box>
      );
}

export default withLayout;
