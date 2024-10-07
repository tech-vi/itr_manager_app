import { Navigate, Outlet } from "react-router-dom";
import { Breadcrumbs, Header } from "../components";
import { useSelector } from "react-redux";

const AppLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? (
    <>
      <Header />
      <main>
        <Breadcrumbs />
        <Outlet />
      </main>
    </>
  ) : (
    <>
      <Navigate to="/login" replace />
    </>
  );
};

export default AppLayout;
