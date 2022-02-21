import { Box, Button, HStack } from '@chakra-ui/react';
import SidebarWithHeader from 'layout/SidebarLayout';
import Concert from 'pages/concert/Concert';
import Home from 'pages/Home';
import Homes from 'pages/Homes';
import LoginPage, { RequireAuth } from 'pages/Login';
import MainPage from 'pages/Main';
import SuccessLogin from 'pages/SuccessLogin';
import React from 'react';
import {
  BrowserRouter,
  Link,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import './App.css';
import { isLoginState } from './recoil/authState';

function AuthStatus() {
  const isLogin = useRecoilValue(isLoginState);
  let navigate = useNavigate();

  if (!isLogin) {
    return <Box bg="red">AtuhStatus - You are not logged in.</Box>;
  }

  return (
    <p>
      Welcome {isLogin}!{' '}
      <button
        onClick={() => {
          // singout
        }}
      >
        Sign out
      </button>
    </p>
  );
}

function Layout() {
  return (
    <Box width="full" height="100vh">
      <AuthStatus />
      <HStack>
        <Button>
          <Link to="/">Public Page</Link>
        </Button>
        <Button>
          <Link to="/concert">Protected Page</Link>
        </Button>
      </HStack>
      <Outlet />
    </Box>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="test" element={<SidebarWithHeader />}>
            <Route path="" element={<Box>aaa</Box>} />
          </Route>
          <Route path="test/:id">
            <Route path="" element={<Box>bbb</Box>} />
          </Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="login/suscess" element={<SuccessLogin />} />
          <Route path="my" element={<RequireAuth />}>
            <Route path="home" element={<Homes />}></Route>
            <Route path="concert" element={<Concert />}></Route>
            <Route
              index
              element={
                <main style={{ padding: '1rem' }}>
                  <p>Index로 기본 설정</p>
                </main>
              }
            />
            <Route path=":homeId" element={<Home />} />
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: '1rem' }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
