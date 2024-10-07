import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return !isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthLayout;
