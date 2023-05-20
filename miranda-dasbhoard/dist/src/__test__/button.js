import styled from "styled-components";
export const Button = styled.button `
    height: 50px;
    width: 200px;
    border: 1px solid black;
    border-radius: 8px;
    color: ${props => props.color || "black"};
    background-color: ${props => props.background || "grey"};
`;
