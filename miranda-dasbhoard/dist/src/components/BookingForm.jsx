import styled from "styled-components";
import { LoginButton, SubmitButton } from "../styled_components/buttons/buttons";
import { useState } from "react";
import { createID } from "../aux_functions/auxFunctions";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, editRoom } from "../features/rooms/roomsThunks";
import { useNavigate, useParams } from "react-router-dom";
import { CreateLink } from "../pages/Users/Users";
import { createBooking } from "../features/bookings/bookingsThunks";
import { editBooking } from "../features/bookings/bookingsThunks";
import { CreateForm, FormDate, FormField, FormInput, FormLabel, FormSelect, FormTextArea, UserFormButtonsContainer } from "./UserForm";
export const BookingForm = (props) => {
    const roomsList = useSelector(state => state.rooms.data);
    const bookingsData = useSelector(state => state.bookings.data);
    const { id } = useParams();
    const singleBookingData = bookingsData.find(booking => booking.booking_id === id);
    const dispatch = useDispatch();
    const nav = useNavigate();
    const [customerName, setCustomerName] = useState(singleBookingData ? singleBookingData.customer.name : "");
    const [customerMail, setCustomerMail] = useState(singleBookingData ? singleBookingData.customer.email : "");
    const [customerContact, setCustomerContact] = useState(singleBookingData ? singleBookingData.customer.contact : "");
    const [checkIn, setCheckIn] = useState(singleBookingData ? singleBookingData.check_in : "");
    const [checkOut, setCheckOut] = useState(singleBookingData ? singleBookingData.check_out : "");
    const [specialRequest, setSpecialRequest] = useState(singleBookingData ? singleBookingData.special_request : "");
    const [room, setRoom] = useState(singleBookingData ? singleBookingData.room : {});
    const createBookingObject = () => {
        return {
            booking_id: props.section === "New Booking" ? createID().toString() : singleBookingData.booking_id,
            customer: {
                name: customerName,
                email: customerMail,
                contact: customerContact
            },
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
        //props.show nav(`/bookings/${id}`)
        props.section === "New Booking" ? nav("/bookings") : props.setShowEditModal(false);
    };
    return (<CreateForm onSubmit={bookingSubmitHandler}>

            <FormField>
                <FormLabel htmlFor="name">Guest Name</FormLabel>
                <FormInput onChange={(event) => setCustomerName(event.target.value)} type="text" name="name" value={customerName}/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="email">Guest Email</FormLabel>
                <FormInput onChange={(event) => setCustomerMail(event.target.value)} type="email" name="email" value={customerMail}/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="contact">Contact</FormLabel>
                <FormInput onChange={(event) => setCustomerContact(event.target.value)} type="text" name="contact" value={customerContact}/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="check-in">Check In</FormLabel>
                <FormDate onChange={(event) => setCheckIn(event.target.value)} type="date" name="check-in" value={checkIn}/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="check-out">Check Out</FormLabel>
                <FormDate onChange={(event) => setCheckOut(event.target.value)} type="date" name="check-out" value={checkOut}/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="special-request">Special Request</FormLabel>
                <FormTextArea onChange={(event) => setSpecialRequest(event.target.value)} type="text" name="special-request" value={specialRequest}/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="room">Room</FormLabel>
                <FormSelect onChange={(event) => setRoom(event.target.value)} name="room" value={room ? `${room.type} ${room.number}` : "Select a Room"}>
                    {roomsList.forEach(room => {
            return <option value={room.room_id}>{`${room.type} ${room.number}`}</option>;
        })}
                </FormSelect>
            </FormField>
            <UserFormButtonsContainer>
                <SubmitButton type="submit">Save</SubmitButton>
                <SubmitButton type="button" onClick={() => { props.section === "New Booking" ? nav("/bookings") : props.setShowEditModal(false); }}>Cancel</SubmitButton>
            </UserFormButtonsContainer>
        </CreateForm>);
};
