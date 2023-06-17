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
import fetch from 'cross-fetch';
import { errorToastify, successToastify } from '../aux_functions/toastifyMessages';

const FormContainer = styled.section`
    min-height: calc(100vh - 120px);
    background-color: #F8F8F8;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-family: 'Poppins';
    font-weight: 700;
    
    `;

const Form = styled.form`
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

interface UserLogged {
	id: string,
	photo: string,
	user_name: string,
	email: string
}

export interface LoginUser {
    usermail: string,
    password: string
}

interface LoginReturnInfo {
	token: string,
	id: string
}

export const LogIn = () => {

    const {state, dispatch} = useContext(UserContext);

    const dispatchApp = useAppDispatch();

    const [userMail, setUserMail] = useState("");
    const [password, setPassword] = useState("");
    

    const nav = useNavigate();

    const verifyFalseUser = (candidate: LoginUser) => {
        let infoToReturn: LoginReturnInfo | null = null;
        if (candidate.usermail === "admin@admin.com" && candidate.password === "admin") {
            infoToReturn = {token: "", id: "648c5165e3a1775efb249471"};
        }
        if (candidate.usermail === "test@admin.com" && candidate.password === "test") {
            infoToReturn = {token: "", id: "648c5165e3a1775efb249473"};
        }
        return infoToReturn;
    }

    const verifyUser = async(candidate: LoginUser) => {
        try {
            const response = await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: candidate.usermail,
                password: candidate.password
              })
            });
            if (response.ok) {
                const loginData: LoginReturnInfo = await response.json();
                return loginData;
            }
        } catch (error) {
            console.log(error)
            const falseUser = verifyFalseUser(candidate);
            return falseUser;
        }
    }

    const logInSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const loginCandidate: LoginUser = {usermail: userMail, password: password};
            const loginData = await verifyUser(loginCandidate);
            if (loginData) {
                localStorage.setItem("login", JSON.stringify({token: loginData.token, id: loginData.id}));
                dispatchApp(getUser(loginData.id));
                dispatch({type: "LOG_IN", payload: {auth: true, id: loginData.id}});
                successToastify("Login correct!")
                nav("/");
            } else {
                errorToastify("Invalid credentials");
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <FormContainer>
            <Form onSubmit={logInSubmitHandler}>
                <FormField>
                    <img className={"login-logo"} src={logo} alt="" />
                </FormField>
                <FormField>
                    <FormLabel htmlFor="username">Mail</FormLabel>
                    <FormInput value={userMail} onChange={(event) => setUserMail(event.target.value)} type="email" name="email" data-cy="login__usermail__input"/>
                </FormField>
                <FormField>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormInput value={password} onChange={(event) => setPassword(event.target.value)} type="password" name="password" data-cy="login__userpass__input"/>
                </FormField>

                <GreyText>(Mail: admin@admin.com & Password: admin to log in)</GreyText>
                <GreyText>(Mail: test@admin.com & Password: test to test everything)</GreyText>

                <LoginButton type="submit" data-cy="login__submit__button">Log In</LoginButton>  
            </Form>
        </FormContainer>
    );
};

