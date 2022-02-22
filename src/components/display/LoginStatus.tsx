import { Box, Button, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { isLoginState } from 'state/recoil/authState';

const LoginStatus = () => {
  const isLogin = useRecoilValue(isLoginState);
  const [isShow, setIsShow] = useState(true);

  return (
    <HStack
      position="fixed"
      top="1"
      right="1"
      zIndex="100"
      bgColor="white"
      border="2px"
      width="auto"
    >
      {isShow && <Box>{isLogin ? 'Login!' : 'Not Login'}</Box>}
      <Button
        width="1"
        onClick={() => {
          setIsShow((prev) => !prev);
        }}
      ></Button>
    </HStack>
  );
};

export default LoginStatus;
