import { Draft } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface TaskType {
    id: string;
    title: string;
    description: string;
    isCompleted: boolean;
    status: string;
}

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_BASE_URL}/api`,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as { auth: { user: { accessToken: string } } }).auth.user.accessToken;
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Tasks"],
    endpoints: (builder) => ({
        getTasks: builder.query<TaskType[], { search: string; status: string }>({
            // Shouldn't use optional like search? because it still get default value without our notice
            // it is better search=""
            query: ({ search = "", status = "" }) => {
                let query = "/tasks?";
                if (search) query += `search=${search}&`;
                if (status) query += `status=${status}`;
                return query;
            },
            providesTags: ["Tasks"],
        }),
        createTask: builder.mutation<TaskType, { title: string; description: string }>({
            query: ({ title, description }) => ({
                url: "tasks",
                method: "POST",
                body: { title, description },
            }),
            invalidatesTags: ["Tasks"],
            onQueryStarted: async ({ title, description }, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    taskApi.util.updateQueryData("getTasks", { search: "", status: "" }, (draftTasks: Draft<TaskType[]>) => {
                        draftTasks.push({
                            id: Date.now().toString(),
                            title: title,
                            description: description,
                            isCompleted: false,
                            status: "OPEN",
                        });
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        updateTaskStatus: builder.mutation<TaskType, { id: string; status: string }>({
            query: ({ id, status }) => ({
                url: `tasks/${id}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: ["Tasks"],
            async onQueryStarted({ id, status }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    taskApi.util.updateQueryData("getTasks", { search: "", status: "" }, (draftTasks: Draft<TaskType>[]) => {
                        const existTask = draftTasks.find((task) => task.id === id);
                        if (existTask) existTask.status = status;
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
        deleteTask: builder.mutation({
            query: (id) => ({
                url: `tasks/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Tasks"],
            onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
                const patchResult = dispatch(
                    taskApi.util.updateQueryData("getTasks", { search: "", status: "" }, (draftTasks: Draft<TaskType>[]) => {
                        return draftTasks.filter((task) => task.id !== id);
                    })
                );
                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),
    }),
});

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskStatusMutation } = taskApi;
