var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDelay } from "../../aux_functions/auxFunctions";
import usersList from "../../data/users.json";
export const loadUsers = createAsyncThunk("users/loadUsers", () => __awaiter(void 0, void 0, void 0, function* () {
    const usersArray = usersList;
    return yield addDelay(usersArray, 200);
}));
export const getUser = createAsyncThunk("users/getUser", (userObject) => __awaiter(void 0, void 0, void 0, function* () {
    // const userObject = usersList.find(user => user.user_id === id);
    return yield addDelay(userObject, 200);
}));
export const createUser = createAsyncThunk("users/createUser", (userObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield addDelay(userObject, 200);
}));
export const editUser = createAsyncThunk("users/editUser", (userObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield addDelay(userObject, 200);
}));
export const deleteUser = createAsyncThunk("users/deleteUser", (userID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield addDelay(userID, 200);
}));
