import { PayloadAction, Slice, createSlice, createAction } from "@reduxjs/toolkit";
import { loadBookings, createBooking, deleteBooking, editBooking } from "./bookingsThunks";
import { Booking } from "../../interfaces/interfaces";
import { errorToastify, successToastify } from "../../aux_functions/toastifyMessages";
import bookingsList from "../../data/bookings.json";


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
        builder.addCase(loadBookings.fulfilled, (state, action) => {
            state.status = "fulfilled";
            state.data = action.payload!;
        })
        .addCase(loadBookings.pending, (state, action) => {
            state.status = "pending";
        })
        .addCase(loadBookings.rejected, (state, action) => {
            state.status = "rejected";
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(createBooking.fulfilled, (state, action) => {
                state.data.unshift(action.payload!);
                successToastify("Booking successfully created!")
        })
        .addCase(createBooking.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(deleteBooking.fulfilled, (state, action) => {
            const newData = state.data.filter(booking => action.payload !== booking.id);
            state.data = newData;
            successToastify("Booking successfully deleted!")
        })
        .addCase(deleteBooking.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        })
        .addCase(editBooking.fulfilled, (state, action) => {
            for (let i=0; i < state.data.length; i++) {
                if (state.data[i].id === action.payload!.id) {
                    state.data[i] = action.payload!;
                    successToastify("Booking successfully edited!")
                    break;
                }
            };
            
        })
        .addCase(editBooking.rejected, (state, action) => {
            console.log(state.error);
            errorToastify("An error ocurred"); 
        });
    }
});