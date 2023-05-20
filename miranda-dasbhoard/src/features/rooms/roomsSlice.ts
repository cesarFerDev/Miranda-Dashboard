import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadRooms, createRoom, editRoom, deleteRoom } from "./roomsThunks";
import { Room } from "../../interfaces/interfaces";

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
        builder.addCase(loadRooms.fulfilled, (state, action: PayloadAction<Room[]>) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
        .addCase(loadRooms.pending, (state, action) => {
            state.status = "pending";

        })
        .addCase(loadRooms.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.error);
        })
        .addCase(createRoom.fulfilled, (state, action: PayloadAction<Room>) => {
            state.data.unshift(action.payload);
        })
        .addCase(createRoom.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(createRoom.rejected, (state, action) => {
            console.log(state.error);
        })
        .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<string>) => {
            const newData = state.data.filter(room => action.payload !== room.room_id);
            state.data = newData;
        })
        .addCase(deleteRoom.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(deleteRoom.rejected, (state, action) => {
            console.log(state.error);
        })
        .addCase(editRoom.fulfilled, (state, action: PayloadAction<Room>) => {
            for (let i=0; i < state.data.length; i++) {
                if (state.data[i].room_id === action.payload.room_id) {
                    state.data[i] = action.payload;
                    break;
                }
            };
        })
        .addCase(editRoom.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(editRoom.rejected, (state, action) => {
            console.log(state.error);
        });
    }
});