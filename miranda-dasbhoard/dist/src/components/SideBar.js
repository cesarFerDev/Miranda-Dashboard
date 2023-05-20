import styled from "styled-components";
import { EditButton } from "../styled_components/buttons/buttons";
import logo from "../assets/logo.PNG";
import dash from "../assets/dashboard.svg";
import bookings from "../assets/bookings.svg";
import rooms from "../assets/rooms.svg";
import contacts from "../assets/contacts.svg";
import users from "../assets/users.svg";
import { Link, NavLink } from "react-router-dom";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useAppSelector } from "../app/store";
const Wrapper = styled.div `
  width: 250px; //350 - 50+50 padding
  min-height: calc(100vh - 100px);
  height: 100%;
  //height: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  //justify-content: space-between;
  padding: 50px;
`;
const Footer = styled.footer `
  text-align: start;
  width: 100%;
  h4 {
    font-size: 16px;
    color: #212121;
    margin-bottom: 15px;
  }
  p {
    font-size: 14px;
    color: #799283;
  }
`;
const Logo = styled.div `
  width: 80%;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
`;
const MenuList = styled.ul `
  width: 100%;
  padding-left: 0;
`;
const MenuItem = styled.li `
  width: 100%;
  list-style: none;
`;
const MenuLink = styled(NavLink) `
  text-decoration: none;
  color: #799283;
  font-size: 18px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  img {
    margin-right: 30px;
    filter: brightness(0) saturate(100%) invert(55%) sepia(17%) saturate(348%)
      hue-rotate(91deg) brightness(97%) contrast(82%);
  }
  &.active {
    color: #e23428;
    font-weight: 600;
    img {
      filter: brightness(0) saturate(100%) invert(32%) sepia(32%)
        saturate(4368%) hue-rotate(342deg) brightness(88%) contrast(103%);
      scale: 1.2;
    }
  }
`;
const Profile = styled.div `
  width: 70%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  box-shadow: 0px 20px 30px #00000014;
  border-radius: 18px;
  img {
    width: 50%;
  }
  p {
    color: #b2b2b2;
    font-size: 14px;
  }
`;
export const SideBar = () => {
    const { state, dispatch } = useContext(UserContext);
    const usersList = useAppSelector(state => state.users.data);
    //console.log(usersList)
    //console.log(state.user)
    const getUserData = (userLoginInfoObject) => {
        for (let i = 0; i < usersList.length; i++) {
            if (usersList[i].name === userLoginInfoObject.username && usersList[i].email === userLoginInfoObject.usermail) {
                return usersList[i];
            }
        }
        return null;
    };
    const userData = getUserData(state);
    // const userphoto = userData.photo;
    // const username = userData.name;
    // const mail = userData.email;
    const userphoto = state.userphoto;
    const username = state.username;
    const mail = state.usermail;
    return (React.createElement(Wrapper, null,
        React.createElement(Logo, null,
            React.createElement("img", { src: logo, alt: "" })),
        React.createElement(MenuList, null,
            React.createElement(MenuItem, null,
                React.createElement(MenuLink, { to: "/" },
                    React.createElement("img", { src: dash }),
                    "Dashboard")),
            React.createElement(MenuItem, null,
                React.createElement(MenuLink, { to: "/bookings" },
                    React.createElement("img", { src: bookings }),
                    "Bookings")),
            React.createElement(MenuItem, null,
                React.createElement(MenuLink, { to: "/rooms" },
                    React.createElement("img", { src: rooms }),
                    "Rooms")),
            React.createElement(MenuItem, null,
                React.createElement(MenuLink, { to: "/contacts" },
                    React.createElement("img", { src: contacts }),
                    "Contacts")),
            React.createElement(MenuItem, null,
                React.createElement(MenuLink, { to: "/users" },
                    React.createElement("img", { src: users }),
                    "Users"))),
        React.createElement(Profile, null,
            React.createElement("img", { src: userphoto, alt: "" }),
            React.createElement("h4", null, username),
            React.createElement("p", null, mail),
            username !== "admin" && userData !== null && React.createElement(Link, { to: `/users/${userData.user_id}` },
                React.createElement(EditButton, null, "Edit"))),
        React.createElement(Footer, null,
            React.createElement("h4", null, "Travl Hotel Admin Dashboard"),
            React.createElement("p", null, "\u00A9 2023 All Rights Reserved"))));
};
