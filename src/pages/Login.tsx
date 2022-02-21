import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isLoginState } from 'recoil/authState';
import useColorStore from 'state/hooks/useColorStore';
import { useLogin } from 'state/swr/useUser';

export { RequireAuth };

function RequireAuth({}: {}) {
  const isLogin = useRecoilValue(isLoginState);
  const location = useLocation();
  console.log('is login ?', isLogin);
  if (!isLogin) {
    return (
      <div>
        <Navigate to="/login" state={{ from: location }} replace />
      </div>
    );
  }

  return <Outlet />;
}

const LoginPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<{ email: string; password: string }>({ mode: 'all' });
  const setLoginState = useSetRecoilState(isLoginState);

  const onSubmit = async (data: any) => {
    const result = await useLogin(data);
    console.log(result);
    if (result) {
      setLoginState(true);
      navigate('/');
    }
  };

  const fromPathname =
    ((location.state as any)?.from?.pathname as string) || undefined || '/';

  return (
    <Box>
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorStore('background')}
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={8} px={2}>
          <Stack align={'center'}>
            <Heading fontSize={'6xl'}>Marusuku</Heading>
          </Stack>
          <Box
            rounded="lg"
            bg={useColorStore('surface')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl id="email" isInvalid={!!errors.email}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    id="email"
                    {...register('email', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={!!errors.password}>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    id="password"
                    {...register('password', {
                      required: 'This is required',
                      minLength: {
                        value: 4,
                        message: 'Minimum length should be 4',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: 'column', sm: 'row' }}
                    align={'start'}
                    justify={'space-between'}
                  >
                    <Checkbox>Remember me</Checkbox>
                    <Link color={'blue.400'}>비밀번호 찾기</Link>
                    <Link color={'blue.400'}>회원가입</Link>
                  </Stack>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    로그인
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default LoginPage;
