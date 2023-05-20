import React, { useEffect } from "react";
import { loadContacts } from "../features/contacts/contactsThunks";
import { Table } from "../components/Table";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useSection } from "../components/Layout";

export const Contacts = () => {

    const dispatch = useAppDispatch();
    const contactsData = useAppSelector(state => state.contacts.data);
    const contactsStatus = useAppSelector(state => state.contacts.status);

    const {sectionName, setSectionName} = useSection();
    

    useEffect(() => {
        setSectionName("Contacts");

        if (contactsStatus === "idle") {
            dispatch(loadContacts());
        }
    }, [dispatch, contactsData, contactsStatus]);

    const contactsCols = ["Date", "Customer", "Content", "Archive"]

    

    return (<Table section={sectionName} cols={contactsCols} data={contactsData}/>);
}