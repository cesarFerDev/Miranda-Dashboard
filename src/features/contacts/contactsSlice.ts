import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadContacts, archiveContacts } from "./contactsThunks";
import { Contact } from "../../interfaces/interfaces";
import { errorToastify, successToastify } from "../../aux_functions/toastifyMessages";

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
        builder.addCase(loadContacts.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload!;
        })
        .addCase(loadContacts.pending, (state, action) => {
            state.status = "pending";
        })
        .addCase(loadContacts.rejected, (state, action) => {
            state.status = "rejected";
            errorToastify("An error ocurred"); 
        })
        .addCase(archiveContacts.fulfilled, (state, action) => {
            for (let i=0; i < state.data.length; i++) {
                if (state.data[i].id === action.payload!.id) {
                    state.data[i] = action.payload!;
                    successToastify("Contact successfully archived!");
                    break;
                }
            };
        })
        .addCase(archiveContacts.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        });
    }
});