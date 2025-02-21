import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const GenericProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;
    if (!allowedRoles.includes(user.user_type)) return <Navigate to="/login" />;

    return <Outlet />;
};

export default GenericProtectedRoute;
