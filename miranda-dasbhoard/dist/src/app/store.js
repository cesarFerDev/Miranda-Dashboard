import { configureStore } from '@reduxjs/toolkit';
import { contactsSlice } from '../features/contacts/contactsSlice';
import { usersSlice } from '../features/users/usersSlice';
import { roomsSlice } from '../features/rooms/roomsSlice';
import { bookingsSlice } from '../features/bookings/bookingsSlice';
import { useDispatch, useSelector } from 'react-redux';
export const store = configureStore({
    reducer: {
        bookings: bookingsSlice.reducer,
        rooms: roomsSlice.reducer,
        contacts: contactsSlice.reducer,
        users: usersSlice.reducer
    },
});
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
