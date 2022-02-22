import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState } from 'recoil/authState';

const NotLoginGuard = () => {
  const isLogin = useRecoilValue(isLoginState);
  const location = useLocation();

  if (isLogin) {
    return (
      <div>
        <Navigate to="/my" state={{ from: location }} replace />
      </div>
    );
  }

  return <Outlet />;
};

export default NotLoginGuard;
