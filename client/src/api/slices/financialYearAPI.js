import { baseAPI } from "../baseAPI.js";

const FIN_YEAR_ENDPOINT = "/api/financial_year";

const financialYearAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addFinancialYear: builder.mutation({
      query: (data) => ({
        url: `${FIN_YEAR_ENDPOINT}/new`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FinancialYear"],
    }),
    getAllFinancialYears: builder.query({
      query: () => `${FIN_YEAR_ENDPOINT}/`,
      providesTags: ["FinancialYear"],
    }),
    getFinancialYear: builder.query({
      query: (id) => `${FIN_YEAR_ENDPOINT}/${id}`,
      providesTags: ["FinancialYear"],
    }),
    editFinancialYear: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${FIN_YEAR_ENDPOINT}/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["FinancialYear"],
    }),
    removeFinancialYear: builder.mutation({
      query: (id) => ({
        url: `${FIN_YEAR_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FinancialYear"],
    }),
  }),
});

export const {
  useGetFinancialYearQuery,
  useGetAllFinancialYearsQuery,
  useAddFinancialYearMutation,
  useEditFinancialYearMutation,
  useRemoveFinancialYearMutation,
} = financialYearAPI;
