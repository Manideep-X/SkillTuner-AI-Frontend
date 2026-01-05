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
import AuthLoading from "../components/authentication/AuthLoading"

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
          {/* Dashboard section */}
          <Route path="home" element={<Dashboard />} />
          {/* Analysis result section */}
          <Route path="analysis/:resumeId/:jdId" element={<AnalysisResult />} />
          {/* For other paths in /user */}
          <Route path="*" element={<Navigate to="home" replace />} />
        </Route>

        {/* Settings page (Auth required) */}
        <Route path="/settings" element={<SettingsLayout />}>
          {/* Add resumes section */}
          <Route path="resumes" element={<Resumes />} />
          {/* Username change section */}
          <Route path="user-name" element={<UsernameChange />} />
          {/* Password change section */}
          <Route path="password" element={<PasswordChange />} />
          {/* For other paths in /settings */}
          <Route path="*" element={<Navigate to="resumes" replace />} />
        </Route>
        
      </Route>

      {/* For the wild card */}
      <Route path="*" element={<Navigate to="/" replace />} />

      {/* Testing */}
      <Route path="/testhome" element={<MainLayout />} />

    </Routes>
  )
}

export default AppRoutes