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

export const TopBarWrapper = styled.div`
  font-family: "Poppins", sans-serif;
  width: 100%;
  height: 120px;
  background-color: #00000005;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 30%;
`;

const ShowButton = styled.button`
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

export const SectionTitle = styled.h3`
  font-size: 28px;
  font-weight: 600;
  width: 70%;
`;

const TopBarIcons = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 30%;
`;

const IconButton = styled.button`
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

const MenuLayout = styled.div`
  display: flex;
  font-family: "Poppins", sans-serif;
`;

const LeftMenu = styled.nav`
  display: inline-block;
  width: 350px;
`;

const RightPage = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
`;
const Content = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 50px;
  max-width: calc(100vw - 350px);
`;

export const Layout = () => {
  const { state, dispatch } = useContext(UserContext);
  

  const [showMenu, setShowMenu] = useState(true);
  const [sectionName, setSectionName] = useState("");
  
  const showMenuClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setShowMenu(prevState => !prevState);
  };

  const logOutClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: "LOG_OUT" });
  };

  return (
    <MenuLayout>
      {showMenu && (
        <LeftMenu>
          <SideBar />
        </LeftMenu>
      )}

      <RightPage>
        <TopBarWrapper>
          <TopBarLeft>
            <ShowButton onClick={showMenuClickHandler}>
              {showMenu ? (
                <img src={arrowLeft} alt="" />
              ) : (
                <img src={arrowRight} alt="" />
              )}{" "}
            </ShowButton>
            <SectionTitle>{sectionName}</SectionTitle>
          </TopBarLeft>

          <TopBarIcons>
            <IconButton>
              <img src={message} alt="" />
            </IconButton>
            <IconButton>
              <img src={bell} alt="" />
            </IconButton>
            <IconButton onClick={logOutClickHandler} data-cy="logout__button">
              <img src={logout} alt="" />
            </IconButton>
          </TopBarIcons>
        </TopBarWrapper>
        <Content>
          <Outlet context={{sectionName, setSectionName}}/>
        </Content>
      </RightPage>
    </MenuLayout>
  );
};

type ContextType = { sectionName: string, setSectionName: (section: string) =>  React.Dispatch<React.SetStateAction<string>> };

export function useSection() {
  return useOutletContext<ContextType>();
}
