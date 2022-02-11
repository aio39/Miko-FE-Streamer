import { Button, Link } from '@chakra-ui/react';
import { FC, useState } from 'react';
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState } from '../recoil/authState';

/**
 * This represents some generic auth provider API, like Firebase.
 */
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { fakeAuthProvider, RequireAuth };

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  let value = { user, signin, signout };

  return <>{children}</>;
}

function RequireAuth({}: {}) {
  const isLogin = useRecoilValue(isLoginState);
  let navigate = useNavigate();
  const location = useLocation();
  console.log('is login ?', isLogin);
  if (!isLogin) {
    // navigate('/login');
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    // return <div></div>;
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
  const isLogin = useRecoilValue(isLoginState);

  const fromPathname =
    ((location.state as any)?.from?.pathname as string) || undefined || '/';
  console.log(fromPathname);
  // const from = location?.state?.from?.pathname || '/';

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;

    // isLogin.signin(username, () => {
    //   navigate(from, { replace: true });
    // });
  }

  return (
    <div>
      <p>You must log in to view the page at {fromPathname}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{' '}
        {/* <button type="submit">Login</button> */}
        <Button>
          <Link href="http://localhost:3939/api/login/google">
            Google Login
          </Link>
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
