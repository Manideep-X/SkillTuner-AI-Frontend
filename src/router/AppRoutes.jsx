import { Route, Routes } from "react-router-dom"
import Landing from "../pages/Landing"
import Signin from "../pages/Signin"
import Signup from "../pages/Signup"
import Dashboard from "../pages/Dashboard"
import AnalysisResult from "../pages/AnalysisResult"
import NotFound from "../pages/NotFound"
import Resumes from "../pages/Resumes"
import UsernameChange from "../pages/UsernameChange"
import PasswordChange from "../pages/PasswordChange"

import MainLayout from "../layouts/MainLayout"
import SettingsLayout from "../layouts/SettingsLayout"

const AppRoutes = () => {
  return (
    <Routes>

      {/* Landing page */}
      <Route path="" element={<Landing />} />

      {/* Signin page */}
      <Route path="/signin" element={<Signin />} />

      {/* Signup page */}
      <Route path="/signup" element={<Signup />} />

      {/* Main page (Auth required) */}
      <Route path="/user" element={<MainLayout />} >
        {/* Dashboard section */}
        <Route path="home" element={<Dashboard />} />
        {/* Analysis result section */}
        <Route path="analysis-results/:id" element={<AnalysisResult />} />
      </Route>

      {/* Settings page (Auth required) */}
      <Route path="/settings" element={<SettingsLayout />}>
        {/* Add resumes section */}
        <Route path="resumes" element={<Resumes />} />
        {/* Username change section */}
        <Route path="user-name" element={<UsernameChange />} />
        {/* Password change section */}
        <Route path="password" element={<PasswordChange />} />
      </Route>

      {/* Not Found page for not-found and wild card */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />

    </Routes>
  )
}

export default AppRoutes