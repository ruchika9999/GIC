import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { containerStyle } from "../../../util/constant";

const Loader = () => {
  return (
    <Box component="main" sx={containerStyle}>
      <CircularProgress />
    </Box>
  );
};

export default Loader;
