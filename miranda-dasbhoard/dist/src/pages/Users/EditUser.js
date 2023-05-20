import { useOutletContext } from "react-router-dom";
export const EditUser = (props) => {
    const [sectionName, setSectionName] = useOutletContext();
    setSectionName("User Details");
    return React.createElement("h1", null, "EDIT USER");
};
