import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppStore } from '../store/app.store';

const ProtectedRoute: FC = () => {
  const { isAuthenticated } = useAppStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;