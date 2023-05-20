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
import bookingsData from "../../data/bookings.json";
export const loadBookings = createAsyncThunk("bookings/loadBookings", () => __awaiter(void 0, void 0, void 0, function* () {
    const bookingsArray = bookingsData;
    return yield addDelay(bookingsArray, 200);
}));
export const createBooking = createAsyncThunk("bookings/createBooking", (bookingObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield addDelay(bookingObject, 200);
}));
export const deleteBooking = createAsyncThunk("bookings/deleteBooking", (bookingid) => __awaiter(void 0, void 0, void 0, function* () {
    return yield addDelay(bookingid, 200);
}));
export const editBooking = createAsyncThunk("bookings/editBooking", (bookingObject) => __awaiter(void 0, void 0, void 0, function* () {
    return yield addDelay(bookingObject, 200);
}));
