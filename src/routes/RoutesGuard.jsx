import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLoading from "../components/authentication/AuthLoading";
import HomeLayoutLoading from "../components/layout/main/HomeLayoutLoading";

const RoutesGuard = ({ isProtected }) => {
  
  const { authStatus } = useAuth();

  if (authStatus === "loading" || authStatus === null)
    return isProtected ? <HomeLayoutLoading /> : <AuthLoading />;

  if (isProtected)
    return authStatus === "authenticated" ? <Outlet /> : <Navigate to="/signin" replace />;
  
  return authStatus === "authenticated" ? <Navigate to="/user/home" replace /> : <Outlet />;

}

export default RoutesGuard