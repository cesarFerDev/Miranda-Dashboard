import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/store";
import { loadContacts } from "../features/contacts/contactsThunks";
import { Contact } from "../interfaces/interfaces";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArchiveButton } from "./Table";
import { archiveContacts } from "../features/contacts/contactsThunks";
import { BorderGrey } from "../pages/Bookings/BookingDetails";
import { orderContacts } from "../pages/Contacts";

export const ContactsSliderSection = styled.section`
    width: 100%;
    background-color: #FFFFFF;
    border-radius: 20px;
    margin: 20px;
    margin-bottom: 50px;
    h3 {
        margin-left: 30px;
        color: #393939;
        font-size: 20px;
        font-weight: 500;
    }
`;

export const ContactsSliderSwiper = styled(Swiper)`
    height: 100%;
    max-width: 1350px;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 70px;
    
    .swiper-button-next, .swiper-button-prev {
        width: 56px;
        height: 56px;
        background-color: #135846;
        color: #FFFFFF;
        border-radius: 12px;
        top: 170px;
        opacity: 0.8;
        :hover {
            opacity: 1;
        }
    }
`;

export const ContactSliderCard = styled(SwiperSlide)`
    //padding: 15px;
    display: flex;
    flex-direction: column;
    border: 1px solid #EBEBEB;
    border-radius: 20px;
    height: 300px;
    h4 {
        margin-top: 0;
        margin-bottom: 5px;
    }
    p {
        margin: 0;
        font-weight: 400;
        color: #6E6E6E;
        font-size: 14px;
    }
    :hover {
        box-shadow: 0px 16px 30px #00000014;
        transform: scale(1.05);
        transition: all 0.5s;
    }
`;

export const ContactCardTop = styled.div`
    width: 95%;
    height: 200px;
    padding: 15px;
`;

export const ContactCardBottom = styled.div`
    width: 100%;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const ContactSlider = () => {
    const dispatch = useAppDispatch();
    const contactsData = useAppSelector(state => state.contacts.data);
    const contactsStatus = useAppSelector(state => state.contacts.status);

    const orderedContacts = orderContacts(contactsData, "Not Archived");

    //console.log(contactsData)

    useEffect(() => {
        if (contactsStatus === "idle") {
            dispatch(loadContacts());
        }
    }, [dispatch, contactsData, contactsStatus]);

    return (<>
        <ContactsSliderSection>
            <h3>Latest Review by Customers</h3>
            <ContactsSliderSwiper spaceBetween={20} modules={[Navigation]} navigation={true} slidesPerView={3}>
                {orderedContacts.map(contact => {
                    return (
                        <ContactSliderCard key={contact.id}>
                            <ContactCardTop>
                                <h4>{contact.content_title}</h4>
                                <p>{contact.content_text}</p>
                            </ContactCardTop>
                            <BorderGrey/>
                            <ContactCardBottom>
                                <div>
                                    <h4>{contact.guest_name}</h4>
                                    <p>{contact.guest_email}</p>
                                    <p>{contact.guest_contact}</p>
                                </div>
                                
                                <ArchiveButton onClick={() => dispatch(archiveContacts(contact.id!))} className="archive-slider-btn">Archive</ArchiveButton>
                            </ContactCardBottom>
                        </ContactSliderCard>
                    );
                })}
            </ContactsSliderSwiper>
        </ContactsSliderSection>
        </>);
}