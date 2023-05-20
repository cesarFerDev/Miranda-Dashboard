import styled from "styled-components";
//import roomPhoto from '../../assets/photo-bedroom-test.jpg'
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { EditButton } from "../../styled_components/buttons/buttons";
import { StatusButton } from "../../styled_components/buttons/buttons";
import { BookingForm } from "../../components/BookingForm"
import { useAppSelector } from "../../app/store";
import { Booking } from "../../interfaces/interfaces";
import { useSection } from "../../components/Layout";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';

const BookingModalFormContainer = styled.div`
    position: absolute;
    width: 100%;
    z-index: 10;
    top: 10%;
    right: -30%;
`;

export const BookingDetails = () => {

    const bookingsData = useAppSelector(state => state.bookings.data)
    const {id} = useParams();
    const singleBookingData = bookingsData.find(booking => booking.booking_id === id);

    const {sectionName, setSectionName} = useSection();
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        setSectionName("Booking Details");
    });
    
    

    return (
        <BookingDetailsContainer>
            <BookingDetailsTextContainer>
                <BookingDetailsHeader>
                    <div>
                    <h1>{singleBookingData ? singleBookingData.guest_name : ""}</h1>
                    <h4><span>ID </span>{id}</h4>
                    <h4>{singleBookingData ? singleBookingData.guest_email : ""}</h4>
                    <h4>{singleBookingData ? singleBookingData.guest_contact : ""}</h4>
                    </div>
                    <EditButton onClick={() => setShowEditModal(true)}>Edit</EditButton>
                    {showEditModal && <BookingModalFormContainer><BookingForm section={sectionName} setShowEditModal={setShowEditModal}/></BookingModalFormContainer>}
                </BookingDetailsHeader>

                <BookingInfoContainer>
                    <InfoField>
                        <h4>Check In</h4>
                        <h3>{singleBookingData ? singleBookingData.check_in : ""}</h3>
                    </InfoField>
                    <InfoField>
                        <h4>Check Out</h4>
                        <h3>{singleBookingData ? singleBookingData.check_out : ""}</h3>
                    </InfoField>
                </BookingInfoContainer>

                <BorderGrey/>

                <BookingInfoContainer>
                    <InfoField>
                        <h4>Room Info</h4>
                        <h2>{singleBookingData ? singleBookingData.room.type : ""} {singleBookingData ? singleBookingData.room.number : ""}</h2>
                    </InfoField>
                        
                    <InfoField>
                        <h4>Price</h4>
                        <h2>{singleBookingData ? singleBookingData.room.price : 0} <span>/night</span></h2>
                    </InfoField>
                        
                </BookingInfoContainer>
                    
                <p>{singleBookingData ? singleBookingData.special_request : ""}</p>
                
                <div>
                    <h4>Amenities</h4>
                    <AmenitiesContainer>
                        {singleBookingData ? (singleBookingData.room.amenities ? singleBookingData.room.amenities.map((amenity: string) => <Facility>{amenity}</Facility>) : [""]) : ""}
                    </AmenitiesContainer>
                </div>
            </BookingDetailsTextContainer>

            <BookingDetailsRoomInfoContainer>
                <BookingDetailsSliderContainer modules={[Navigation]} navigation={true} slidesPerView={1}>
                    {singleBookingData && singleBookingData.room.photos.map(photo => <SliderSwiperSlide><img src={photo} alt="" /></SliderSwiperSlide>)}
                </BookingDetailsSliderContainer>
                <RoomStatus status={singleBookingData ? singleBookingData.status : ""}>{singleBookingData ? singleBookingData.status : ""}</RoomStatus>
                <RoomDescriptionContainer>
                    <h3>{singleBookingData ? singleBookingData.room.type : ""} {singleBookingData ? singleBookingData.room.number : ""}</h3>
                    <p>{singleBookingData ? singleBookingData.room.description : ""}</p>
                </RoomDescriptionContainer>
            </BookingDetailsRoomInfoContainer>

        </BookingDetailsContainer>
    );
}

const BookingDetailsContainer = styled.div`
    width: 100%;
    //max-width: 1400px;
    max-width: 1400px;
    max-height: 1000px;
    background-color: #FFFFFF;
    display: flex;
    border-radius: 15px;
    h2 {
        font-size: 30px;
        font-weight: 600;
    };
    h4, span {
        color: #799283;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: 1px;
    }
    p {
        font-size: 14px;
    }
`;

export const BookingDetailsTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    padding: 10px 20px;
`;

const BookingDetailsSliderContainer = styled(Swiper)`
    height: 100%;
`;

const SliderSwiperSlide = styled(SwiperSlide)`
    width: 100%;
    img {
        width: 100%;
        height: 100%;
        border-radius: 0 15px 15px 0;
        object-fit: cover;
    }
`;

const BookingDetailsRoomInfoContainer = styled.div`
    position: relative;
    width: 50%;
    overflow: hidden;
`;

const BookingDetailsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    h1 {
        font-size: 30px;
    }
`;

const BookingInfoContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    // margin-bottom: 20px;
    position: relative;
`;

const InfoField = styled.div`
    width: 50%;
`;

const BorderGrey = styled.div`
    background-color: #b2b2b233;
    width: 100%;
    height: 2px;
    margin: 15px 0;
`;

const AmenitiesContainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`;

const Facility = styled.div`
    display: inline;
    padding: 15px;
    margin: 10px;
    border-radius: 8px;
    background-color: #E8F2EF;
    color: #135846;
    font-weight: 600;
    font-size: 16px;
`;

const RoomStatus = styled(StatusButton)`
    min-width: 450px;
    font-size: 20px;
    height: 75px;
    transform: rotate(45deg);
    position: absolute;
    right: -150px;
    bottom: 660px;
    overflow: hidden;
    z-index: 10;
`;

const RoomDescriptionContainer = styled.div`
    position: absolute;
    padding: 15px 10%;
    bottom: 0;
    z-index: 1;
    h3 {
        color: #FFFFFF;
        font-weight: 600;
        font-size: 24px;
    }
    
    p {
        color: #FFFFFF;
    }
`;