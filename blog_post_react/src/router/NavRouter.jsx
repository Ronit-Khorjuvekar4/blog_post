import { Routes,Route,Navigate } from "react-router-dom";
import AddVlog from "../components/blogComponent/AddVlog";
import ViewVlog from "../components/blogComponent/ViewVlog";
import AllUsers from "../components/admin/AllUsers";
import Register from "../components/credentials/Register";
import Login from "../components/credentials/Login";
import UserProtectedRoute from "./UserProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import GenericProtectedRoute from "./GenericProtectedRoute";
import Profile from "../resuable/Profile";

const NavRouter = () => {

    return(
        <>

            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* User Routes */}
                <Route element={<UserProtectedRoute />}>
                    <Route path="/addBlog" element={<AddVlog />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<AdminProtectedRoute />}>
                    <Route path="/allUsers" element={<AllUsers />} />
                </Route>

                {/* Shared Route for Both User and Admin */}
                <Route element={<GenericProtectedRoute allowedRoles={["user", "admin"]} />}>
                    <Route path="/viewBlog" element={<ViewVlog />} />
                    <Route path="/profile" element={<Profile/>} />
                </Route>

                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>

        </>
    )
}

export default NavRouter;