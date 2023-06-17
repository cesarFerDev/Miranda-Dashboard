import { Link } from "react-router-dom";
import styled from "styled-components";
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
export const GreyText = styled.p `
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
            return (React.createElement(React.Fragment, null,
                React.createElement(TableRow, null,
                    React.createElement(TableDataElement, null,
                        React.createElement(TableLink, { to: `/bookings/${booking.booking_id}` },
                            React.createElement(ElementTableTextContainer, null,
                                React.createElement(StrongText, null, booking.guest_name),
                                React.createElement(GreyText, null,
                                    "ID ",
                                    booking.booking_id)))),
                    React.createElement(TableDataElement, null,
                        React.createElement(GreyText, null, booking.order_date)),
                    React.createElement(TableDataElement, null,
                        React.createElement(GreyText, null, booking.check_in)),
                    React.createElement(TableDataElement, null,
                        React.createElement(GreyText, null, booking.check_out)),
                    React.createElement(TableDataElement, null,
                        React.createElement(EditButton, { onClick: () => showRequestClickHanlder(booking.special_request) }, "View Notes")),
                    React.createElement(TableDataElement, null,
                        booking.room && booking.room.type,
                        " ",
                        booking.room && booking.room.number),
                    React.createElement(TableDataElement, null,
                        React.createElement(StatusButton, { status: booking.status }, booking.status)),
                    React.createElement(TableDataElement, null,
                        React.createElement(DeleteDots, { onClick: () => setShowDelete(prev => prev === booking.booking_id ? null : booking.booking_id) },
                            React.createElement("img", { src: dots, alt: "" }),
                            showDelete === booking.booking_id && React.createElement(DeleteButton, { onClick: () => deleteBookingClickHandler(booking.booking_id) },
                                React.createElement("img", { src: trash }),
                                " Delete"))))));
        }
    };
    const createRoomsTableRows = (room) => {
        if (room) {
            return (React.createElement(React.Fragment, null,
                React.createElement(TableRow, null,
                    React.createElement(TableDataElement, null,
                        React.createElement(TableLink, { to: `/rooms/${room.room_id}` },
                            React.createElement(ElementTableInfoContainer, null,
                                React.createElement("img", { className: "user__photo", src: room.photos && room.photos[0], alt: "" }),
                                React.createElement(ElementTableTextContainer, null,
                                    React.createElement(StrongText, null, room.number),
                                    React.createElement(GreyText, null,
                                        "ID ",
                                        room.room_id))))),
                    React.createElement(TableDataElement, null, room.type),
                    React.createElement(TableDataElement, null, room.amenities),
                    React.createElement(TableDataElement, null,
                        React.createElement(StrongText, { className: room.discount !== 0 ? "lined" : "" },
                            "$ ",
                            room.price),
                        React.createElement(GreyText, null, "/night")),
                    React.createElement(TableDataElement, null,
                        React.createElement(StrongText, { className: room.discount !== 0 ? "offer" : "" },
                            room.discount !== 0 ? `$ ${discount(room.price, room.discount)}` : "-",
                            " "),
                        React.createElement(GreyText, null, "/night")),
                    React.createElement(TableDataElement, null,
                        React.createElement(RoomStatusButton, { status: room.available }, room.available ? "Available" : "Booked")),
                    React.createElement(TableDataElement, null,
                        React.createElement(DeleteDots, { onClick: () => setShowDelete(prev => prev === room.room_id ? null : room.room_id) },
                            React.createElement("img", { src: dots, alt: "" }),
                            showDelete === room.room_id && React.createElement(DeleteButton, { onClick: () => deleteRoomClickHandler(room.room_id) },
                                React.createElement("img", { src: trash }),
                                " Delete"))))));
        }
    };
    const createContactsTableRows = (contact) => {
        if (contact) {
            return (React.createElement(React.Fragment, null,
                React.createElement(TableRow, null,
                    React.createElement(TableDataElement, null,
                        React.createElement(ElementTableTextContainer, null,
                            React.createElement(StrongText, null, contact.contact_id),
                            React.createElement(GreyText, null, contact.contact_date))),
                    React.createElement(TableDataElement, null,
                        React.createElement(ElementTableTextContainer, null,
                            React.createElement(StrongText, null, contact.guest_name),
                            React.createElement(GreyText, null, contact.guest_email),
                            React.createElement(GreyText, null, contact.guest_contact))),
                    React.createElement(TableDataElement, null,
                        React.createElement(ElementTableTextContainer, null,
                            React.createElement(StrongText, null, contact.content_title),
                            React.createElement(GreyText, null, contact.content_text))),
                    React.createElement(TableDataElement, null,
                        React.createElement(EditButton, null, "Archive")))));
        }
    };
    const createUsersTableRows = (user) => {
        if (user) {
            return (React.createElement(React.Fragment, null,
                React.createElement(TableRow, null,
                    React.createElement(TableDataElement, null,
                        React.createElement(TableLink, { to: `/users/${user.user_id}` },
                            React.createElement(ElementTableInfoContainer, null,
                                React.createElement("img", { className: "user__photo", src: user.photo, alt: "" }),
                                React.createElement(ElementTableTextContainer, null,
                                    React.createElement(StrongText, null, user.name),
                                    React.createElement(GreyText, null,
                                        "ID ",
                                        user.user_id),
                                    React.createElement(GreyText, null, user.email))))),
                    React.createElement(TableDataElement, null, user.start_date),
                    React.createElement(TableDataElement, null, user.job_description),
                    React.createElement(TableDataElement, null,
                        React.createElement("div", { style: { display: "flex" } },
                            React.createElement("img", { className: "phone__icon", src: phone, alt: "" }),
                            React.createElement(StrongText, null, user.contact))),
                    React.createElement(TableDataElement, null,
                        React.createElement(StatusText, { status: user.status }, user.status ? "ACTIVE" : "INACTIVE")),
                    React.createElement(TableDataElement, null,
                        React.createElement(DeleteDots, { onClick: () => setShowDelete(prev => prev === user.user_id ? null : user.user_id) },
                            React.createElement("img", { src: dots, alt: "" }),
                            showDelete === user.user_id && React.createElement(DeleteButton, { onClick: () => deleteUserClickHandler(user.user_id) },
                                React.createElement("img", { src: trash }),
                                " Delete"))))));
        }
    };
    const selectRowRender = (element) => {
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
    return (React.createElement(TableContainer, null,
        React.createElement("thead", null,
            React.createElement(TableHeaderRow, null, props.cols.map(col => React.createElement(TableColumnHeader, null, col)))),
        React.createElement("tbody", null, props.data.map(element => rowsRenderFunction(element)))));
};
