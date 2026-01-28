import { Navigate, Route, Routes } from "react-router-dom"
import Landing from "../pages/Landing"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Dashboard from "../pages/Dashboard"
import AnalysisResult from "../pages/AnalysisResult"
import Resumes from "../pages/Resumes"
import UsernameChange from "../pages/UsernameChange"
import PasswordChange from "../pages/PasswordChange"

import MainLayout from "../layouts/MainLayout"
import SettingsLayout from "../layouts/SettingsLayout"
import AuthLayout from "../layouts/AuthLayout"
import RoutesGuard from "./RoutesGuard"
import DashboardLoading from "../components/layout/main/DashboardLoading"
import HomeLayoutLoading from "../components/layout/main/HomeLayoutLoading"
import ListOfAnalysesLoading from "../components/layout/main/ListOfAnalysesLoading"
import AnalysisResultLoading from "../components/analysis result/AnalysisResultLoading"

const AppRoutes = () => {
  return (
    <Routes>

      {/* Landing page */}
      <Route path="/" element={<Landing />} />

      {/* Public guard route */}
      <Route element={<RoutesGuard isProtected={false} />}>
        
        {/* Auth pages (Need to check if user is already logged-in) */}
        <Route element={<AuthLayout />}>
          {/* Signin page */}
          <Route path="/signin" element={<Signin />} />
          {/* Signup page */}
          <Route path="/signup" element={<Signup />} />
          {/* For other paths in /auth */}
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Route>
        
      </Route>

      {/* Protected guard route */}
      <Route element={<RoutesGuard isProtected={true} />}>
        
        {/* Main page (Auth required) */}
        <Route path="/user" element={<MainLayout />}>
          {/* Default route for the path /user */}
          <Route index element={<Navigate to="home" replace />} />
          {/* Dashboard section */}
          <Route path="home" element={<Dashboard />} />
          {/* Analysis result section */}
          <Route path="analysis/:resumeId/:jdId" element={<AnalysisResult />} />
        </Route>
        
      </Route>

      {/* For the wild card */}
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* Testing */}
      <Route path="/loadresult" element={<AnalysisResultLoading />} />

    </Routes>
  )
}

export default AppRoutes