import { PayloadAction, Slice, createSlice, createAction } from "@reduxjs/toolkit";
import { loadBookings, createBooking, deleteBooking, editBooking } from "./bookingsThunks";
import { Booking } from "../../interfaces/interfaces";



type SliceBookingState = { data: Booking[], status: string, error: null};

const initialState: SliceBookingState = {
    data: [],
    status: "idle",
    error: null
}

export const bookingsSlice=  createSlice({
    name: "bookings",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadBookings.fulfilled, (state, action: PayloadAction<Booking[]>) => {
            state.status = "fulfilled";
            state.data = action.payload;
        })
        .addCase(loadBookings.pending, (state, action) => {
            state.status = "pending";
            console.log("loading");
        })
        .addCase(loadBookings.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.error);
        })
        .addCase(createBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
            state.data.unshift(action.payload);
        })
        .addCase(createBooking.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(createBooking.rejected, (state, action) => {
            console.log(state.error);
        })
        .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<string>) => {
            const newData = state.data.filter(booking => action.payload !== booking.booking_id);
            state.data = newData;
        })
        .addCase(deleteBooking.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(deleteBooking.rejected, (state, action) => {
            console.log(state.error);
        })
        .addCase(editBooking.fulfilled, (state, action: PayloadAction<Booking>) => {
            for (let i=0; i < state.data.length; i++) {
                if (state.data[i].booking_id === action.payload.booking_id) {
                    state.data[i] = action.payload;
                    break;
                }
            };
        })
        .addCase(editBooking.pending, (state, action) => {
            console.log("loading");
        })
        .addCase(editBooking.rejected, (state, action) => {
            console.log(state.error);
        });
    }
});