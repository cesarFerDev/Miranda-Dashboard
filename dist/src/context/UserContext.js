import { createContext } from "react";
;
export const initialState = {
    auth: false,
    userphoto: "",
    username: "",
    usermail: ""
};
export const UserContext = createContext({});
export const reducer = (state, action) => {
    switch (action.type) {
        case "LOG_IN":
            return Object.assign(Object.assign({}, state), { auth: action.payload ? action.payload.auth : false, userphoto: action.payload ? action.payload.userphoto : "", username: action.payload ? action.payload.username : "", usermail: action.payload ? action.payload.usermail : "" });
        case "LOG_OUT":
            return Object.assign(Object.assign({}, state), { auth: false, userphoto: "", username: "", usermail: "" });
        case "UPDATE_USER":
            return Object.assign(Object.assign({}, state), { auth: action.payload ? action.payload.auth : false, userphoto: action.payload ? action.payload.userphoto : "", username: action.payload ? action.payload.username : "", usermail: action.payload ? action.payload.usermail : "" });
        default:
            return state;
    }
};
