import { FC, ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { routes } from '../../constants/routes';
import { useAuth } from '../../store/useAuth';

interface Props {
  children?: ReactNode;
}

const PrivateRoute: FC<Props> = ({ children }) => {
  const { isLogged } = useAuth();
  if (!isLogged) {
    return <Navigate to={routes.auth.login} />;
  }
  if (children) {
    return <>{children}</>;
  }
  return <Outlet />;
};

export default PrivateRoute;
