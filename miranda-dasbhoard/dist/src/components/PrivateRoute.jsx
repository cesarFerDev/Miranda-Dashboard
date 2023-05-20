import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";
export const PrivateRoute = () => {
    const userContext = useContext(UserContext);
    if (!userContext.state.auth) {
        return <Navigate to="/login"/>;
    }
    return <Outlet />;
};
