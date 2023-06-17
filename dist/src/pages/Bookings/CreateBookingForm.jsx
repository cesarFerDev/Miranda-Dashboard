import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { BookingForm } from "../../components/BookingForm";
export const CreateBookingForm = (props) => {
    const [sectionName, setSectionName] = useOutletContext();
    useEffect(() => {
        setSectionName("New Booking");
    });
    return (<BookingForm section={sectionName}/>);
};
