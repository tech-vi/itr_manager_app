import { lazy } from "react";

export const Register = lazy(() => import("./Register"));
export const Login = lazy(() => import("./Login"));
export const ForgotPassword = lazy(() => import("./ForgotPassword"));
export const ResetPassword = lazy(() => import("./ResetPassword"));
export const EmailVerification = lazy(() => import("./EmailVerification"));
export const Home = lazy(() => import("./Home"));
export const Clients = lazy(() => import("./Clients"));
export const ClientForm = lazy(() => import("./ClientForm"));
export const Dashboard = lazy(() => import("./Dashboard"));
export const NotFound = lazy(() => import("./NotFound"));
export const Error = lazy(() => import("./Error"));

// # admin pages
export const Users = lazy(() => import("./admin/Users"));
export const FinancialYears = lazy(() => import("./admin/FinancialYears"));
export const ITRFormTypes = lazy(() => import("./admin/ITRFormTypes"));
export const ITRFormStatuses = lazy(() => import("./admin/ITRFormStatuses"));
export const FeeStatuses = lazy(() => import("./admin/FeeStatuses"));
