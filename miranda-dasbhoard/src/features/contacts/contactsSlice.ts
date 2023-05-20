import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadContacts } from "./contactsThunks";
import { Contact } from "../../interfaces/interfaces";

type SliceContactState = { data: Contact[], status: string, error: null};

const initialState: SliceContactState = {
    data: [],
    status: "idle",
    error: null
}

export const contactsSlice =  createSlice({
    name: "contacts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadContacts.fulfilled, (state, action: PayloadAction<Contact[]>) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
        .addCase(loadContacts.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.error);
        });
    }
});