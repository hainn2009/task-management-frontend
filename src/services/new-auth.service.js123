import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3000'

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/auth" }),
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
