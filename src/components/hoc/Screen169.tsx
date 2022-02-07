import { AspectRatio, Box } from '@chakra-ui/react';
import { FC } from 'react';

const Screen169: FC = ({ children }) => {
  return (
    <AspectRatio
      position="relative"
      ratio={16 / 9}
      bgColor="blackAlpha.300"
      m="4"
    >
      <Box position="absolute" with="full" height="full">
        {children}
      </Box>
    </AspectRatio>
  );
};

export default Screen169;
