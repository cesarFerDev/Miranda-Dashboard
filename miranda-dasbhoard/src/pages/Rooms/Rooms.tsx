import React, { useEffect } from "react";
import { loadRooms } from "../../features/rooms/roomsThunks";
import { Table } from "../../components/Table";
import { CreateLink, UserFiltersContainer } from "../Users/Users";
import { EditButton } from "../../styled_components/buttons/buttons";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useSection } from "../../components/Layout";

export const Rooms = () => {

    const dispatch = useAppDispatch();
    const roomsData = useAppSelector(state => state.rooms.data);
    const roomsStatus = useAppSelector(state => state.rooms.status);

    const {sectionName, setSectionName} = useSection();
    
    useEffect(() => {
        setSectionName("Rooms");

        if (roomsStatus === "idle") {
            dispatch(loadRooms());
        }
    }, [dispatch, roomsData, roomsStatus]);

    const roomsCols = ["Room", "Room Type", "Amenities", "Price", "Offer Price", "Status"];

    console.log("Rooms Data")
    console.log(roomsData)

    return (
    <>
    <RoomsFiltersContainer>
        <CreateLink to="/rooms/create">+ New Room</CreateLink>
        <EditButton>Order By</EditButton>
    </RoomsFiltersContainer>
    
    <Table section={sectionName} cols={roomsCols} data={roomsData}/>
    
    </>);
}

const RoomsFiltersContainer = styled(UserFiltersContainer)`
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 20px;
`;