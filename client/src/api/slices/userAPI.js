import { baseAPI } from "../baseAPI.js";

const USERS_ENDPOINT = "/api/users";

const usersApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_ENDPOINT}/register`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `${USERS_ENDPOINT}/login`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: `${USERS_ENDPOINT}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `${USERS_ENDPOINT}/forgot_pwd`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    resetPassword: builder.mutation({
      query: ({ password, token }) => ({
        url: `${USERS_ENDPOINT}/reset_pwd/${token}`,
        method: "PUT",
        body: { password },
      }),
      invalidatesTags: ["User"],
    }),
    verifyEmail: builder.query({
      query: ({ verification_token }) => ({
        url: `${USERS_ENDPOINT}/verify_email/${verification_token}`,
      }),
      providesTags: ["User"],
    }),
    getAllUsers: builder.query({
      query: () => `${USERS_ENDPOINT}/`,
      providesTags: ["User"],
    }),
    getUser: builder.query({
      query: () => `${USERS_ENDPOINT}/profile`,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_ENDPOINT}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `${USERS_ENDPOINT}/profile/${id}`,
        method: "PATCH",
        body: rest,
      }),
      invalidatesTags: ["User"],
    }),
    removeUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_ENDPOINT}/profile/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailQuery,
  useGetAllUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
  useRemoveUserMutation,
} = usersApi;
