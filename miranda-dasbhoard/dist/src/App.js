import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { LogIn } from "./pages/LogIn";
import { Bookings } from "./pages/Bookings/Bookings";
import { BookingDetails } from "./pages/Bookings/BookingDetails";
import { Rooms } from "./pages/Rooms/Rooms";
import { RoomDetails } from "./pages/Rooms/RoomDetails";
import { CreateRoomForm } from "./pages/Rooms/CreateRoomForm";
import { Contacts } from "./pages/Contacts";
import { Users } from "./pages/Users/Users";
import { CreateUserForm } from "./pages/Users/CreateUserForm";
import { UserDetails } from "./pages/Users/UserDetails";
import { useReducer } from "react";
import { PrivateRoute } from "./components/PrivateRoute";
import { Layout } from "./components/Layout";
import { UserContext, reducer, initialState } from "./context/UserContext";
import { CreateBookingForm } from "./pages/Bookings/CreateBookingForm";
import './App.css';
function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (React.createElement(BrowserRouter, null,
        React.createElement(UserContext.Provider, { value: { state, dispatch } },
            React.createElement(Routes, null,
                React.createElement(Route, { path: "/login", element: React.createElement(LogIn, null) }),
                React.createElement(Route, { element: React.createElement(PrivateRoute, null) },
                    React.createElement(Route, { path: "/", element: React.createElement(Layout, null) },
                        React.createElement(Route, { path: "/", element: React.createElement(Dashboard, null) }),
                        React.createElement(Route, { path: "/bookings", element: React.createElement(Bookings, null) }),
                        React.createElement(Route, { path: "/bookings/create", element: React.createElement(CreateBookingForm, null) }),
                        React.createElement(Route, { path: "/bookings/:id", element: React.createElement(BookingDetails, null) }),
                        React.createElement(Route, { path: "/rooms", element: React.createElement(Rooms, null) }),
                        React.createElement(Route, { path: "/rooms/:id", element: React.createElement(RoomDetails, null) }),
                        React.createElement(Route, { path: "/rooms/create", element: React.createElement(CreateRoomForm, null) }),
                        React.createElement(Route, { path: "/contacts", element: React.createElement(Contacts, null) }),
                        React.createElement(Route, { path: "/users", element: React.createElement(Users, null) }),
                        React.createElement(Route, { path: "/users/create", element: React.createElement(CreateUserForm, null) }),
                        React.createElement(Route, { path: "/users/:id", element: React.createElement(UserDetails, null) })))))));
}
export default App;
