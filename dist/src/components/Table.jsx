import { Link } from "react-router-dom";
import styled from "styled-components";
//import { EditButton } from "./SideBar";
import { EditButton } from "../styled_components/buttons/buttons";
import { DeleteButton } from "../styled_components/buttons/buttons";
import { StatusButton } from "../styled_components/buttons/buttons";
import React, { useState } from "react";
import dots from "../assets/dots_button.svg";
import trash from "../assets/trash.svg";
import phone from "../assets/phone.svg";
import { discount } from "../aux_functions/auxFunctions";
import { useAppDispatch } from "../app/store";
import { deleteBooking } from "../features/bookings/bookingsThunks";
import { StatusText } from "./UserForm";
import { deleteUser } from "../features/users/usersThunks";
import { deleteRoom } from "../features/rooms/roomsThunks";
const RoomStatusButton = styled(EditButton) `
    background-color: ${props => props.status ? "#5AD07A" : "#E23428"};
    color: #FFFFFF;
`;
const RequestModal = styled.div `
    position: absolute;
    background-color:#135846;
    color: #FFFFFF;
    //top: 50%;
    //right: 17%;
    width: 400px;
    border-radius: 12px;
    padding: 15px;
`;
const TableContainer = styled.table `
    background-color: #FFFFFF;
    box-shadow: 0px 20px 30px #00000014;
    border-radius: 20px;
    text-align: left;
    width: 100%;
    border-collapse: collapse;
    padding: 15px 30px;
    h4, p {
        margin: 5px 0;
    }
`;
const TableRow = styled.tr `
    position: relative;
    height: 90px;
    &:hover {
        scale: 1.015;
    }
`;
const TableHeaderRow = styled.tr `
    height: 90px;
    border-bottom: 1px solid #b2b2b233;
`;
const TableColumnHeader = styled.th `
    padding: 20px;
`;
const TableDataElement = styled.td `
    max-width: 250px;
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 500;
    .user__photo {
        min-width: 130px;
        min-height: 100px;
        width: 100%;
    }
    .phone__icon {
        width: 15%;
        margin-right: 5px;
    }
`;
const TableLink = styled(Link) `
    text-decoration: none;
    color:#212121
`;
const DeleteDots = styled.button `
    position: relative;
    border: none;
    background: none;
    img {
        width: 100%;
    }
    &:hover {
        cursor: pointer;
    }
`;
const GreyText = styled.p `
    font-size: 14px;
    font-weight: 400;
    color: #6E6E6E;
`;
const StrongText = styled.h4 `
    font-weight: 600;
    font-size: 20px;
    &.lined {
        text-decoration: line-through;
        color:#e23428;
        
    }
    &.offer {
        color:#5AD07A;
        
    }
`;
const ElementTableInfoContainer = styled.div `
    display: grid;
    grid-template-columns: 1fr 2fr;
`;
const ElementTableTextContainer = styled.div `
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
export const Table = (props) => {
    const dispatch = useAppDispatch();
    const [modal, setModal] = useState(false);
    const [request, setRequest] = useState("");
    const [showDelete, setShowDelete] = useState(null);
    const showRequestClickHanlder = (request) => {
        setRequest(request);
        setModal(true);
    };
    const deleteBookingClickHandler = (id) => {
        setShowDelete(null);
        dispatch(deleteBooking(id));
    };
    const deleteUserClickHandler = (id) => {
        setShowDelete(null);
        dispatch(deleteUser(id));
    };
    const deleteRoomClickHandler = (id) => {
        setShowDelete(null);
        dispatch(deleteRoom(id));
    };
    const createBookingTableRows = (booking) => {
        if (booking) {
            return (<>
                <TableRow>
                    <TableDataElement><TableLink to={`/bookings/${booking.booking_id}`}>{booking.guest_name}</TableLink></TableDataElement>
                    <TableDataElement><GreyText>{booking.order_date}</GreyText></TableDataElement>
                    <TableDataElement><GreyText>{booking.check_in}</GreyText></TableDataElement>
                    <TableDataElement><GreyText>{booking.check_out}</GreyText></TableDataElement>
                    <TableDataElement><EditButton onClick={() => showRequestClickHanlder(booking.special_request)}>View Notes</EditButton></TableDataElement>
                    <TableDataElement>{booking.room.type} {booking.room.number}</TableDataElement>
                    <TableDataElement><StatusButton status={booking.status}>{booking.status}</StatusButton></TableDataElement>
                    <TableDataElement><DeleteDots onClick={() => setShowDelete(prev => prev === booking.booking_id ? null : booking.booking_id)}><img src={dots} alt=""/>{showDelete === booking.booking_id && <DeleteButton onClick={() => deleteBookingClickHandler(booking.booking_id)}><img src={trash}/> Delete</DeleteButton>}</DeleteDots></TableDataElement>
                </TableRow>
                </>);
        }
    };
    const createRoomsTableRows = (room) => {
        if (room) {
            return (<>
            <TableRow>
                <TableDataElement>
                    <TableLink to={`/rooms/${room.room_id}`}>
                        <ElementTableInfoContainer>
                            <img className="user__photo" src={room.photos} alt=""/>
                            <ElementTableTextContainer>
                                <StrongText>{room.number}</StrongText>
                                <GreyText>ID {room.room_id}</GreyText>
                            </ElementTableTextContainer>
                        </ElementTableInfoContainer>
                    </TableLink>
                </TableDataElement>
                <TableDataElement>{room.type}</TableDataElement>
                <TableDataElement>{room.amenities}</TableDataElement>
                <TableDataElement><StrongText className={room.discount !== 0 ? "lined" : ""}>$ {room.price}</StrongText><GreyText>/night</GreyText></TableDataElement>
                <TableDataElement><StrongText className={room.discount !== 0 ? "offer" : ""}>{room.discount !== 0 ? `$ ${discount(room.price, room.discount)}` : "-"} </StrongText><GreyText>/night</GreyText></TableDataElement>
                <TableDataElement><RoomStatusButton status={room.available}>{room.available ? "Available" : "Booked"}</RoomStatusButton></TableDataElement>
                <TableDataElement><DeleteDots onClick={() => setShowDelete(prev => prev === room.room_id ? null : room.room_id)}><img src={dots} alt=""/>{showDelete === room.room_id && <DeleteButton onClick={() => deleteRoomClickHandler(room.room_id)}><img src={trash}/> Delete</DeleteButton>}</DeleteDots></TableDataElement>
            </TableRow>
            </>);
        }
    };
    const createContactsTableRows = (contact) => {
        if (contact) {
            return (<>
            <TableRow>
                <TableDataElement>
                    <ElementTableTextContainer>
                        <StrongText>{contact.contact_id}</StrongText>
                        <GreyText>{contact.contact_date}</GreyText>
                    </ElementTableTextContainer>
                </TableDataElement>
                <TableDataElement>
                    <ElementTableTextContainer>
                        <StrongText>{contact.guest_name}</StrongText>
                        <GreyText>{contact.guest_email}</GreyText>
                        <GreyText>{contact.guest_contact}</GreyText>
                    </ElementTableTextContainer>
                </TableDataElement>
                <TableDataElement>
                    <ElementTableTextContainer>
                        <StrongText>{contact.content_title}</StrongText>
                        <GreyText>{contact.content_text}</GreyText>
                    </ElementTableTextContainer>
                </TableDataElement>
                <TableDataElement><EditButton>Archive</EditButton></TableDataElement>
            </TableRow>
            </>);
        }
    };
    const createUsersTableRows = (user) => {
        if (user) {
            return (<>
                <TableRow>
                    <TableDataElement>
                    <TableLink to={`/users/${user.user_id}`}><ElementTableInfoContainer>
                        <img className="user__photo" src={user.photo} alt=""/>
                        <ElementTableTextContainer>
                            <StrongText>{user.name}</StrongText>
                            <GreyText>ID {user.user_id}</GreyText>
                            <GreyText>{user.email}</GreyText>
                        </ElementTableTextContainer>
                    </ElementTableInfoContainer></TableLink>
                    </TableDataElement>

                    <TableDataElement>{user.start_date}</TableDataElement>
                    <TableDataElement>{user.job_description}</TableDataElement>
                    <TableDataElement><div style={{ display: "flex" }}><img className="phone__icon" src={phone} alt=""/><StrongText>{user.contact}</StrongText></div></TableDataElement>
                    <TableDataElement><StatusText status={user.status}>{user.status ? "ACTIVE" : "INACTIVE"}</StatusText></TableDataElement>
                    <TableDataElement><DeleteDots onClick={() => setShowDelete(prev => prev === user.user_id ? null : user.user_id)}><img src={dots} alt=""/>{showDelete === user.user_id && <DeleteButton onClick={() => deleteUserClickHandler(user.user_id)}><img src={trash}/> Delete</DeleteButton>}</DeleteDots></TableDataElement>
                </TableRow>
                </>);
        }
    };
    const selectRowRender = (element) => {
        /* console.log(element) */
        switch (props.section) {
            case "Bookings":
                return createBookingTableRows(element);
            case "Rooms":
                return createRoomsTableRows(element);
            case "Contacts":
                return createContactsTableRows(element);
            case "Users":
                return createUsersTableRows(element);
        }
    };
    const rowsRenderFunction = (element) => selectRowRender(element);
    return (<TableContainer>
            <thead>
                <TableHeaderRow>
                    {props.cols.map(col => <TableColumnHeader>{col}</TableColumnHeader>)}
                </TableHeaderRow>
            </thead>
        
            <tbody>
                {props.data.map(element => rowsRenderFunction(element))}
                {/* {modal && <RequestModal><button onClick={() => setModal(false)}>X</button><p>{request}</p></RequestModal>} */}
            </tbody>

            
        </TableContainer>);
};
