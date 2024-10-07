import { baseAPI } from "../baseAPI.js";

const FEE_STATUS_ENDPOINT = "/api/fee_status";

const feeStatusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addFeeStatus: builder.mutation({
      query: (data) => ({
        url: `${FEE_STATUS_ENDPOINT}/new`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FeeStatus"],
    }),
    getAllFeeStatuses: builder.query({
      query: () => `${FEE_STATUS_ENDPOINT}/`,
      providesTags: ["FeeStatus"],
    }),
    getFeeStatus: builder.query({
      query: (id) => `${FEE_STATUS_ENDPOINT}/${id}`,
      providesTags: ["FeeStatus"],
    }),
    editFeeStatus: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${FEE_STATUS_ENDPOINT}/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["FeeStatus"],
    }),
    removeFeeStatus: builder.mutation({
      query: (id) => ({
        url: `${FEE_STATUS_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FeeStatus"],
    }),
  }),
});

export const {
  useGetFeeStatusQuery,
  useGetAllFeeStatusesQuery,
  useAddFeeStatusMutation,
  useEditFeeStatusMutation,
  useRemoveFeeStatusMutation,
} = feeStatusAPI;
