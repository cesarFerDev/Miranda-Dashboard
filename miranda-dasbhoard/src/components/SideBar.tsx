import styled from "styled-components";
import { EditButton } from "../styled_components/buttons/buttons";
import logo from "../assets/logo.PNG";
import profile from "../assets/JekkologoB.png";
import dash from "../assets/dashboard_alt.svg";
import bookings from "../assets/bookings.svg";
import rooms from "../assets/rooms.svg";
import contacts from "../assets/contacts.svg";
import users from "../assets/users.svg";
import { Link, NavLink } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useAppDispatch, useAppSelector } from "../app/store";
import { getUser } from "../features/users/usersThunks";
import { ContextState } from "../context/UserContext"

const Wrapper = styled.div`
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

const Footer = styled.footer`
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

const Logo = styled.div`
  width: 100%;
  margin-bottom: 20px;
  img {
    width: 100%;
  }
`;

const MenuList = styled.ul`
  width: 100%;
  padding-left: 0;
`;

const MenuItem = styled.li`
  width: 100%;
  list-style: none;
`;

const MenuLink = styled(NavLink)`
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

const Profile = styled.div`
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

  const getUserData = (userLoginInfoObject: ContextState) => {
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

  return (
    <Wrapper>
      <Logo>
        <img src={logo} alt="" />
      </Logo>
      <MenuList>
        <MenuItem>
          <MenuLink to="/">
            <img src={dash} />
            Dashboard
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/bookings">
            <img src={bookings} />
            Bookings
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/rooms">
            <img src={rooms} />
            Rooms
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/contacts">
            <img src={contacts} />
            Contacts
          </MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/users">
            <img src={users} />
            Users
          </MenuLink>
        </MenuItem>
      </MenuList>
      <Profile>
        <img src={userphoto} alt="" />
        <h4>{username}</h4>
        <p>{mail}</p>
        {username !== "admin" && userData !== null && <Link to={`/users/${userData.user_id}`}><EditButton>Edit</EditButton></Link>}
      </Profile>

      <Footer>
        <h4>Travl Hotel Admin Dashboard</h4>
        <p>© 2023 All Rights Reserved</p>
      </Footer>
    </Wrapper>
  );
};
