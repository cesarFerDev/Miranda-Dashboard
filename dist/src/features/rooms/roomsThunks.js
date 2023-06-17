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
import roomsData from "../../data/rooms.json";
export const loadRooms = createAsyncThunk("rooms/loadRooms", () => __awaiter(void 0, void 0, void 0, function* () {
    const roomsArray = roomsData;
    return yield addDelay(roomsArray, 200);
}));
export const createRoom = createAsyncThunk("users/createRoom", (roomObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield addDelay(roomObject, 200);
}));
export const editRoom = createAsyncThunk("users/editRoom", (roomObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield addDelay(roomObject, 200);
}));
export const deleteRoom = createAsyncThunk("users/deleteUser", (roomID) => __awaiter(void 0, void 0, void 0, function* () {
    return yield addDelay(roomID, 200);
}));
