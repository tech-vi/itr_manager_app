import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
  credentials: "include",
});

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery,
  tagTypes: [
    "User",
    "Client",
    "FeeStatus",
    "FinancialYear",
    "ITRFormStatus",
    "ITRFormType",
  ],
  endpoints: (builder) => ({}),
});
