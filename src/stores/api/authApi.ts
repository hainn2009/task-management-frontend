import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api/auth` }),
    endpoints: (builder) => ({
        signIn: builder.mutation({
            query: ({ username, password }) => ({
                url: "signin",
                method: "POST",
                body: { username, password },
            }),
        }),
        signUp: builder.mutation({
            query: ({ username, password }) => ({
                url: "signup",
                method: "POST",
                body: { username, password },
            }),
        }),
    }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;
