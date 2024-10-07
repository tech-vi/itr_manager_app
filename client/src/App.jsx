import { Suspense } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { AuthLayout, AppLayout } from "./layouts";
import { AdminRoutes, UserRoutes } from "./routes";
import {
  Register,
  Login,
  ForgotPassword,
  ResetPassword,
  EmailVerification,
  Home,
  Clients,
  ClientForm,
  Dashboard,
  Users,
  FinancialYears,
  ITRFormTypes,
  ITRFormStatuses,
  FeeStatuses,
  NotFound,
  Error,
} from "./pages";
import { Loader } from "./components";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}></Route>
      <Route element={<AuthLayout />}>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="forgot_pwd" element={<ForgotPassword />} />
        <Route path="reset_pwd/:token" element={<ResetPassword />} />
        <Route
          path="verify_email/:verification_token"
          element={<EmailVerification />}
        />
      </Route>
      <Route element={<AppLayout />}>
        {/* admin only routes */}
        <Route element={<AdminRoutes />}>
          <Route path="users" element={<Users />} />
          <Route path="financial_years" element={<FinancialYears />} />
          <Route path="itr_form_types" element={<ITRFormTypes />} />
          <Route path="itr_form_statuses" element={<ITRFormStatuses />} />
          <Route path="fee_statuses" element={<FeeStatuses />} />
        </Route>
        {/* admin and user routes */}
        <Route element={<UserRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="clients">
            <Route index element={<Clients />} />
            <Route path="add" element={<ClientForm />} />
            <Route path=":cid" element={<ClientForm />} />
          </Route>
        </Route>
      </Route>

      <Route path="err" element={<Error />} />

      <Route path="*" element={<NotFound />} />
    </>
  )
);

const App = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </>
  );
};

export default App;
