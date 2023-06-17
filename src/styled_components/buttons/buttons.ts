import styled from "styled-components";

export const EditButton = styled.button`
    font-family: 'Poppins';
    font-weight: 600;
    text-align: center;
    width: 70%;
    min-width: 90px;
    max-width: 120px;
    height: 50px;
    background-color: #EBF1EF;
    color: #135846;
    border: none;
    border-radius: 8px;
    &:hover {
        cursor: pointer;
        background-color: #135846;
        color: #EBF1EF;
    }
`;

export const LoginButton = styled(EditButton)`
    background-color: #135846;
    color: #EBF1EF;
    margin-top: 50px;
    &:hover {
        background-color: #EBF1EF;
        color: #135846;
    }
`;

interface StatusButtonProps {
    status: string
}
export const StatusButton = styled(EditButton)<StatusButtonProps>`
    color: ${props => props.status === "Check In" ? "#5AD07A" : props.status === "Check Out" ? "#E23428" : "#c7ac00"};
    background-color: ${props => props.status === "Check In" ? "#E8FFEE" : props.status === "Check Out" ? "#FFEDEC" : "#faf1b8"};
    &:hover {
        color: ${props => props.status === "Check In" ? "#E8FFEE" : props.status === "Check Out" ? "#FFEDEC" : "#faf1b8"};
        background-color: ${props => props.status === "Check In" ? "#5AD07A" : props.status === "Check Out" ? "#E23428" : "#c7ac00"};
    }
`;

export const DeleteButton = styled(EditButton)`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: -70%;
    top: 100%;
    background-color: #ffedec;
    color: #e23428;
    height: 30px;
    min-width: 90px;
    border-radius: 0px;
    img {
        margin-right: 5px;
        filter: brightness(0) saturate(100%) invert(32%) sepia(32%) saturate(4368%) hue-rotate(342deg) brightness(88%) contrast(103%);
        width:25%;
    }
    &:hover {
        background-color: #e23428;
        color: #ffedec;
        img {
            
            filter: brightness(0) saturate(100%) invert(91%) sepia(7%) saturate(3262%) hue-rotate(304deg) brightness(109%) contrast(102%);
        }
    }
`;

export const SubmitButton = styled(LoginButton)`
    margin-top: 0;
    min-width: 30%;
    max-width: 120px;
`;