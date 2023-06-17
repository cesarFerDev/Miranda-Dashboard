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
    return (<BrowserRouter>
    <UserContext.Provider value={{ state, dispatch }}>
    <Routes>
    
      <Route path="/login" element={<LogIn />}/>

      <Route element={<PrivateRoute />}> 
     
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />}/>
          <Route path="/bookings" element={<Bookings />}/>
          <Route path="/bookings/create" element={<CreateBookingForm />}/>
          <Route path="/bookings/:id" element={<BookingDetails />}/>
          <Route path="/rooms" element={<Rooms />}/> 
          <Route path="/rooms/:id" element={<RoomDetails />}/>
          <Route path="/rooms/create" element={<CreateRoomForm />}/>
          <Route path="/contacts" element={<Contacts />}/>
          <Route path="/users" element={<Users />}/>
          <Route path="/users/create" element={<CreateUserForm />}/>
          <Route path="/users/:id" element={<UserDetails />}/>
        </Route> 
          
      </Route>
      
    </Routes>
    </UserContext.Provider>  
  </BrowserRouter>);
}
export default App;
