import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { createUser, loadUsers } from "../../features/users/usersThunks";
import { Table } from "../../components/Table";
import {createID } from "../../aux_functions/auxFunctions"
import styled from "styled-components";
import { EditButton, LoginButton } from "../../styled_components/buttons/buttons";
import { CreateUserForm } from "./CreateUserForm";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { useSection } from "../../components/Layout";

export const UserFiltersContainer = styled.div`
    width: 40%;
    display: flex;
    justify-content: space-between;
`;

export const UserStatusFiltersContainer = styled.div`
    width: 45%;
    display: flex;
`;

export const CreateLink = styled(Link)`
    margin: 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30%;
    background-color: #135846;
    color: #EBF1EF;
    font-weight: 600;
    font-size: 14px;
    text-decoration: none;
    max-width: 120px;
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

export const Users = () => {

    const dispatch = useAppDispatch();
    const usersData = useAppSelector(state => state.users.data);
    const usersStatus = useAppSelector(state => state.users.status);

    const {sectionName, setSectionName} = useSection();

    useEffect(() => {
        setSectionName("Users");

        if (usersStatus === "idle") {
            dispatch(loadUsers());
        }
    }, [dispatch, usersData, usersStatus]);


    //const usersCols = ["Photo", "Name", "ID", "Email", "Start Date", "Description", "Contact", "Status"]
    const usersCols = ["Employee", "Start Date", "Description", "Contact", "Status"]

    console.log("Users Data")
    console.log(usersData)

    return (
    <>
    <TableFiltersContainer>
        <UserStatusFiltersContainer>
            <FilterButton>All Employees</FilterButton>
            <FilterButton>Active Employees</FilterButton>
            <FilterButton>Inactive Employees</FilterButton>
        </UserStatusFiltersContainer>

        <UserFiltersContainer>
            <SearchBar placeholder="Search" type="text"></SearchBar>
            <CreateLink to="/users/create">+ New Employee</CreateLink>
            <EditButton>Order By</EditButton>
        </UserFiltersContainer>

    </TableFiltersContainer>

    <Table section={sectionName} cols={usersCols} data={usersData}/>
    </>
    );
}

