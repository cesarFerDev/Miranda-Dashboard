import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { createUser, loadUsers } from "../../features/users/usersThunks";
import { Table } from "../../components/Table";
import {createID } from "../../aux_functions/auxFunctions"
import styled from "styled-components";
import { EditButton, LoginButton } from "../../styled_components/buttons/buttons";
import { CreateUserForm } from "./CreateUserForm";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useSection } from "../../components/Layout";
import { User } from "../../interfaces/interfaces";
import { SelectFilter } from "../Bookings/Bookings";
import {Triangle} from "react-loader-spinner";

export const EntityFiltersContainer = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-between;
`;

export const EntityStatusFiltersContainer = styled.div`
    width: 45%;
    display: flex;
`;

export const CreateLink = styled(Link)`
    margin: 0px 20px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    width: 30%;
    min-width: 120px;
    background-color: rgb(19, 88, 70);
    color: rgb(235, 241, 239);
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
    max-width: 180px;
    height: 50px;
    border: none;
    border-radius: 8px;
    &:hover {
        background-color: #EBF1EF;
        color: #135846;
        cursor: pointer;
    }
`;

export const TableFiltersContainer = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

export const FilterButton = styled(EditButton)`
    font-size: 16px;
    background: none;
    border-radius: 0;
    color:#6E6E6E;
    border-bottom: 2px solid #6E6E6E;
    min-width: 70px;
    max-width: 35%;
    &:hover {
        color: #135846;
        border-color: #135846;
        background: none;
    }
    &.active {
        color: #135846;
        border-color: #135846;
        background: none;
    }
`;

export const SearchBar = styled.input`
    width: 50%;
    font-size: 16px;
    font-family: "Poppins";
    border: none;
    border-bottom: 2px solid #6E6E6E;
    background: none;
    height: 45px;
`;

const filterUsersArray = (array: User[], filter: string, order: string, search: string) => {
    let aux = array ? [...array] : [];

    switch (filter) {
        case "All":
            break;
        case "Active":
            aux = aux.filter(user => user.is_active === true);
            break;    
        case "Inactive":
            aux = aux.filter(user => user.is_active === false);
            break;  
    }

    switch (order) {
        case "start_date": 
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
        case "user_name":
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
        aux = aux.filter(user => user.user_name.toLowerCase().includes(search.toLowerCase()));
    }

    return aux;
}

export const Users = () => {

    const dispatch = useAppDispatch();
    const usersData = useAppSelector(state => state.users.data);
    const usersStatus = useAppSelector(state => state.users.status);

    const [filterTable, setFilterTable] = useState("All");
    const [propertyOrder, setPropertyOrder] = useState("start_date");
    const [searchGuest, setSearchGuest] = useState("");

    const {sectionName, setSectionName} = useSection();

    useEffect(() => {
        setSectionName("Users");

        if (usersStatus === "idle") {
            dispatch(loadUsers());
        }
    }, [dispatch, usersData, usersStatus]);

    const displayLoader = () => {
        if (usersStatus === "pending") {
          return true
        }
        return false
    }


    //const usersCols = ["Photo", "Name", "ID", "Email", "Start Date", "Description", "Contact", "Status"]
    const usersCols = ["Employee", "Start Date", "Description", "Contact", "Status"]

    return (
    <>
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
            <FilterButton onClick={() => setFilterTable("All")} className={filterTable === "All" ? "active" : ""}>All Employees</FilterButton>
            <FilterButton onClick={() => setFilterTable("Active")} className={filterTable === "Active" ? "active" : ""}>Active Employees</FilterButton>
            <FilterButton onClick={() => setFilterTable("Inactive")} className={filterTable === "Inactive" ? "active" : ""}>Inactive Employees</FilterButton>
        </EntityStatusFiltersContainer>

        <EntityFiltersContainer>
            <SearchBar placeholder="Search User" type="text" onChange={(event) => setSearchGuest(event.target.value)}></SearchBar>
            <CreateLink to="/users/create">+ New Employee</CreateLink>
            <SelectFilter onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setPropertyOrder(event.target.value)} name="order">Order By
                <option value="start_date">Start Date</option>
                <option value="user_name">Name</option>
            </SelectFilter>
        </EntityFiltersContainer>

    </TableFiltersContainer>

    <Table section={sectionName} cols={usersCols} data={filterUsersArray(usersData, filterTable, propertyOrder, searchGuest)}/>
    </>}
    </>);
}

