import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { RoomForm } from "../../components/RoomForm";
export const CreateRoomForm = (props) => {
    const [sectionName, setSectionName] = useOutletContext();
    useEffect(() => {
        setSectionName("New Room");
    });
    return (<RoomForm section={sectionName}/>);
};
