import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDelay } from "../../aux_functions/auxFunctions";
import usersList from "../../data/users.json";
import { User } from "../../interfaces/interfaces";

export const loadUsers = createAsyncThunk("users/loadUsers", async () => {
    const usersArray = usersList as User[];
    return await addDelay(usersArray, 200);
});

export const getUser = createAsyncThunk("users/getUser", async (userObject: User) => {
    // const userObject = usersList.find(user => user.user_id === id);
    return await addDelay(userObject, 200);
});

export const createUser = createAsyncThunk("users/createUser", async (userObject: User) => {
    return await addDelay(userObject, 200);
});

export const editUser = createAsyncThunk("users/editUser", async (userObject: User) => {
    return await addDelay(userObject, 200);
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (userID: string) => {
    return await addDelay(userID, 200);
});