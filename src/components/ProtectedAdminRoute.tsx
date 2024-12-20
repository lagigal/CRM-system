import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "../store";
import { selectUser } from "../slices/userSlice";

const ProtectedAdminRoute: React.FC = () => {
  const isAdmin = useSelector(selectUser)?.isAdmin;
  const location = useLocation();

  return isAdmin ? <Outlet /> : <Navigate to="/" state={{ from: location }} />;
};

export default ProtectedAdminRoute;
