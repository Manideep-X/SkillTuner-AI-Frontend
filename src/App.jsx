import { Toaster } from "sonner"
import AppRoutes from "./router/AppRoutes"
import { CircleCheck, CircleX, Info, TriangleAlert } from "lucide-react"

function App() {

  return (
    <>
      <Toaster 
        id="global" 
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
            background: "#141414",
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
            background: "#141414",
            color: "#ffe8d2",
            border: "1px solid #31393b",
            borderRadius: "4px",
            fontSize: "15px",
            boxShadow: "rgba(0, 0, 0, 0.07) 0px 1px 1px, rgba(0, 0, 0, 0.07) 0px 2px 2px, rgba(0, 0, 0, 0.07) 0px 4px 4px, rgba(0, 0, 0, 0.07) 0px 8px 8px, rgba(0, 0, 0, 0.07) 0px 16px 16px"
          }
        }}
      />
      <AppRoutes />
    </>
  )
}

export default App
