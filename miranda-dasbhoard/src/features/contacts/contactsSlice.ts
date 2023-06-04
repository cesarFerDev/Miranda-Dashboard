import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadContacts, archiveContacts } from "./contactsThunks";
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
        .addCase(loadContacts.pending, (state, action) => {
            state.status = "pending";
        })
        .addCase(loadContacts.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.error);
        })
        .addCase(archiveContacts.fulfilled, (state, action: PayloadAction<string>) => {
            for (let i=0; i < state.data.length; i++) {
                if (state.data[i].contact_id === action.payload) {
                    state.data[i].is_archived = true;
                    break;
                }
            };
        })
        .addCase(archiveContacts.rejected, (state, action) => {
            console.log(state.error);
        });
    }
});