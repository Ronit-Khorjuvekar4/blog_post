import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const UserProtectedRoute = () => {
    const { user } = useAuth();
    
    if (!user) return <Navigate to="/login" />;
    if (user.user_type !== "user") return <Navigate to="/login" />;

    return (
        <div>
            <h2>Welcome, {user.user_name}</h2>
            {/* You can add a user-specific navigation bar here */}
            <Outlet />  {/* Renders the nested routes */}
        </div>
    );
};

export default UserProtectedRoute;
