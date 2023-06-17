import React, { useEffect } from "react";
import { useSection } from "../components/Layout";
export const Dashboard = () => {
    const { sectionName, setSectionName } = useSection();
    useEffect(() => {
        setSectionName("Dashboard");
    });
    return (React.createElement("h1", null, "DASHBOARD"));
};
