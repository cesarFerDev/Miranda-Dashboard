import React from 'react';
import { CreateLink } from './Users/Users';
import styled from 'styled-components';

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: auto;
    h2 {
        font-size: 36px;
        font-weight: 400;
    }
`;

export const ErrorPage = () => {
    
    return (
        <ErrorContainer>
            <h2>THIS PAGE DOESN'T EXIST, SORRY</h2>
            <CreateLink to={"/"}>Back</CreateLink>
        </ErrorContainer>);
};