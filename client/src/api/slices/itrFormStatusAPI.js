import { baseAPI } from "../baseAPI.js";

const ITR_FORM_STATUS_ENDPOINT = "/api/itr_form_status";

const itrFormStatusAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addITRFormStatus: builder.mutation({
      query: (data) => ({
        url: `${ITR_FORM_STATUS_ENDPOINT}/new`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ITRFormStatus"],
    }),
    getAllITRFormStatuses: builder.query({
      query: () => `${ITR_FORM_STATUS_ENDPOINT}/`,
      providesTags: ["ITRFormStatus"],
    }),
    getITRFormStatus: builder.query({
      query: (id) => `${ITR_FORM_STATUS_ENDPOINT}/${id}`,
      providesTags: ["ITRFormStatus"],
    }),
    editITRFormStatus: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${ITR_FORM_STATUS_ENDPOINT}/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["ITRFormStatus"],
    }),
    removeITRFormStatus: builder.mutation({
      query: (id) => ({
        url: `${ITR_FORM_STATUS_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ITRFormStatus"],
    }),
  }),
});

export const {
  useGetITRFormStatusQuery,
  useGetAllITRFormStatusesQuery,
  useAddITRFormStatusMutation,
  useEditITRFormStatusMutation,
  useRemoveITRFormStatusMutation,
} = itrFormStatusAPI;
