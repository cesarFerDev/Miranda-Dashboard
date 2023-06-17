import styled from "styled-components";
import { LoginButton, SubmitButton } from "../styled_components/buttons/buttons";
import React, { useEffect, useState } from "react";
import { createID } from "../aux_functions/auxFunctions";
import { useDispatch, useSelector } from "react-redux";
import { createRoom, editRoom, loadRooms } from "../features/rooms/roomsThunks";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../app/store";
import { CreateLink } from "../pages/Users/Users";
import { createBooking } from "../features/bookings/bookingsThunks";
import { editBooking } from "../features/bookings/bookingsThunks";
import { CreateForm, FormDate, FormField, FormInput, FormLabel, FormSelect, FormTextArea, UserFormButtonsContainer } from "./UserForm";
import { Booking, Room } from "../interfaces/interfaces";
import { warningToastify } from "../aux_functions/toastifyMessages";

interface IBookingFormProps {
    section?: string
    setShowEditModal?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface MongoBooking {
    id?: string,
    guest_name: string,
    guest_email: string,
    guest_contact: string,
    order_date: string,
    check_in: string,
    check_out: string,
    special_request: string,
    room_id: string,
    status: 'Check In' | 'Check Out' | 'In Progress'
}

export const BookingForm = (props: IBookingFormProps) => {

    const roomsList = useAppSelector(state => state.rooms.data);
    const roomsStatus = useAppSelector(state => state.rooms.status);
    const bookingsData = useAppSelector(state => state.bookings.data);
    const {id} = useParams();

    let singleBookingData: Booking | undefined =  undefined;
    if (id) {
        singleBookingData = bookingsData.find(booking => booking.id === id);
    }

    

    const dispatch = useAppDispatch();
    const nav = useNavigate();

    useEffect(() => {
        if (roomsStatus === "idle") {
            dispatch(loadRooms());
        }
    });

    const [customerName, setCustomerName] = useState(singleBookingData ? singleBookingData.guest_name : "");
    const [customerMail, setCustomerMail] = useState(singleBookingData ? singleBookingData.guest_email : "");
    const [customerContact, setCustomerContact] = useState(singleBookingData ? singleBookingData.guest_contact : "");
    const [checkIn, setCheckIn] = useState(singleBookingData ? singleBookingData.check_in : "");
    const [checkOut, setCheckOut] = useState(singleBookingData ? singleBookingData.check_out : "");
    const [specialRequest, setSpecialRequest] = useState(singleBookingData ? singleBookingData.special_request : "");
    const [room, setRoom] = useState(singleBookingData ? singleBookingData.room.id : (roomsList.length !== 0 ? roomsList[0].id : ""));

    const validateBookingDates = (order: string, check_in: string, check_out: string) => {
        if ((Date.parse(check_in) >= Date.parse(order)) && 
            (Date.parse(check_out) >= Date.parse(order) && Date.parse(check_out) > Date.parse(check_in))) {
            return true;
        }
        return false;
    };

    const createBookingObject = () => {
        const newBooking: MongoBooking = {
            // id: props.section === "New Booking" ? createID().toString() : (singleBookingData ? singleBookingData.id: ""),
            guest_name: customerName,
            guest_email: customerMail,
            guest_contact: customerContact,
            order_date: singleBookingData ? singleBookingData.order_date : new Date().toISOString().substring(0, 10),
            check_in: checkIn,
            check_out: checkOut,
            special_request: specialRequest,
            room_id: room!,
            status: "Check In"
        };
        if (validateBookingDates(newBooking.order_date, newBooking.check_in, newBooking.check_out)) {
            if (props.section !== "New Booking") {
                newBooking.id = singleBookingData?.id;
            }
            return newBooking;
        } else {
            return null;
        }
        
    }

    const bookingSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const bookingObject = createBookingObject();
        if (bookingObject) {
            if (props.section === "New Booking") {
                dispatch(createBooking(bookingObject));
            } else {
                dispatch(editBooking(bookingObject));
            }
            dispatch(editRoom({id: bookingObject.room_id, is_available: false}))
            props.section === "New Booking" ? nav("/bookings") : (props.setShowEditModal && props.setShowEditModal(false));
        } else {
            warningToastify("Invalid Date Inputs");
        }
        
    }

    const roomChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const roomID: string = event.target.value;
        const newRoom = roomsList.find(room => room.id === roomID);
        if (newRoom) {
            setRoom(roomID);
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
                <FormTextArea onChange={(event) => setSpecialRequest(event.target.value)} name="special-request" value={specialRequest}/>
            </FormField>
            <FormField>
                <FormLabel htmlFor="room">Room</FormLabel>
                <FormSelect onChange={(event) => setRoom(event.target.value)} name="room" value={room ? room : ""}>
                    {singleBookingData && <option value={singleBookingData.room.id}>{`${singleBookingData.room.type} ${singleBookingData.room.number.toString()}`}</option>}
                    {roomsList.filter(room => room.is_available === true).map(room => {
                        return <option value={room.id}>{`${room.type} ${room.number && room.number.toString()}`}</option>;
                    })}
                </FormSelect>
            </FormField>
            <UserFormButtonsContainer>
                <SubmitButton type="submit">Save</SubmitButton>
                <SubmitButton type="button" onClick={() => {props.section === "New Booking" ? nav("/bookings") : (props.setShowEditModal && props.setShowEditModal(false))}}>Cancel</SubmitButton>
            </UserFormButtonsContainer>
        </CreateForm>
    );


};