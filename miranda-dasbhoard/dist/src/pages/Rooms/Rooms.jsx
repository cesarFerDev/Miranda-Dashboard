import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadRooms } from "../../features/rooms/roomsThunks";
import { Table } from "../../components/Table";
import { CreateLink, UserFiltersContainer } from "../Users/Users";
//import { EditButton } from "../../components/SideBar";
import { EditButton } from "../../styled_components/buttons/buttons";
import styled from "styled-components";
export const Rooms = (props) => {
    const dispatch = useDispatch();
    const roomsData = useSelector(state => state.rooms.data);
    const roomsStatus = useSelector(state => state.rooms.status);
    const [sectionName, setSectionName] = useOutletContext();
    useEffect(() => {
        setSectionName("Rooms");
        if (roomsStatus === "idle") {
            dispatch(loadRooms());
        }
    }, [dispatch, roomsData, roomsStatus]);
    const roomsCols = ["Room", "Room Type", "Amenities", "Price", "Offer Price", "Status"];
    console.log("Rooms Data");
    console.log(roomsData);
    return (<>
    <RoomsFiltersContainer>
        <CreateLink to="/rooms/create">+ New Room</CreateLink>
        <EditButton>Order By</EditButton>
    </RoomsFiltersContainer>
    
    <Table section={sectionName} cols={roomsCols} data={roomsData}/>
    
    </>);
};
const RoomsFiltersContainer = styled(UserFiltersContainer) `
    width: 100%;
    justify-content: flex-end;
    margin-bottom: 20px;
`;
