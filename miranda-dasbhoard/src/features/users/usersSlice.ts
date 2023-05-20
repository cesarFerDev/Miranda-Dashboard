import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadUsers, createUser, deleteUser, editUser, getUser } from "./usersThunks";
import { User } from "../../interfaces/interfaces";

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
        builder.addCase(loadUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
        .addCase(loadUsers.pending, (state, action) => {
            state.status = "pending";
            console.log("loading");
        })
        .addCase(loadUsers.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.error);
        })
        .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
            if (state.data.length === 0) {
                state.data.push(action.payload)
            }
        })
        .addCase(getUser.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(getUser.rejected, (state, action) => {
            console.log(state.error);
        })
        .addCase(createUser.fulfilled, (state, action: PayloadAction<User>) => {
            state.data.unshift(action.payload);
        })
        .addCase(createUser.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(createUser.rejected, (state, action) => {
            console.log(state.error);
        })
        .addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
            const newData = state.data.filter(user => action.payload !== user.user_id);
            state.data = newData;
        })
        .addCase(deleteUser.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(deleteUser.rejected, (state, action) => {
            console.log(state.error);
        })
        .addCase(editUser.fulfilled, (state, action: PayloadAction<User>) => {
            for (let i=0; i < state.data.length; i++) {
                console.log(state.data[i].user_id)
                console.log(action.payload.user_id)

                if (state.data[i].user_id === action.payload.user_id) {
                    state.data[i] = action.payload;
                    break;
                }
            };
        })
        .addCase(editUser.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(editUser.rejected, (state, action) => {
            console.log(state.error);
        })
        ;
    }
});