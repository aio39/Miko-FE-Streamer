import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { isLoginState } from 'state/recoil/authState';

const RequiredLoginGuard = () => {
  const isLogin = useRecoilValue(isLoginState);
  const location = useLocation();
  console.log('is login ?', isLogin);
  if (isLogin === false) {
    return (
      <div>
        <Navigate to="/login" state={{ from: location }} replace />
      </div>
    );
  }

  return <Outlet />;
};

export default RequiredLoginGuard;
