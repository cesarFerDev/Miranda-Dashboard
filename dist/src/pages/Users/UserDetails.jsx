import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { UserForm } from "../../components/UserForm";
export const UserDetails = (props) => {
    const [sectionName, setSectionName] = useOutletContext();
    useEffect(() => {
        setSectionName("Employee Info");
    });
    return <UserForm section={sectionName}/>;
};
