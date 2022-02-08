import { AspectRatio, Box } from '@chakra-ui/react';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { screenImageState } from '../../recoil/screenImage';
import FileInputBtn from '../button/FileInputBtn';

const Screen169: FC = ({ children }) => {
  const imageUrl = useRecoilValue(screenImageState);
  return (
    <AspectRatio
      position="relative"
      ratio={16 / 9}
      bgColor="blackAlpha.300"
      background={imageUrl && `url(${imageUrl})`}
      backgroundSize="cover"
      m="4"
    >
      <Box position="absolute" with="full" height="full">
        {children}
        <FileInputBtn />
      </Box>
    </AspectRatio>
  );
};

export default Screen169;
