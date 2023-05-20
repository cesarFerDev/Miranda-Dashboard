import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDelay } from "../../aux_functions/auxFunctions";
import roomsData from "../../data/rooms.json";
import { Room } from "../../interfaces/interfaces";

export const loadRooms = createAsyncThunk("rooms/loadRooms", async () => {
    const roomsArray = roomsData as Room[];
    return await addDelay(roomsArray, 200);
});

export const createRoom = createAsyncThunk("users/createRoom", async (roomObject: Room) => {
    return await addDelay(roomObject, 200);
});

export const editRoom = createAsyncThunk("users/editRoom", async (roomObject: Room) => {
    return await addDelay(roomObject, 200);
});

export const deleteRoom = createAsyncThunk("users/deleteUser", async (roomID: string) => {
    return await addDelay(roomID, 200);
});