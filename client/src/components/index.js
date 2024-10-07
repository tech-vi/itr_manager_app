import { lazy } from "react";

export const Header = lazy(() => import("./Header"));
export const Breadcrumbs = lazy(() => import("./Breadcrumbs"));
export const CustomModal = lazy(() => import("../modal/CustomModal"));
export const TextInput = lazy(() => import("./TextInput"));

export const Loader = lazy(() => import("./Loader"));

export const BarChart = lazy(() => import("./charts/BarChart"));
export const DoughnutChart = lazy(() => import("./charts/DoughnutChart"));

export const DataTable = lazy(() => import("./DataTable"));
export const SearchFilter = lazy(() => import("./SearchFilter"));
export const FilterBy = lazy(() => import("./FilterBy"));
export const AdvancedPagination = lazy(() => import("./AdvancedPagination"));
export const SimplePagination = lazy(() => import("./SimplePagination"));
export const ColumnVisibilityFilter = lazy(() =>
  import("./ColumnVisibilityFilter")
);
