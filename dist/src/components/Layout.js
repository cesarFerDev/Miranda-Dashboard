import styled from "styled-components";
import arrowLeft from "../assets/arrow-left.svg";
import arrowRight from "../assets/arrow-right.svg";
import message from "../assets/message.svg";
import bell from "../assets/bell.svg";
import logout from "../assets/logout.svg";
import { SideBar } from "./SideBar";
import React, { useContext, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export const TopBarWrapper = styled.div `
  font-family: "Poppins", sans-serif;
  width: 100%;
  height: 120px;
  background-color: #00000005;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const TopBarLeft = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 30%;
`;
const ShowButton = styled.button `
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 40px;
  height: 25px;
  background: none;
  border: none;
  img {
    width: 100%;
  }
  img:hover {
    cursor: pointer;
  }
`;
export const SectionTitle = styled.h3 `
  font-size: 28px;
  font-weight: 600;
  width: 70%;
`;
const TopBarIcons = styled.div `
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 30%;
`;
const IconButton = styled.button `
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 26px;
  height: 24px;
  background: none;
  border: none;
  img:hover {
    cursor: pointer;
  }
`;
const MenuLayout = styled.div `
  display: flex;
  font-family: "Poppins", sans-serif;
`;
const LeftMenu = styled.nav `
  display: inline-block;
  width: 350px;
`;
const RightPage = styled.div `
  display: inline-block;
  width: 100%;
  height: 100%;
`;
const Content = styled.section `
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 50px;
`;
export const Layout = () => {
    const { state, dispatch } = useContext(UserContext);
    const [showMenu, setShowMenu] = useState(true);
    const [sectionName, setSectionName] = useState("");
    const showMenuClickHandler = (event) => {
        setShowMenu(prevState => !prevState);
    };
    const logOutClickHandler = (event) => {
        dispatch({ type: "LOG_OUT" });
    };
    return (React.createElement(MenuLayout, null,
        showMenu && (React.createElement(LeftMenu, null,
            React.createElement(SideBar, null))),
        React.createElement(RightPage, null,
            React.createElement(TopBarWrapper, null,
                React.createElement(TopBarLeft, null,
                    React.createElement(ShowButton, { onClick: showMenuClickHandler },
                        showMenu ? (React.createElement("img", { src: arrowLeft, alt: "" })) : (React.createElement("img", { src: arrowRight, alt: "" })),
                        " "),
                    React.createElement(SectionTitle, null, sectionName)),
                React.createElement(TopBarIcons, null,
                    React.createElement(IconButton, null,
                        React.createElement("img", { src: message, alt: "" })),
                    React.createElement(IconButton, null,
                        React.createElement("img", { src: bell, alt: "" })),
                    React.createElement(IconButton, { onClick: logOutClickHandler, "data-cy": "logout__button" },
                        React.createElement("img", { src: logout, alt: "" })))),
            React.createElement(Content, null,
                React.createElement(Outlet, { context: { sectionName, setSectionName } })))));
};
export function useSection() {
    return useOutletContext();
}
