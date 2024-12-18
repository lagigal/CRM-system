import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "../store";
import { selectIsAuthUser } from "../slices/userSlice";

const ProtectedAuthUserRoute: React.FC = () => {
  const isAuth = useSelector(selectIsAuthUser)
  const location = useLocation();

  return isAuth ? (
      <Navigate to="/" state={{ from: location }} />
) : (
      <Outlet />
  );
};

export default ProtectedAuthUserRoute;
