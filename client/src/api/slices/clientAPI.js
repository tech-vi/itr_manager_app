import { baseAPI } from "../baseAPI.js";

const CLIENT_ENDPOINT = "/api/clients";

const clientAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    addClient: builder.mutation({
      query: (data) => ({
        url: `${CLIENT_ENDPOINT}/`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Client"],
    }),
    getAllClients: builder.query({
      query: () => `${CLIENT_ENDPOINT}/`,
      providesTags: ["Client"],
    }),
    getClient: builder.query({
      query: (id) => `${CLIENT_ENDPOINT}/${id}`,
      providesTags: ["Client"],
    }),
    editClient: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${CLIENT_ENDPOINT}/${id}`,
        method: "PUT",
        body: rest,
      }),
      invalidatesTags: ["Client"],
    }),
    removeClient: builder.mutation({
      query: (id) => ({
        url: `${CLIENT_ENDPOINT}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
  }),
});

export const {
  useGetClientQuery,
  useGetAllClientsQuery,
  useAddClientMutation,
  useEditClientMutation,
  useRemoveClientMutation,
} = clientAPI;
