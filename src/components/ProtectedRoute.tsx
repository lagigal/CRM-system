import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../store";
import { selectIsAuthUser, selectUser, userProfileThunk } from "../slices/userSlice";
import { authService } from "../api/baseAPI";

interface ProtectedRouteProps {
  requireAuth?: boolean; // Требуется ли аутентификация
  requireAdmin?: boolean; // Требуется ли роль администратора
  redirectTo?: string; // Куда перенаправлять, если условие не выполняется
  fallback?: React.ReactNode; // Фолбек при загрузке
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  requireAuth = false,
  requireAdmin = false,
  redirectTo = "/",
  fallback = <div>Loading...</div>,
}) => {
  const isAuth = useSelector(selectIsAuthUser);
  const user = useSelector(selectUser);
  const location = useLocation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (requireAuth) {
      const accessToken = authService.hasAccessToken();

      if (accessToken) {
        dispatch(userProfileThunk())
          .unwrap()
          .then(() => setIsLoading(false))
          .catch(() => {
            setIsLoading(false);
            authService.clearAccessToken();
            localStorage.removeItem("refreshToken");
          });
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, [dispatch, requireAuth]);

  if (isLoading) {
    return <>{fallback}</>;
  }

  // Проверка условий доступа
  if (!requireAuth && isAuth) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  if (requireAuth && !isAuth) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  if (requireAdmin && (!user || !user.isAdmin)) {
    return <Navigate to={redirectTo} state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
