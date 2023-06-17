import React, { useEffect } from "react";
import { useSection } from "../../components/Layout";
import { RoomForm } from "../../components/RoomForm";
export const RoomDetails = () => {
    const { sectionName, setSectionName } = useSection();
    useEffect(() => {
        setSectionName("Room Details");
    });
    return React.createElement(RoomForm, { section: sectionName });
};
