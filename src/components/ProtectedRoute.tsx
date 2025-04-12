import { Outlet, Navigate } from "react-router";
import { useAppSelector } from "../stores/hook";

const ProtectedRoute = () => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }
    return <Outlet />;
};

export default ProtectedRoute;
