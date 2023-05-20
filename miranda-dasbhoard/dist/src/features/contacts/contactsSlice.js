import { createSlice } from "@reduxjs/toolkit";
import { loadContacts } from "./contactsThunks";
const initialState = {
    data: [],
    status: "idle",
    error: null
};
export const contactsSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadContacts.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
            .addCase(loadContacts.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.error);
        });
    }
});
