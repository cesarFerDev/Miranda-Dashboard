import { Table } from "../../components/Table";
import { loadBookings } from "../../features/bookings/bookingsThunks";
import React, { useEffect, useState } from "react";
import { TableFiltersContainer, EntityStatusFiltersContainer, EntityFiltersContainer, FilterButton, SearchBar, CreateLink } from "../Users/Users";
import { Booking } from "../../interfaces/interfaces";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useSection } from "../../components/Layout";
import styled from "styled-components";
import { Triangle } from "react-loader-spinner";

export const SelectFilter = styled.select`
    font-family: 'Poppins';
    font-weight: 600;
    text-align: center;
    width: 70%;
    min-width: 90px;
    max-width: 120px;
    height: 50px;
    background-color: #EBF1EF;
    color: #135846;
    border: none;
    border-radius: 8px;
    &:hover {
        cursor: pointer;
        background-color: #135846;
        color: #EBF1EF;
    }
`;

export const filterBookingsArray = (array: Booking[], filter: string, order: string, search: string) => {
    let aux = array ? [...array] : [];
    switch (filter) {
        case "All":
            break;
        case "Check In":
            aux = aux.filter(booking => booking.status === filter);
            break;    
        case "Check Out":
            aux = aux.filter(booking => booking.status === filter);
            break;    
        case "In Progress":
            aux = aux.filter(booking => booking.status === filter);
            break;    
    }
    switch (order) {
        case "order_date":
        case "check_in":   
        case "check_out":  
            aux = aux.sort((a,b) => {
                if (Date.parse(b[order]) < Date.parse(a[order])) {
                    return -1;
                } else if (Date.parse(b[order]) > Date.parse(a[order])) {
                    return 1;
                } else {
                    return 0;
                }
            });
            break;   
        case "guest_name":
            aux = aux.sort((a,b) => {
                if (a[order] < b[order]) {
                    return -1;
                } else if (a[order] > b[order]) {
                    return 1;
                } else {
                    return 0;
                }
            });
            break;    
    }

    if (search != "") {
        aux = aux.filter(booking => booking.guest_name.toLowerCase().includes(search.toLowerCase()));
    }
    return aux;
}

export const Bookings = () => {

    const dispatch = useAppDispatch();
    const bookingsStatus = useAppSelector(state => state.bookings.status);
    const bookingsData = useAppSelector(state => state.bookings.data);
    const [filterTable, setFilterTable] = useState("All");
    const [propertyOrder, setPropertyOrder] = useState("order_date");
    const [searchGuest, setSearchGuest] = useState("");
    
    const {sectionName, setSectionName} = useSection();

    useEffect(() => {
        setSectionName("Bookings");
        
        if (bookingsStatus === "idle") {
            dispatch(loadBookings());
        } 
        
    }, [dispatch, bookingsData, bookingsStatus, filterTable, propertyOrder]);

    const displayLoader = () => {
        if (bookingsStatus === "pending") {
          return true
        }
        return false
    }

    const bookingsCols = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room", "Status"];

    return (<>
        {displayLoader() && <Triangle
            height="200"
            width="200"
            color="#135846"
            ariaLabel="triangle-loading"
            wrapperStyle={{position: "absolute", top: "40%", left: "50%"}}
            visible={true}
        />}
        {!displayLoader() && <><TableFiltersContainer>
        <EntityStatusFiltersContainer>
            <FilterButton onClick={() => setFilterTable("All")} className={filterTable === "All" ? "active" : ""}>All Bookings</FilterButton>
            <FilterButton onClick={() => setFilterTable("Check In")} className={filterTable === "Check In" ? "active" : ""}>Checking In</FilterButton>
            <FilterButton onClick={() => setFilterTable("Check Out")} className={filterTable === "Check Out" ? "active" : ""}>Checking Out</FilterButton>
            <FilterButton onClick={() => setFilterTable("In Progress")} className={filterTable === "In Progress" ? "active" : ""}>In Progress</FilterButton>
        </EntityStatusFiltersContainer>

        <EntityFiltersContainer>
            <SearchBar placeholder="Search Customer" type="text" onChange={(event) => setSearchGuest(event.target.value)}></SearchBar>
            <CreateLink to="/bookings/create">+ New Booking</CreateLink>
            <SelectFilter onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setPropertyOrder(event.target.value)} name="order">Order By
                <option value="order_date">Order Date</option>
                <option value="check_in">Check In</option>
                <option value="check_out">Check Out</option>
                <option value="guest_name">Guest Name</option>
            </SelectFilter>
        </EntityFiltersContainer>

        </TableFiltersContainer>

        <Table section={sectionName} cols={bookingsCols} data={filterBookingsArray(bookingsData, filterTable, propertyOrder, searchGuest)}/>
        </>}
    </>);
    
    
}