import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDelay, useFetch } from "../../aux_functions/auxFunctions";
import contactsData from "../../data/contacts.json";
import { Contact } from "../../interfaces/interfaces";
import { errorToastify, warningToastify } from "../../aux_functions/toastifyMessages";
import { RootState } from "../../app/store";

const contactsList = contactsData as Contact[];

export const loadContacts = createAsyncThunk("contacts/loadContacts", async () => {
    // try {
        const contacts: Contact[] = await useFetch(`/api/contacts`, "GET", undefined);
        if (contacts) {
            return contacts;
        } else {
            warningToastify("Failed to fetch Contacts. False data will be shown");
            return contactsList;
        }
    // } catch (error) {
    //     console.log(error)
    //     errorToastify("An error has ocurred");
    // }
});

export const archiveContacts = createAsyncThunk("contacts/archiveContacts", async (id: string) => {
    // try {
        const contactEdited: Contact = await useFetch(`/api/contacts/${id}`, "PUT", undefined);
        if (contactEdited) {
            return contactEdited;
        } else {
            const contactToEditJson = contactsList.find(contact => contact.id === id);
            if (contactToEditJson) {
                const contactEdited: Contact = {...contactToEditJson};
                contactEdited.is_archived = true;
                return contactEdited;
            }
        }
    // } catch (error) {
    //     console.log(error);
    //     errorToastify("An error has ocurred");
    // }
    
});