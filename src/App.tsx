import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import { useDispatch } from "./store";
import { useEffect, useState } from "react";
import { authService, updateTokens } from "./api/baseAPI";
import { userProfileThunk } from "./slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const [appLoading, setAppLoading] = useState(true);

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      updateTokens()
        .then(() => {
          dispatch(userProfileThunk())
          .then(() => {
            setAppLoading(false);
          });
        })
        .catch(() => {
          authService.clearAccessToken();
          localStorage.removeItem("refreshToken");
          setAppLoading(false);
        });
    } else {
      setAppLoading(false);
    }
  }, [dispatch]);

  if (appLoading) {
    return <div>Загрузка приложения...</div>;
  }

  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute requireAuth={false} requireAdmin={false} redirectTo="/" />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute requireAuth={true} requireAdmin={false} redirectTo="/login"/>}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute requireAuth={true} requireAdmin={true} redirectTo="/" />}>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId/edit" element={<EditUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
