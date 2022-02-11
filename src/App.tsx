import { Box, Button, HStack, Text } from '@chakra-ui/react';
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
import Concert from './routes/concert/Concert';
import Home from './routes/Home';
import Homes from './routes/Homes';
import LoginPage, { RequireAuth } from './routes/Login';

// <div className="App">
//   <header className="App-header"></header>
//   {/* <nav
//     style={{
//       borderBottom: 'solid 1px',
//       paddingBottom: '1rem',
//     }}
//   >
//     <Link to="/home">home</Link> | <Link to="/login">login</Link>
//   </nav> */}
//   <Outlet />
// </div>;

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
    <div>
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
    </div>
  );
}

const MainPage = () => {
  return (
    <Box>
      <Text>Main Page!</Text>
    </Box>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />}></Route>
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<RequireAuth />}>
            <Route path="/home" element={<Homes />}></Route>
            <Route path="/concert" element={<Concert />}></Route>

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
