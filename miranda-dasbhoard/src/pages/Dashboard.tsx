import React, { useEffect } from "react";
import { useSection } from "../components/Layout";

export const Dashboard = (): React.JSX.Element => {

    const {sectionName, setSectionName} = useSection();

    useEffect(() => {
        setSectionName("Dashboard");
    })
    

    return ( 
        <h1>DASHBOARD</h1>
    )
};