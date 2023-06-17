import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadUsers, createUser, deleteUser, editUser, getUser } from "./usersThunks";
import { User } from "../../interfaces/interfaces";
import { errorToastify, successToastify } from "../../aux_functions/toastifyMessages";

type SliceUserState = { data: User[], status: string, error: null};

const initialState: SliceUserState = {
    data: [],
    status: "idle",
    error: null
}

export const usersSlice =  createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadUsers.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload!;
        })
        .addCase(loadUsers.pending, (state, action) => {
            state.status = "pending";
        })
        .addCase(loadUsers.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(getUser.fulfilled, (state, action) => {
            const isContained = state.data.find(user => user.id === action.payload?.id);
            if (state.data.length === 0 || !(isContained)) {
                state.data.push(action.payload!);
            }
        })
        .addCase(getUser.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(createUser.fulfilled, (state, action) => {
            state.data.unshift(action.payload!);
            successToastify("User successfully created!");
        })
        .addCase(createUser.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            const newData = state.data.filter(user => action.payload !== user.id);
            state.data = newData;
            successToastify("User successfully deleted!");
        })
        .addCase(deleteUser.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(editUser.fulfilled, (state, action) => {
            for (let i=0; i < state.data.length; i++) {
                if (state.data[i].id === action.payload!.id) {
                    state.data[i] = action.payload!;
                    successToastify("User successfully edited!");
                    break;
                }
            };
        })
        .addCase(editUser.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(editUser.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        ;
    }
});