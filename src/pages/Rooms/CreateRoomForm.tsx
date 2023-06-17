import React, { useEffect } from "react";
import { useSection } from "../../components/Layout";
import { RoomForm } from "../../components/RoomForm";

export const CreateRoomForm = () => {

    const {sectionName, setSectionName} = useSection();

    useEffect(() => {
        setSectionName("New Room");
    });

    return (
        <RoomForm section={sectionName}/>
    );
}