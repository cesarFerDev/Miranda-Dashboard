import React, { useEffect } from "react";
import { useSection } from "../../components/Layout";
import { UserForm } from "../../components/UserForm";

export const CreateUserForm = () => {

    const {sectionName, setSectionName} = useSection();

    useEffect(() => {
        setSectionName("New Employee");
    });

    return (
        <UserForm section={sectionName}/>
    );
}

