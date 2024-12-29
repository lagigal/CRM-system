import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedAuthUserRoute from "./components/ProtectedAuthUserRoute";
import Users from "./pages/Users";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<ProtectedAuthUserRoute />}>
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId/edit" element={<EditUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
