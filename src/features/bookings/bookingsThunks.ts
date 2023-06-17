import { createAsyncThunk } from "@reduxjs/toolkit";
import { useFetch } from "../../aux_functions/auxFunctions";
import bookingsData from "../../data/bookings.json";
import roomsList from "../../data/rooms.json";
import { Booking } from "../../interfaces/interfaces";
import { MongoBooking } from "../../components/BookingForm";
import { errorToastify, warningToastify } from "../../aux_functions/toastifyMessages";
import { v4 } from 'uuid';
import { RootState } from "../../app/store";

const bookingsList = bookingsData as Booking[]

export const loadBookings = createAsyncThunk("bookings/loadBookings", async () => {
    // try {
        const bookings: Booking[] = await useFetch(`/api/bookings`, "GET", undefined);
        if (bookings) {
            return bookings;
        } else {
            warningToastify("Failed to fetch Bookings. False data will be shown");
            return bookingsList;
        }
    // } catch (error) {
    //     console.log(error);
    //     errorToastify("An error has ocurred"); 
    // }
});

export const createBooking = createAsyncThunk("bookings/createBooking", async (bookingObject: MongoBooking, thunkAPI ) => {
    // try {
        const newBooking: Booking = await useFetch("/api/bookings", "POST", bookingObject);
        if (newBooking) {
            return newBooking;
        } else {
            const state = thunkAPI.getState() as RootState;
            const rooms = state.rooms.data;
            const roomCandidate = rooms.find(room => room.id === bookingObject.room_id);
            if (roomCandidate) {
                const bookingToReturn: any = (({ room_id, ...o }) => o)(bookingObject);
                bookingToReturn.id = v4().replaceAll("-", "").substring(0, 24);
                bookingToReturn.room = roomCandidate;
                return bookingToReturn as Booking;
            }
        }
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    //     throw new Error("An error has ocurred");
    // }
});

export const deleteBooking = createAsyncThunk("bookings/deleteBooking", async (id: string, thunkAPI) => {
    // try {
        const bookingDeletedID: string = await useFetch(`/api/bookings/${id}`, "DELETE", undefined);
        return bookingDeletedID || id;
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    //     throw new Error("An error has ocurred");
    // }
});

export const editBooking = createAsyncThunk("bookings/editBooking", async (bookingObject: Partial<MongoBooking>, thunkAPI) => {
    // try {
        const bookingEdited: Booking = await useFetch(`/api/bookings/${bookingObject.id}`, "PUT", bookingObject);
        if (bookingEdited) {
            return bookingEdited;
        } else {
            const state = thunkAPI.getState() as RootState;
            const bookings = state.bookings.data;
            const rooms = state.rooms.data;
            const bookingToEditJson = bookings.find(booking => booking.id === bookingObject.id);
            let roomCandidate = rooms.find(room => room.id === bookingToEditJson?.room.id);
            if (bookingObject.room_id) {
                roomCandidate = rooms.find(room => room.id === bookingObject.room_id);
            }
            if (bookingToEditJson && roomCandidate) {
                const bookingEditedJson = (({ room_id, ...o }) => o)({...bookingToEditJson, ...bookingObject});
                bookingEditedJson.room = roomCandidate;
                return bookingEditedJson as Booking;
            }
        }
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    //     throw new Error("An error has ocurred");
    // }
});