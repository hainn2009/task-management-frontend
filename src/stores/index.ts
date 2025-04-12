import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
import authReducer, { loadUserFromStorage } from "./slices/authSlice";
// import { setupListeners } from '@reduxjs/toolkit/query'
import { taskApi } from "./api/taskApi";
import { authApi } from "./api/authApi";
import filterReduder from "./slices/filtersSlice";

const appReducer = combineReducers({
    [taskApi.reducerPath]: taskApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    filters: filterReduder,
    auth: authReducer,
});
// google hướng dẫn đưa rootState lên đây và có vẻ nó giải quyết được vấn đề
export type RootState = ReturnType<typeof appReducer>;

// Đoạn này rất khác so với hướng dẫn trong redux toolkit, có thời gian thì check lại nhé
const rootReducer = (state: RootState | undefined, action: Action) => {
    if (action.type === "auth/logout") {
        state = undefined;
    }
    return appReducer(state, action);
};

export const store = configureStore({
    reducer: rootReducer,
    // reducer: appReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(taskApi.middleware).concat(authApi.middleware),
});

// Load user from localStorage when the store is created
store.dispatch(loadUserFromStorage());

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
// Đang cố gắng sửa lỗi tham chiếu vòng, đây là chỗ cấu hình gốc
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
