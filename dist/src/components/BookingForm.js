import { SubmitButton } from "../styled_components/buttons/buttons";
import React, { useState } from "react";
import { createID } from "../aux_functions/auxFunctions";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/store";
import { createBooking } from "../features/bookings/bookingsThunks";
import { editBooking } from "../features/bookings/bookingsThunks";
import { CreateForm, FormDate, FormField, FormInput, FormLabel, FormTextArea, UserFormButtonsContainer } from "./UserForm";
export const BookingForm = (props) => {
    const roomsList = useAppSelector(state => state.rooms.data);
    const bookingsData = useAppSelector(state => state.bookings.data);
    const { id } = useParams();
    const singleBookingData = bookingsData.find(booking => booking.booking_id === id);
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const [customerName, setCustomerName] = useState(singleBookingData ? singleBookingData.guest_name : "");
    const [customerMail, setCustomerMail] = useState(singleBookingData ? singleBookingData.guest_email : "");
    const [customerContact, setCustomerContact] = useState(singleBookingData ? singleBookingData.guest_contact : "");
    const [checkIn, setCheckIn] = useState(singleBookingData ? singleBookingData.check_in : "");
    const [checkOut, setCheckOut] = useState(singleBookingData ? singleBookingData.check_out : "");
    const [specialRequest, setSpecialRequest] = useState(singleBookingData ? singleBookingData.special_request : "");
    const [room, setRoom] = useState(singleBookingData ? singleBookingData.room : {});
    const createBookingObject = () => {
        return {
            booking_id: props.section === "New Booking" ? createID().toString() : (singleBookingData ? singleBookingData.booking_id : ""),
            guest_name: customerName,
            guest_email: customerMail,
            guest_contact: customerContact,
            order_date: singleBookingData ? singleBookingData.order_date : new Date().toDateString(),
            check_in: checkIn,
            check_out: checkOut,
            special_request: specialRequest,
            room: room,
            status: "Check In"
        };
    };
    const bookingSubmitHandler = (event) => {
        event.preventDefault();
        const bookingObject = createBookingObject();
        if (props.section === "New Booking") {
            dispatch(createBooking(bookingObject));
        }
        else {
            dispatch(editBooking(bookingObject));
        }
        props.section === "New Booking" ? nav("/bookings") : (props.setShowEditModal && props.setShowEditModal(false));
    };
    const roomChangeHandler = (event) => {
        const roomID = event.target.value;
        const newRoom = roomsList.find(room => room.room_id === roomID);
        if (newRoom) {
            setRoom(newRoom);
        }
    };
    return (React.createElement(CreateForm, { onSubmit: bookingSubmitHandler },
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "name" }, "Guest Name"),
            React.createElement(FormInput, { onChange: (event) => setCustomerName(event.target.value), type: "text", name: "name", value: customerName, required: true })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "email" }, "Guest Email"),
            React.createElement(FormInput, { onChange: (event) => setCustomerMail(event.target.value), type: "email", name: "email", value: customerMail, required: true })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "contact" }, "Contact"),
            React.createElement(FormInput, { onChange: (event) => setCustomerContact(event.target.value), type: "text", name: "contact", value: customerContact, required: true })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "check-in" }, "Check In"),
            React.createElement(FormDate, { onChange: (event) => setCheckIn(event.target.value), type: "date", name: "check-in", value: checkIn, required: true })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "check-out" }, "Check Out"),
            React.createElement(FormDate, { onChange: (event) => setCheckOut(event.target.value), type: "date", name: "check-out", value: checkOut, required: true })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "special-request" }, "Special Request"),
            React.createElement(FormTextArea, { onChange: (event) => setSpecialRequest(event.target.value), name: "special-request", value: specialRequest, required: true })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "room" }, "Room"),
            React.createElement(FormInput, { onChange: roomChangeHandler, name: "room", value: room ? room.room_id : "" })),
        React.createElement(UserFormButtonsContainer, null,
            React.createElement(SubmitButton, { type: "submit" }, "Save"),
            React.createElement(SubmitButton, { type: "button", onClick: () => { props.section === "New Booking" ? nav("/bookings") : (props.setShowEditModal && props.setShowEditModal(false)); } }, "Cancel"))));
};
