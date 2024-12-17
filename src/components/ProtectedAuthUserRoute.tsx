import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCookie } from "../utils";

const ProtectedAuthUserRoute: React.FC = () => {
  const accessToken = getCookie("accessToken");
  const location = useLocation();

  return accessToken?.trim() ? (
      <Navigate to="/" state={{ from: location }} />
) : (
      <Outlet />
  );
};

export default ProtectedAuthUserRoute;
