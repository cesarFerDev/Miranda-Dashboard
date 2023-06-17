import { createContext } from "react";

export interface ContextState {
  auth: boolean,
  id: string
};

const localValue = localStorage.getItem("login");

export const initialState: ContextState = localValue ? {
    auth: true,
    id: JSON.parse(localValue!).id
} : {
    auth: false,
    id: ""
};

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
          id: action.payload ? action.payload.id : ""
        }
      case "LOG_OUT":
        return {
          ...state,
          id: "",
          auth: false
        }
      case "UPDATE_USER":
        return { 
          ...state,
          auth: action.payload ? action.payload.auth : false,
          id: action.payload ? action.payload.id : ""
        }
      default:
        return state;
    }
  };





