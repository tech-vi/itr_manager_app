import { baseAPI } from "../baseAPI.js";

const ITR_FORM_TYPE_ENDPOINT = "/api/itr_form_type";

const itrFormTypeAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addITRFormType: builder.mutation({
      query: (data) => ({
        url: `${ITR_FORM_TYPE_ENDPOINT}/new`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ITRFormType"],
    }),
    getAllITRFormTypes: builder.query({
      query: () => `${ITR_FORM_TYPE_ENDPOINT}/`,
      providesTags: ["ITRFormType"],
    }),
    getITRFormType: builder.query({
      query: (id) => `${ITR_FORM_TYPE_ENDPOINT}/${id}`,
      providesTags: ["ITRFormType"],
    }),
    editITRFormType: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${ITR_FORM_TYPE_ENDPOINT}/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["ITRFormType"],
    }),
    removeITRFormType: builder.mutation({
      query: (id) => ({
        url: `${ITR_FORM_TYPE_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ITRFormType"],
    }),
  }),
});

export const {
  useGetITRFormTypeQuery,
  useGetAllITRFormTypesQuery,
  useAddITRFormTypeMutation,
  useEditITRFormTypeMutation,
  useRemoveITRFormTypeMutation,
} = itrFormTypeAPI;
