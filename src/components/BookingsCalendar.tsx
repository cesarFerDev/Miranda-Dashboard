import Calendar from 'reactjs-availability-calendar'
import React from 'react';
import "./BookingsCalendar.css"
import { Booking } from '../interfaces/interfaces';


interface CalendarProps {
    bookings: Booking[]
}

export const BookingsCalendar = (props: CalendarProps) => {

    const bookingsData = props.bookings;

    const getBookingsDate = () => {
        const bookingsArray: any = [];
        if (bookingsData) {
            bookingsData.map(booking => 
                bookingsArray.push({
                    from: booking.check_in,
                    to: booking.check_out,
                    middayCheckout: false
                })
            );
        }
        
        return bookingsArray;
    }

    return (
        <Calendar showKey={false} showNumberOfMonths={1} bookings={getBookingsDate()}/>
    );
};