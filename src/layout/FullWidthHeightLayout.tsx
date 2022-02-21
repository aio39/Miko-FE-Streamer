import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

const FullWidthHeightLayout = () => {
  return (
    <Box width="full" height="100vh">
      <Outlet />
    </Box>
  );
};

export default FullWidthHeightLayout;
