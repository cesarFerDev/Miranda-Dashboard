import styled from "styled-components";
import { LoginButton } from "../styled_components/buttons/buttons";
import React, { useState } from "react";
import { createID } from "../aux_functions/auxFunctions";
import { useAppDispatch, useAppSelector } from "../app/store";
import { createRoom, editRoom } from "../features/rooms/roomsThunks";
import { useNavigate, useParams } from "react-router-dom";
import { CreateLink } from "../pages/Users/Users";
import { Room } from "../interfaces/interfaces";

interface StatusTextProps {
    status?: string;
}
export const StatusText = styled.h4<StatusTextProps>`
    font-size: 16px;
    color: ${props => props.status === "active" ? "#5AD07A" : "#E23428"};
`;

const CreateForm = styled.form`
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
`;

const FormField = styled.div`
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

const FormLabel = styled.label`
    font-size: 20px;
    font-weight: 600;
`;

const FormInput = styled.input`
    width: 100%;
    font-size: 16px;
    font-family: "Poppins";
    border: none;
    color: #6E6E6E;
    border-bottom: 2px solid #135846;
    background: none;
`;

const FormTextArea = styled.textarea`
    width: 100%;
    height: 100%;
    font-size: 16px;
    font-family: "Poppins";
    border: none;
    color: #6E6E6E;
    border-bottom: 2px solid #135846;
    background: none;
`;

const FormSelect = styled.select`
    width: 100%;
    font-size: 16px;
    font-family: "Poppins";
    text-align: center;
    border: none;
    color: #6E6E6E;
    border-bottom: 2px solid #135846;
    background: none;
    
`;

const FormRadio = styled.input`
    
`;

const UserFormButtonsContainer = styled.div`
    width: 80%;
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;


    
const RadioField = styled(FormField)`
    flex-direction: row;
    justify-content: space-evenly;
    width: 40%;
`;

const SubmitButton = styled(LoginButton)`
    margin-top: 0;
    min-width: 30%;
    max-width: 120px;
`;

interface RoomFormProps {
    section: string;
}

export const amenitiesToString = (amenitiesArray: string[]) => {
    let amenitiesString = "";
    amenitiesArray.map(amenity => amenitiesString += `"${amenity}"  `);
    return amenitiesString;
}

export const RoomForm = (props: RoomFormProps) => {

    const roomsData = useAppSelector(state => state.rooms.data)
    const {id} = useParams();
    const singleRoomData = roomsData.find(room => room.id === id);

    const dispatch = useAppDispatch();
    const nav = useNavigate();

    const singleAmenities = ["Free Wi-Fi", "Air conditioning","Flat-screen TV", "Coffee maker", "Single Bed"];
    const doubleAmenities = ["Free Wi-Fi", "Air conditioning","Flat-screen TV", "Coffee maker", "Double Bed"];
    const doubleSupAmenities = ["Free Wi-Fi", "Air conditioning","Flat-screen TV","Mini-fridge","Coffee maker","Balcony", "Double Bed"];
    const suiteAmenities = ["Free Wi-Fi", "Air conditioning","Flat-screen TV","Mini-fridge","Hairdryer", "Coffee maker", "Balcony", "King Bed"];

    const [roomMainPhoto, setRoomMainPhoto] = useState<string>(singleRoomData ? singleRoomData.photos[0] : "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80");
    const [roomType, setRoomType] = useState(singleRoomData ? singleRoomData.type : "Single Bed");
    const [roomNumber, setRoomNumber] = useState(singleRoomData ? singleRoomData.number : 0);
    const [roomDescription, setRoomDescription] = useState(singleRoomData ? singleRoomData.description : "");
    const [roomPrice, setRoomPrice] = useState(singleRoomData ? singleRoomData.price : 0);
    const [roomDiscount, setRoomDiscount] = useState(singleRoomData ? singleRoomData.discount : 0);
    const [roomCancellation, setRoomCancellation] = useState(singleRoomData ? singleRoomData.cancellation : "");

    const backupPhotos = [
        "",
        "https://images.unsplash.com/photo-1635350644128-c8e41eb8b2a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1623050804066-42bcedb4e81d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      ]

    const updatePhotos = () => {
        let aux = [roomMainPhoto];
        const fillPhotosCollection = singleRoomData ? singleRoomData.photos : backupPhotos;

        for (let i = 1; i < fillPhotosCollection.length; i++) {
            aux.push(fillPhotosCollection[i]);
        }

        return aux;
    }

    const createRoomObject = (): Room => {
        const newRoom: Room = {
            // id: props.section === "New Room" ? createID().toString() : (singleRoomData ? singleRoomData.id : ""),
            type: roomType,
            number: roomNumber,
            price: roomPrice,
            discount: roomDiscount,
            cancellation: roomCancellation,
            description: roomDescription,
            amenities: amenitiesObjectSelect(roomType)!,
            photos: updatePhotos(),
            is_available: true  
        };
        if (props.section !== "New Room") {
            newRoom.id = singleRoomData?.id;
        }
        return newRoom;
    }

    const roomSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (props.section === "New Room") {
            dispatch(createRoom(createRoomObject()));
        } else {
            dispatch(editRoom(createRoomObject()));
        }
        nav("/rooms");
    }

    const amenitiesRenderSelect = (roomType: string) => {
        switch (roomType) {
            case "Single Bed":
                return amenitiesToString(singleAmenities);
            case "Double Bed":
                return amenitiesToString(doubleAmenities);
            case "Double Superior":
                return amenitiesToString(doubleSupAmenities);
            case "Suite":
                return amenitiesToString(suiteAmenities);
        }
    }
    const amenitiesObjectSelect = (roomType: string) => {
        switch (roomType) {
            case "Single Bed":
                return singleAmenities;
            case "Double Bed":
                return doubleAmenities;
            case "Double Superior":
                return doubleSupAmenities;
            case "Suite":
                return suiteAmenities;
        }
    }

    return (
        <CreateForm onSubmit={roomSubmitHandler}>
            <FormField>
                <img src={roomMainPhoto} alt="" />
            </FormField>

            <FormField>
                <FormLabel htmlFor="photo">Main Photo</FormLabel>
                <FormInput onChange={(event) => setRoomMainPhoto(event.target.value)} type="text" name="photo" value={roomMainPhoto} required/>
            </FormField>

            <FormField>
                <FormLabel htmlFor="type">Room Type</FormLabel>
                <FormSelect onChange={(event) => setRoomType(event.target.value as 'Single Bed' | 'Double Bed' | 'Double Superior' | 'Suite')} name="type" value={roomType}>
                    <option value="Single Bed">Single Bed</option>
                    <option value="Double Bed">Double Bed</option>
                    <option value="Double Superior">Double Superior</option>
                    <option value="Suite">Suite</option>
                </FormSelect>
            </FormField>

            <FormField>
                <FormLabel htmlFor="number">Number</FormLabel>
                <FormInput onChange={(event) => setRoomNumber(parseInt(event.target.value))} type="number" name="number" value={roomNumber} required/>
            </FormField>

            <FormField>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormTextArea onChange={(event) => setRoomDescription(event.target.value)} name="description" value={roomDescription} required/>
            </FormField>

            <FormField>
                <FormLabel htmlFor="price">Price</FormLabel>
                <FormInput type="number" onChange={(event) => setRoomPrice(parseInt(event.target.value))} name="price" value={roomPrice} required/>
            </FormField>

            <FormField>
                <FormLabel htmlFor="discount">Discount</FormLabel>
                <FormInput type="number" onChange={(event) => setRoomDiscount(parseInt(event.target.value))} name="discount" value={roomDiscount} required/>
            </FormField>

            <FormField>
                <FormLabel htmlFor="cancellation">Cancellation</FormLabel>
                <FormTextArea onChange={(event) => setRoomCancellation(event.target.value)} name="cancellation" value={roomCancellation}/>
            </FormField>
            
            <FormField>
                <FormLabel htmlFor="amenities">Amenities</FormLabel>
                <FormTextArea name="amenities" value={amenitiesRenderSelect(roomType)}/>
            </FormField>
            
            <UserFormButtonsContainer>
                <SubmitButton type="submit">Save</SubmitButton>
                <CreateLink to="/rooms">Cancel</CreateLink>
            </UserFormButtonsContainer>
            
        </CreateForm>
);
}