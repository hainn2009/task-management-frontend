import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.user.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTasks: builder.query({
            query: ({ search, status }) => {
                let query = "/tasks?";
                if (search) query += `search=${search}&`;
                if (status) query += `status=${status}`;
                return query;
            },
            providesTags: ["Tasks"],
        }),
        createTask: builder.mutation({
            query: ({ title, description }) => ({
                url: "tasks",
                method: "POST",
                body: { title, description },
            }),
            invalidatesTags: ["Tasks"],
        }),
        updateTaskStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `tasks/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Tasks"],
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"],
        }),
    }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskStatusMutation } = taskApi;
