import { Box } from "@chakra-ui/react";
import ErrorBoundary from "@src/components/common/ErrorBoundary";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const FullWidthHeightLayout = () => {
  return (
    <Box width="100vw" height="100vh">
      <ErrorBoundary>
        <Suspense fallback={() => <Box>loading</Box>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};

export default FullWidthHeightLayout;
