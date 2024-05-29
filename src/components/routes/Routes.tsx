import { Route, Routes } from 'react-router-dom';

import { routes } from '../../constants/routes';
import Dashboard from '../../layouts/Dashboard';
import { HomePage } from '../../pages/Dashboard/HomePage';
import { SourcesPage } from '../../pages/Dashboard/SourcesPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import SignupPage from '../../pages/SignupPage/SignupPage';

import PrivateRoute from './PrivateRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <PrivateRoute>
            <Dashboard withNavbar={true} />
          </PrivateRoute>
        }
      >
        <Route path={routes.home} element={<HomePage />} />
      </Route>
      <Route
        element={
          <PrivateRoute>
            <Dashboard withNavbar={false} />
          </PrivateRoute>
        }
      >
        <Route path={routes.sources} element={<SourcesPage />} />
      </Route>

      <Route path={routes.auth.login} element={<LoginPage />} />
      <Route path={routes.auth.signup} element={<SignupPage />} />

      <Route path="*" element={<p>404! Route not Found</p>}></Route>
    </Routes>
  );
};
