import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

export interface User {
    id: string;
    username: string;
    email: string;
}

const initialState: {
    isAuthenticated: boolean;
    user: User | null;
    loading: boolean;
    error: SerializedError | null;
} = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null as SerializedError | null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
        },
        loadUserFromStorage: (state) => {
            const user = localStorage.getItem("user");
            const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
            if (user && isAuthenticated) {
                state.isAuthenticated = true;
                state.user = JSON.parse(user);
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.signIn.matchPending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
                localStorage.setItem("user", JSON.stringify(action.payload));
                localStorage.setItem("isAuthenticated", "true");
            })
            .addMatcher(authApi.endpoints.signIn.matchRejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            });
    },
});

export const { logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
