import { PayloadAction } from "@reduxjs/toolkit";
import { createContext } from "react";

export interface ContextState {
  auth: boolean,
  userphoto: string,
  username: string,
  usermail: string
};

export const initialState: ContextState = {
    auth: false,
    userphoto: "",
    username: "",
    usermail: ""
}

export interface ContextAction {
  type: "LOG_IN" | "LOG_OUT" | "UPDATE_USER";
  payload?: ContextState;
}

export interface ContextProps {
  state: ContextState,
  dispatch: React.Dispatch<ContextAction>
}

export const UserContext = createContext<ContextProps>({} as ContextProps);

export const reducer = (state: ContextState, action: ContextAction) => {
    switch (action.type) {
      case "LOG_IN":
        return { 
          ...state,
          auth: action.payload ? action.payload.auth : false,
          userphoto: action.payload ? action.payload.userphoto : "",
          username: action.payload ? action.payload.username : "",
          usermail: action.payload ? action.payload.usermail : ""
        }
      case "LOG_OUT":
        return {
          ...state,
          auth: false,
          userphoto: "",
          username: "",
          usermail: ""
        }
      case "UPDATE_USER":
        return { 
          ...state,
          auth: action.payload ? action.payload.auth : false,
          userphoto: action.payload ? action.payload.userphoto : "",
          username: action.payload ? action.payload.username : "",
          usermail: action.payload ? action.payload.usermail : ""
        }
      default:
        return state;
    }
  };





