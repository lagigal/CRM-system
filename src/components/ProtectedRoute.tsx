import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookie } from "../utils";

const ProtectedRoute: React.FC = () => {
  const accessToken = getCookie("accessToken");
  const location = useLocation();

  return accessToken?.trim() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
