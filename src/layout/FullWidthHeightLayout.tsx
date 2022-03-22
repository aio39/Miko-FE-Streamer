import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const FullWidthHeightLayout = () => {
  return (
    <Box width="100vw" height="100vh">
      <Outlet />
    </Box>
  );
};

export default FullWidthHeightLayout;
