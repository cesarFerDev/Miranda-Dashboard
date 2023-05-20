import styled from "styled-components";
//import { LoginButton, SubmitButton } from "../pages/LogIn";
import { SubmitButton } from "../styled_components/buttons/buttons";
import React, { useState } from "react";
import { createID } from "../aux_functions/auxFunctions";
import { createUser, editUser } from "../features/users/usersThunks";
import { useNavigate, useParams } from "react-router-dom";
import { CreateLink } from "../pages/Users/Users";
import { useAppDispatch, useAppSelector } from "../app/store";
export const StatusText = styled.h4 `
    font-size: 16px;
    color: ${props => props.status === "active" ? "#5AD07A" : "#E23428"};
`;
export const FormField = styled.div `
    display: flex;
    flex-direction: column;
    width: 80%;
    padding: 10px 0;
    margin-bottom: 30px;
    img{
        width: 35%;
        margin: 0 auto; 
    }
`;
export const FormLabel = styled.label `
    font-size: 20px;
    font-weight: 600;
`;
export const FormInput = styled.input `
    width: 100%;
    font-size: 16px;
    font-family: "Poppins";
    border: none;
    color: #6E6E6E;
    border-bottom: 2px solid #135846;
    background: none;
`;
export const FormDate = styled(FormInput) `
    text-align: center;
`;
export const CreateForm = styled.form `
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding: 40px 20px;
    background-color: #FFFFFF;
    border-radius: 12px;
    border: 1px solid #135846;
    box-shadow: 0px 20px 30px #00000014;
    text-align: left;
    z-index: 10;
`;
export const FormTextArea = styled.textarea `
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: "Poppins";
    border: none;
    color: #6E6E6E;
    border-bottom: 2px solid #135846;
    background: none;
`;
export const FormSelect = styled.select `
    width: 100%;
    font-size: 16px;
    font-family: "Poppins";
    text-align: center;
    border: none;
    color: #6E6E6E;
    border-bottom: 2px solid #135846;
    background: none;
    
`;
export const FormRadio = styled.input `
    
`;
export const UserFormButtonsContainer = styled.div `
    width: 80%;
    display: flex;
    justify-content: space-evenly;
    margin-top: 40px;
`;
export const RadioField = styled(FormField) `
    flex-direction: row;
    justify-content: space-evenly;
    width: 40%;
`;
export const UserForm = (props) => {
    const usersData = useAppSelector(state => state.users.data);
    const { id } = useParams();
    const singleUserData = usersData.find(user => user.user_id === id);
    const dispatch = useAppDispatch();
    const nav = useNavigate();
    const [userPhoto, setUserPhoto] = useState(singleUserData ? singleUserData.photo : "https://f4.bcbits.com/img/0025239196_25.jpg");
    const [userName, setUserName] = useState(singleUserData ? singleUserData.name : "");
    const [userRole, setUserRole] = useState(singleUserData ? singleUserData.job : "");
    const [userEmail, setUserEmail] = useState(singleUserData ? singleUserData.email : "");
    const [userContact, setUserContact] = useState(singleUserData ? singleUserData.contact : "");
    const [userStartDate, setUserStartDate] = useState(singleUserData ? singleUserData.start_date : "");
    const [userRoleDescription, setUserRoleDescription] = useState(singleUserData ? singleUserData.job_description : "");
    const [userStatus, setUserStatus] = useState(singleUserData ? singleUserData.status : "");
    const [userPassword, setUserPassword] = useState(singleUserData ? singleUserData.password : "");
    const createUserObject = () => {
        return {
            user_id: props.section === "New Employee" ? createID().toString() : singleUserData ? singleUserData.user_id : "",
            photo: userPhoto,
            name: userName,
            job: userRole,
            email: userEmail,
            contact: userContact,
            start_date: userStartDate.toString(),
            job_description: userRoleDescription,
            status: userStatus,
            password: userPassword
        };
    };
    const userSubmitHandler = (event) => {
        event.preventDefault();
        const userObject = createUserObject();
        if (props.section === "New Employee") {
            dispatch(createUser(userObject));
        }
        else {
            dispatch(editUser(userObject));
        }
        nav("/users");
    };
    return (React.createElement(CreateForm, { onSubmit: userSubmitHandler },
        React.createElement(FormField, null,
            React.createElement("img", { src: userPhoto, alt: "" })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "name" }, "Name"),
            React.createElement(FormInput, { onChange: (event) => setUserName(event.target.value), type: "text", name: "name", value: userName, required: true })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "job" }, "Role"),
            React.createElement(FormSelect, { onChange: (event) => setUserRole(event.target.value), name: "job", value: userRole, required: true },
                React.createElement("option", { value: "manager" }, "Manager"),
                React.createElement("option", { value: "recepcionist" }, "Receptionist"),
                React.createElement("option", { value: "room-service" }, "Room Service"))),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "email" }, "Email"),
            React.createElement(FormInput, { onChange: (event) => setUserEmail(event.target.value), type: "email", name: "email", value: userEmail, required: true })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "contact" }, "Contact"),
            React.createElement(FormInput, { onChange: (event) => setUserContact(event.target.value), type: "text", name: "contact", value: userContact, required: true })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "start-date" }, "Start Date"),
            React.createElement(FormDate, { onChange: (event) => setUserStartDate(event.target.value), type: "date", name: "start-date", value: userStartDate, required: true })),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "job-description" }, "Role Description"),
            React.createElement(FormTextArea, { onChange: (event) => setUserRoleDescription(event.target.value), name: "job-description", value: userRoleDescription, required: true })),
        React.createElement(RadioField, { value: userStatus },
            React.createElement(FormRadio, { onChange: (event) => setUserStatus(event.target.value), type: "radio", name: "status", value: "active", cssClass: "e-small" }),
            React.createElement(FormLabel, { htmlFor: "status" },
                React.createElement(StatusText, { status: "active" }, "ACTIVE")),
            React.createElement(FormRadio, { onChange: (event) => setUserStatus(event.target.value), type: "radio", name: "status", value: "inactive", cssClass: "e-small" }),
            React.createElement(FormLabel, { htmlFor: "status" },
                React.createElement(StatusText, { status: "inactive" }, "INACTIVE"))),
        React.createElement(FormField, null,
            React.createElement(FormLabel, { htmlFor: "password" }, "Password"),
            React.createElement(FormInput, { onChange: (event) => setUserPassword(event.target.value), type: "password", name: "password", value: userPassword, required: true })),
        React.createElement(UserFormButtonsContainer, null,
            React.createElement(SubmitButton, { type: "submit" }, "Save"),
            React.createElement(CreateLink, { to: "/users" }, "Cancel"))));
};
