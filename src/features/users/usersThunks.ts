import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDelay, createID, useFetch } from "../../aux_functions/auxFunctions";
import usersData from "../../data/users.json";
import { User } from "../../interfaces/interfaces";
import { errorToastify, warningToastify } from "../../aux_functions/toastifyMessages";
import { RootState } from "../../app/store";
import { v4 } from "uuid";

const usersList = usersData as User[];

export const loadUsers = createAsyncThunk("users/loadUsers", async () => {
    // try {
        const users: User[] = await useFetch(`/api/users`, "GET", undefined);
        if (users) {
            return users;
        } else {
            warningToastify("Failed to fetch Users. False data will be shown")
            return usersList;
        }
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});

export const getUser = createAsyncThunk("users/getUser", async (id: string, thunkAPI) => {
    // try {
        const user: User = await useFetch(`/api/users/${id}`, "GET", undefined);
        if (user) {
            return user;
        } else {
            // const state = thunkAPI.getState() as RootState;
            // const users = state.users.data;
            // const usersStatus = state.users.status;
            // if (usersStatus === "idle") {
                const userJson = usersList.find(user => user.id === id);
                return userJson;
            // }
            // const userStore = users.find(user => user.id === id);
            // return userStore;
        }
        
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});

export const createUser = createAsyncThunk("users/createUser", async (userObject: User) => {
    // try {
        const newUser: User = await useFetch("/api/users", "POST", userObject);
        if (newUser) {
            return newUser;
        } else {
            const userToReturn = userObject;
            userToReturn.id = v4().replaceAll("-", "").substring(0,24);
            return userToReturn;
        }
        
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});

export const editUser = createAsyncThunk("users/editUser", async (userObject: Partial<User>, thunkAPI) => {
    // try {
        const userEdited: User = await useFetch(`/api/users/${userObject.id}`, "PUT", userObject);
        if (userEdited) {
            if (userEdited.user_name === "Admin") {
                warningToastify("Admin User can't be edited sorry!");
            }
            return userEdited;
        } else {
            const state = thunkAPI.getState() as RootState;
            const users = state.users.data;
            const usersStatus = state.users.status;
            if (usersStatus === "idle") {
                const userToEditJson = usersList.find(user => user.id === userObject.id);
                const userEditedJson = {...userToEditJson, ...userObject};
                return userEditedJson as User;
            }
            const userToEditStore = users.find(user => user.id === userObject.id);
            const userEditedStore = {...userToEditStore, ...userObject};
            return userEditedStore as User;
        }
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string) => {
    // try {
        const userDeletedID: string = await useFetch(`/api/users/${id}`, "DELETE", undefined);
        return userDeletedID || id;
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});