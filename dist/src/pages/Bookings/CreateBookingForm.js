import React, { useEffect } from "react";
import { BookingForm } from "../../components/BookingForm";
import { useSection } from "../../components/Layout";
export const CreateBookingForm = () => {
    const { sectionName, setSectionName } = useSection();
    useEffect(() => {
        setSectionName("New Booking");
    });
    return (React.createElement(BookingForm, { section: sectionName }));
};
