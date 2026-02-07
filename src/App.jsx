import { Toaster } from "sonner"
import AppRoutes from "./routes/AppRoutes"
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react"
import SettingsLayout from "./layouts/SettingsLayout"
import AnalysisFormDialog from "./components/analysis result/AnalysisFormDialog"
import { useAuth } from "./contexts/AuthContext"
import { DelResumeModalProvider } from "./contexts/DelResumeModalContext"
import JobDeleteDialog from "./components/job description/JobDeleteDialog"
import ResumeDeleteDialog from "./components/resume/ResumeDeleteDialog"
import { DelJobModalProvider } from "./contexts/DelJobModalContext"

function App() {

  const { authStatus } = useAuth();

  return (
    <>
      <Toaster 
        id="global" 
        className="z-9999"
        theme="dark" 
        position="top-center" 
        icons={{
          success: <CircleCheck fill="#91cfa7" stroke="#141414" />,
          info: <Info fill="#ffe8d2" stroke="#141414" />,
          error: <CircleX fill="#de6666" stroke="#141414" />,
          warning: <TriangleAlert fill="#ffffb5" stroke="#141414" />
        }}
        toastOptions={{
          style: {
            background: "#0f0f0f",
            color: "#ffe8d2",
            border: "1px solid #31393b",
            borderRadius: "4px",
            fontSize: "15px",
            boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px"
          }
        }}
      />
      <Toaster 
        id="closable"
        className="z-9999"
        closeButton
        theme="dark" 
        position="top-center" 
        icons={{
          success: <CircleCheck fill="#91cfa7" stroke="#141414" />,
          info: <Info fill="#ffe8d2" stroke="#141414" />,
          error: <CircleX fill="#de6666" stroke="#141414" />,
          warning: <TriangleAlert fill="#ffffb5" stroke="#141414" />
        }}
        toastOptions={{
          style: {
            background: "#0f0f0f",
            color: "#ffe8d2",
            border: "1px solid #31393b",
            borderRadius: "4px",
            fontSize: "15px",
            boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px"
          }
        }}
      />
      <DelResumeModalProvider>
        <DelJobModalProvider>
          <AppRoutes />
          {
            authStatus === "authenticated" &&
            <>
              {/* Modal to confirm resume deletion */}
              <ResumeDeleteDialog />
              
              {/* Modal to confirm job description deletion */}
              <JobDeleteDialog />

              {/* Modal for analysis form */}
              <AnalysisFormDialog />

              {/* Modal for settings layout */}
              <SettingsLayout />
              
            </>
          }
        </DelJobModalProvider>
      </DelResumeModalProvider>
    </>
  )
}

export default App
