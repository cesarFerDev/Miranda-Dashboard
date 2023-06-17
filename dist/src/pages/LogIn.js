import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FormField, FormInput, FormLabel } from '../components/UserForm';
import logo from "../assets/logo.PNG";
import { UserContext } from '../context/UserContext';
import { useAppDispatch } from '../app/store';
import usersList from "../data/users.json";
import { LoginButton } from '../styled_components/buttons/buttons';
import { getUser } from '../features/users/usersThunks';
import { GreyText } from '../components/Table';
const FormContainer = styled.section `
    min-height: calc(100vh - 120px);
    background-color: #F8F8F8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-family: 'Poppins';
    font-weight: 700;
    
    `;
const Form = styled.form `
    background-color: #FFFFFF;
    box-shadow: 0px 20px 30px #00000014;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    max-width: 500px;
    padding: 5%;
    border-radius: 12px;
`;
export const LogIn = () => {
    const { state, dispatch } = useContext(UserContext);
    const dispatchApp = useAppDispatch();
    const [userMail, setUserMail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();
    const verifyUser = (candidate) => {
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].email === candidate.usermail && usersList[i].password === candidate.password) {
                return usersList[i];
            }
        }
        return null;
    };
    const logInSubmitHandler = (event) => {
        event.preventDefault();
        const loginCandidate = { usermail: userMail, password: password };
        const userData = verifyUser(loginCandidate);
        if (userData) {
            dispatch({ type: "LOG_IN", payload: { auth: true, userphoto: userData.photo, username: userData.name, usermail: userData.email } });
            dispatchApp(getUser(userData));
            nav("/");
        }
        else if (userMail === "admin@admin" && password === "admin") {
            dispatch({ type: "LOG_IN", payload: { auth: true, userphoto: logo, username: "Admin", usermail: "admin@admin" } });
            nav("/");
        }
        else {
            alert("Invalid credentials");
        }
    };
    return (React.createElement(FormContainer, null,
        React.createElement(Form, { onSubmit: logInSubmitHandler },
            React.createElement(FormField, null,
                React.createElement("img", { src: logo, alt: "" })),
            React.createElement(FormField, null,
                React.createElement(FormLabel, { htmlFor: "username" }, "Mail"),
                React.createElement(FormInput, { value: userMail, onChange: (event) => setUserMail(event.target.value), type: "email", name: "email", "data-cy": "login__usermail__input" })),
            React.createElement(FormField, null,
                React.createElement(FormLabel, { htmlFor: "password" }, "Password"),
                React.createElement(FormInput, { value: password, onChange: (event) => setPassword(event.target.value), type: "password", name: "password", "data-cy": "login__userpass__input" })),
            React.createElement("p", null,
                React.createElement(GreyText, null, "(Mail: admin@admin & Password: admin to log in)")),
            React.createElement(LoginButton, { type: "submit", "data-cy": "login__submit__button" }, "Log In"))));
};
