import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { UserForm } from "../../components/UserForm";
export const CreateUserForm = (props) => {
    const [sectionName, setSectionName] = useOutletContext();
    useEffect(() => {
        setSectionName("New Employee");
    });
    return (<UserForm section={sectionName}/>);
};
