import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDelay } from "../../aux_functions/auxFunctions";
import bookingsData from "../../data/bookings.json";
import { Booking } from "../../interfaces/interfaces";

export const loadBookings = createAsyncThunk("bookings/loadBookings", async () => {
    const bookingsArray: Booking[] = bookingsData;
    return await addDelay(bookingsArray, 200);
});

export const createBooking = createAsyncThunk("bookings/createBooking", async (bookingObject: Booking) => {
    return await addDelay(bookingObject, 200);
});

export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (bookingid: string) => {
    return await addDelay(bookingid, 200);
});

export const editBooking = createAsyncThunk("bookings/editBooking", async (bookingObject: Booking) => {
    return await addDelay(bookingObject, 200);
});