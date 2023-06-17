import { useOutletContext } from "react-router-dom";
import { Table } from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { loadBookings } from "../../features/bookings/bookingsThunks";
import { useEffect } from "react";
import { TableFiltersContainer, UserStatusFiltersContainer, UserFiltersContainer, FilterButton, SearchBar, CreateLink } from "../Users/Users";
import { EditButton } from "../../styled_components/buttons/buttons";
import { useState } from "react";
import { sortByProperty } from "../../aux_functions/auxFunctions";
const filterBookingsArray = (array, filter, order, search) => {
    let aux = [...array];
    switch (filter) {
        case "All":
            break;
        case "Check In":
            aux = aux.filter(booking => booking.status === filter);
            break;
        case "Check Out":
            aux = aux.filter(booking => booking.status === filter);
            break;
        case "In progress":
            aux = aux.filter(booking => booking.status === filter);
            break;
    }
    aux = aux.sort((a, b) => a[order] - b[order]);
    if (search != "") {
        aux = aux.filter(booking => booking.customer.name.includes(search));
    }
    return aux;
};
export const Bookings = (props) => {
    const dispatch = useDispatch();
    const bookingsStatus = useSelector(state => state.bookings.status);
    const bookingsData = useSelector(state => state.bookings.data);
    const [filterTable, setFilterTable] = useState("All");
    const [propertyOrder, setPropertyOrder] = useState("order_date");
    const [searchGuest, setSearchGuest] = useState("");
    const [sectionName, setSectionName] = useOutletContext();
    useEffect(() => {
        setSectionName("Bookings");
        if (bookingsStatus === "idle") {
            dispatch(loadBookings());
        }
    }, [dispatch, bookingsData, bookingsStatus, filterTable, propertyOrder]);
    const bookingsCols = ["Guest", "Order Date", "Check In", "Check Out", "Special Request", "Room", "Status"];
    return (<>
        <TableFiltersContainer>
        <UserStatusFiltersContainer>
            <FilterButton onClick={() => setFilterTable("All")} className={filterTable === "All" ? "active" : ""}>All Bookings</FilterButton>
            <FilterButton onClick={() => setFilterTable("Check In")} className={filterTable === "Check In" ? "active" : ""}>Checking In</FilterButton>
            <FilterButton onClick={() => setFilterTable("Check Out")} className={filterTable === "Check Out" ? "active" : ""}>Checking Out</FilterButton>
            <FilterButton onClick={() => setFilterTable("In progress")} className={filterTable === "In progress" ? "active" : ""}>In Progress</FilterButton>
        </UserStatusFiltersContainer>

        <UserFiltersContainer>
            <SearchBar placeholder="Search Customer" type="text" onChange={(event) => setSearchGuest(event.target.value)}></SearchBar>
            <CreateLink to="/bookings/create">+ New Booking</CreateLink>
            {/*<EditButton>Order By</EditButton>*/}
            <select onChange={(event) => setPropertyOrder(event.target.value)} name="order">Order By
                <option value="order_date">Order Date</option>
                <option value="check_in">Check In</option>
                <option value="check_out">Check Out</option>

            </select>
        </UserFiltersContainer>

        </TableFiltersContainer>

        <Table section={sectionName} cols={bookingsCols} data={filterBookingsArray(bookingsData, filterTable, propertyOrder, searchGuest)}/>
    
    </>);
};
