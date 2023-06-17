import { useOutletContext } from "react-router-dom";
export const EditUser = (props) => {
    const [sectionName, setSectionName] = useOutletContext();
    setSectionName("User Details");
    return <h1>EDIT USER</h1>;
};
