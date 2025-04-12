import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        search: "",
        status: "",
    },
    reducers: {
        setFilters: (state, action) => {
            state.search = action.payload.search;
            state.status = action.payload.status;
        },
    },
});

export const { setFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
