import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { archiveContacts, loadContacts } from "../features/contacts/contactsThunks";
import { Table } from "../components/Table";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useSection } from "../components/Layout";
import { ContactSlider } from "../components/ContactsSlider";
import { Contact } from "../interfaces/interfaces";
import { BorderGrey } from "./Bookings/BookingDetails";
import { ArchiveButton } from "../components/Table";
import { EntityStatusFiltersContainer, FilterButton, TableFiltersContainer } from "./Users/Users";



export const orderContacts = (array: Contact[], filter: string) => {
    let aux = [...array];

    let copyaux = aux;

    if (filter === "Archived") {
        copyaux = aux.filter(contact => contact.is_archived === true);
    } else if (filter === "Not Archived") {
        copyaux = aux.filter(contact => contact.is_archived === false);
    }

    

    copyaux = copyaux.sort((a,b) => {
        if (a.contact_date < b.contact_date) {
            return 1;
        } else if (a.contact_date > b.contact_date) {
            return -1;
        } else {
            return 0;
        }});

    return copyaux;

}



export const Contacts = () => {

    const dispatch = useAppDispatch();
    const contactsData = useAppSelector(state => state.contacts.data);
    const contactsStatus = useAppSelector(state => state.contacts.status);

    const [filterTable, setFilterTable] = useState("All");

    const {sectionName, setSectionName} = useSection();
    

    useEffect(() => {
        setSectionName("Contacts");

        if (contactsStatus === "idle") {
            dispatch(loadContacts());
        }
    }, [dispatch, contactsData, contactsStatus]);

    const contactsCols = ["Date", "Customer", "Content", "Archive"]

   

    return (<>
        <ContactSlider/>

        <TableFiltersContainer>
            <EntityStatusFiltersContainer>
                <FilterButton onClick={() => setFilterTable("All")} className={filterTable === "All" ? "active" : ""}>All Contacts</FilterButton>
                <FilterButton onClick={() => setFilterTable("Archived")} className={filterTable === "Archived" ? "active" : ""}>Archived Contacts</FilterButton>
            </EntityStatusFiltersContainer>
        </TableFiltersContainer>

        <Table section={sectionName} cols={contactsCols} data={orderContacts(contactsData, filterTable)}/>
        </>)
}