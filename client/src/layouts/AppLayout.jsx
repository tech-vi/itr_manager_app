import { Navigate, Outlet } from "react-router-dom";
import { Breadcrumbs, Header } from "../components";
import { useSelector } from "react-redux";
import { getLocalStorageData } from "../utils/helper.js";

const AppLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const userData = getLocalStorageData("vi");
  // console.log(userData);
  return isLoggedIn && userData ? (
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
