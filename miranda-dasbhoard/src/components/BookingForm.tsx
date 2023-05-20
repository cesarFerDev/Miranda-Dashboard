import styled from "styled-components";
import { LoginButton, SubmitButton } from "../styled_components/buttons/buttons";
import React, { useState } from "react";
import { createID } from "../aux_functions/auxFunctions";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, editRoom } from "../features/rooms/roomsThunks";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/store";
import { CreateLink } from "../pages/Users/Users";
import { createBooking } from "../features/bookings/bookingsThunks";
import { editBooking } from "../features/bookings/bookingsThunks";
import { CreateForm, FormDate, FormField, FormInput, FormLabel, FormSelect, FormTextArea, UserFormButtonsContainer } from "./UserForm";
import { Booking, Room } from "../interfaces/interfaces";

interface IBookingFormProps {
    section?: string
    setShowEditModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export const BookingForm = (props: IBookingFormProps) => {

    const roomsList = useAppSelector(state => state.rooms.data);
    
    const bookingsData = useAppSelector(state => state.bookings.data);
    const {id} = useParams();
    const singleBookingData = bookingsData.find(booking => booking.booking_id === id);

    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const [customerName, setCustomerName] = useState(singleBookingData ? singleBookingData.guest_name : "");
    const [customerMail, setCustomerMail] = useState(singleBookingData ? singleBookingData.guest_email : "");
    const [customerContact, setCustomerContact] = useState(singleBookingData ? singleBookingData.guest_contact : "");
    const [checkIn, setCheckIn] = useState(singleBookingData ? singleBookingData.check_in : "");
    const [checkOut, setCheckOut] = useState(singleBookingData ? singleBookingData.check_out : "");
    const [specialRequest, setSpecialRequest] = useState(singleBookingData ? singleBookingData.special_request : "");
    const [room, setRoom] = useState(singleBookingData ? singleBookingData.room : {} as Room);
    

    const createBookingObject = (): Booking => {
        return {
            booking_id: props.section === "New Booking" ? createID().toString() : (singleBookingData ? singleBookingData.booking_id: ""),
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
    }

    const bookingSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const bookingObject = createBookingObject();
        if (props.section === "New Booking") {
            dispatch(createBooking(bookingObject));
        } else {
            dispatch(editBooking(bookingObject));
        }
        
        props.section === "New Booking" ? nav("/bookings") : (props.setShowEditModal && props.setShowEditModal(false));
    }

    const roomChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const roomID: string = event.target.value;
        const newRoom = roomsList.find(room => room.room_id === roomID);
        if (newRoom) {
            setRoom(newRoom);
        }
    }

    return (
        <CreateForm onSubmit={bookingSubmitHandler}>

            <FormField>
                <FormLabel htmlFor="name">Guest Name</FormLabel>
                <FormInput onChange={(event) => setCustomerName(event.target.value)} type="text" name="name" value={customerName} required/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="email">Guest Email</FormLabel>
                <FormInput onChange={(event) => setCustomerMail(event.target.value)} type="email" name="email" value={customerMail} required/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="contact">Contact</FormLabel>
                <FormInput onChange={(event) => setCustomerContact(event.target.value)} type="text" name="contact" value={customerContact} required/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="check-in">Check In</FormLabel>
                <FormDate onChange={(event) => setCheckIn(event.target.value)} type="date" name="check-in" value={checkIn} required/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="check-out">Check Out</FormLabel>
                <FormDate onChange={(event) => setCheckOut(event.target.value)} type="date" name="check-out" value={checkOut} required/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="special-request">Special Request</FormLabel>
                <FormTextArea onChange={(event) => setSpecialRequest(event.target.value)} name="special-request" value={specialRequest} required/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="room">Room</FormLabel>
                <FormInput onChange={roomChangeHandler} name="room" value={room ? room.room_id : ""}>
                    {/*roomsList.forEach(room => {
                        return <option value={room.room_id}>{`${room.type} ${room.number}`}</option>;
                    })*/}
                </FormInput>
            </FormField>
            <UserFormButtonsContainer>
                <SubmitButton type="submit">Save</SubmitButton>
                <SubmitButton type="button" onClick={() => {props.section === "New Booking" ? nav("/bookings") : (props.setShowEditModal && props.setShowEditModal(false))}}>Cancel</SubmitButton>
            </UserFormButtonsContainer>
        </CreateForm>
    );


};