import React, { useEffect, useState } from "react";
import { loadRooms } from "../../features/rooms/roomsThunks";
import { Table } from "../../components/Table";
import { CreateLink, EntityFiltersContainer } from "../Users/Users";
import { EditButton } from "../../styled_components/buttons/buttons";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useSection } from "../../components/Layout";
import { SelectFilter } from "../Bookings/Bookings";
import { Room } from "../../interfaces/interfaces";

const filterRoomsArray = (array: Room[], order: "number" | "available" | "price") => {
    let aux = [...array];

    aux = aux.sort((a,b) => {
        if (a[order] < b[order]) {
            return -1;
        } else if (a[order] > b[order]) {
            return 1;
        } else {
            return 0;
        }});

    return aux;
}

export const Rooms = () => {

    const dispatch = useAppDispatch();
    const roomsData = useAppSelector(state => state.rooms.data);
    const roomsStatus = useAppSelector(state => state.rooms.status);
    const [propertyOrder, setPropertyOrder] = useState("number");

    const {sectionName, setSectionName} = useSection();
    
    useEffect(() => {
        setSectionName("Rooms");

        if (roomsStatus === "idle") {
            dispatch(loadRooms());
        }
    }, [dispatch, roomsData, roomsStatus]);

    const roomsCols = ["Room", "Room Type", "Amenities", "Price", "Offer Price", "Status"];

    return (
    <>
    <RoomsFiltersContainer>
        <CreateLink to="/rooms/create">+ New Room</CreateLink>
        <SelectFilter onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setPropertyOrder(event.target.value)} name="order">Order By
            <option value="number">Number</option>
            <option value="available">Status</option>
            <option value="price">Price</option>
        </SelectFilter>
    </RoomsFiltersContainer>
    
    <Table section={sectionName} cols={roomsCols} data={filterRoomsArray(roomsData, propertyOrder as "number" | "available" | "price")}/>
    
    </>);
}

const RoomsFiltersContainer = styled(EntityFiltersContainer)`
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 20px;
`;