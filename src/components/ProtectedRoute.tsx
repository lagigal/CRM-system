import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../store";
import { selectIsAuthUser, userProfileThunk } from "../slices/userSlice";
import { useEffect, useState } from "react";

const ProtectedRoute: React.FC = () => {
  const isAuth = useSelector(selectIsAuthUser);
  const location = useLocation();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      dispatch(userProfileThunk())
        .unwrap()
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
        });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
