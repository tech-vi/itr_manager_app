import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserRoutes = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default UserRoutes;
