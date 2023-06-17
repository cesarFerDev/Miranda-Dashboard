import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { RoomForm } from "../../components/RoomForm";
export const RoomDetails = (props) => {
    const [sectionName, setSectionName] = useOutletContext();
    useEffect(() => {
        setSectionName("Room Details");
    });
    return <RoomForm section={sectionName}/>;
};
