import React, { useEffect } from "react";
import { useSection } from "../../components/Layout";
import { UserForm } from "../../components/UserForm";

export const UserDetails = () => {

    const {sectionName, setSectionName} = useSection();

    useEffect(() => {
        setSectionName("Employee Info");
    });
    

    return <UserForm section={sectionName}/>;
}