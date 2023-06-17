import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDelay, createID, useFetch } from "../../aux_functions/auxFunctions";
import roomsData from "../../data/rooms.json";
import { Room } from "../../interfaces/interfaces";
import { errorToastify, warningToastify } from "../../aux_functions/toastifyMessages";
import { v4 } from "uuid";
import { RootState } from "../../app/store";

const roomsList = roomsData as Room[];

export const loadRooms = createAsyncThunk("rooms/loadRooms", async () => {
    // try {
        const rooms: Room[] = await useFetch(`/api/rooms`, "GET", undefined);
        if (rooms) {
            return rooms;
        } else {
            warningToastify("Failed to fetch Rooms. False data will be shown");
            return roomsList as Room[];
        }
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});

export const getRoom = createAsyncThunk("rooms/getRoom", async (id: string, thunkAPI) => {
    // try {
        const room: Room = await useFetch(`/api/rooms/${id}`, "GET", undefined);
        if (room) {
            return room;
        } else {
            const state = thunkAPI.getState() as RootState;
            const rooms = state.rooms.data;
            const roomJson = rooms.find(room => room.id === id);
            // if (roomJson) {
                return roomJson as Room;
            //}
        }
        
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});

export const createRoom = createAsyncThunk("rooms/createRoom", async (roomObject: Room) => {
    // try {
        const newRoom: Room = await useFetch("/api/rooms", "POST", roomObject);
        if (newRoom) {
            return newRoom;
        } else {
            const roomToReturn = roomObject;
            roomToReturn.id = v4().replaceAll("-", "").substring(0,24);
            return roomToReturn;
        }
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});

export const editRoom = createAsyncThunk("rooms/editRoom", async (roomObject: Partial<Room>, thunkAPI) => {
    // try {
        const roomEdited: Room = await useFetch(`/api/rooms/${roomObject.id}`, "PUT", roomObject);
        if (roomEdited) {
            return roomEdited;
        } else {
            const state = thunkAPI.getState() as RootState;
            const rooms = state.rooms.data;
            const roomToEditJson = rooms.find(room => room.id === roomObject.id);
            if (roomToEditJson) {
                const roomEditedJson = {...roomToEditJson, ...roomObject};
                return roomEditedJson as Room;
            }
            return null;
            // if (roomObject.number) {
            //     return roomObject as Room;
            // } else {
            //     const roomToEditJson = roomsList.find(room => room.id === roomObject.id);
            //     const roomEditedJson = {...roomToEditJson, ...roomObject};
            //     return roomEditedJson as Room;
            // }
        }
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});

export const deleteRoom = createAsyncThunk("rooms/deleteRoom", async (id: string) => {
    // try {
        const roomDeletedID: string = await useFetch(`/api/rooms/${id}`, "DELETE", undefined);
        return roomDeletedID || id;
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});