import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DashboardLoading from "../components/layout/main/DashboardLoading";
import AuthLoading from "../components/authentication/AuthLoading";

const RoutesGuard = ({ isProtected }) => {
  
  const { authStatus } = useAuth();

  if (authStatus === "loading" || authStatus === null)
    return isProtected ? <DashboardLoading /> : <AuthLoading />;

  if (isProtected)
    return authStatus === "authenticated" ? <Outlet /> : <Navigate to="/signin" replace />;
  
  return authStatus === "authenticated" ? <Navigate to="/user/home" replace /> : <Outlet />;

}

export default RoutesGuard