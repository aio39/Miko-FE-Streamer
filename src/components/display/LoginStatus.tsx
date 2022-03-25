import { Box, Button, HStack } from "@chakra-ui/react";
import { isLoginState } from "@src/state/recoil/authState";
import { axiosI } from "@src/state/swr/fetcher";
import { useUser } from "@src/state/swr/useUser";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const { mutate } = useUser();
  const logoutHandler = async () => {
    const isLogoutSuccess = await axiosI.get<boolean>("/logout");

    if (isLogoutSuccess) {
      navigate("/");
      setTimeout(() => {
        mutate(undefined, { revalidate: false });
      }, 1000);
    }
  };

  return (
    <Button size="sm" variant="outline" colorScheme="teal" onClick={logoutHandler}>
      Logout
    </Button>
  );
};

const LoginStatus = () => {
  const isLogin = useRecoilValue(isLoginState);
  const [isShow, setIsShow] = useState(true);

  return (
    <HStack position="fixed" top="1" right="1" zIndex="100" bgColor="white" border="2px" width="auto">
      {isShow && (
        <Box>
          {isLogin ? "Login!" : "Not Login"}
          {/* <LogoutBtn /> */}
        </Box>
      )}
      <Button
        width="1"
        onClick={() => {
          setIsShow(prev => !prev);
        }}
      ></Button>
    </HStack>
  );
};

export default LoginStatus;
