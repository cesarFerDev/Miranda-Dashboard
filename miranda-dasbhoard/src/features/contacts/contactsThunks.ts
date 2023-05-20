import { createAsyncThunk } from "@reduxjs/toolkit";
import { addDelay } from "../../aux_functions/auxFunctions";
import contactsData from "../../data/contacts.json";
import { Contact } from "../../interfaces/interfaces";


export const loadContacts = createAsyncThunk("contacts/loadContacts", async () => {
    console.log("LLEGO ACÁ")
    const contactsArray = contactsData as Contact[];
    return await addDelay(contactsArray, 200);
});