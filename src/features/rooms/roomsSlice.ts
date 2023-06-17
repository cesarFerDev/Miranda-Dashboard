import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadRooms, getRoom, createRoom, editRoom, deleteRoom } from "./roomsThunks";
import { Room } from "../../interfaces/interfaces";
import { errorToastify, successToastify } from "../../aux_functions/toastifyMessages";

type SliceRoomState = { data: Room[], status: string, error: null};

const initialState: SliceRoomState = {
    data: [],
    status: "idle",
    error: null
}

export const roomsSlice =  createSlice({
    name: "rooms",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadRooms.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload!;
        })
        .addCase(loadRooms.pending, (state, action) => {
            state.status = "pending";

        })
        .addCase(loadRooms.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(getRoom.fulfilled, (state, action) => {
            const isContained = state.data.find(room => room.id === action.payload!.id);
            if (state.data.length === 0 || !(isContained)) {
                state.data.push(action.payload!);
            }
        })
        .addCase(getRoom.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(createRoom.fulfilled, (state, action) => {
            state.data.unshift(action.payload!);
            successToastify("Room successfully created!");
        })
        .addCase(createRoom.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(deleteRoom.fulfilled, (state, action) => {
            const newData = state.data.filter(room => action.payload !== room.id);
            state.data = newData;
            successToastify("Room successfully deleted!");
        })
        .addCase(deleteRoom.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(editRoom.fulfilled, (state, action) => {
            for (let i=0; i < state.data.length; i++) {
                if (state.data[i].id === action.payload!.id) {
                    state.data[i] = action.payload!;
                    successToastify("Room successfully edited!");
                    break;
                }
            };
        })
        .addCase(editRoom.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        });
    }
});