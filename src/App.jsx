import { Toaster } from "sonner"
import AppRoutes from "./router/AppRoutes"

function App() {

  return (
    <>
      <Toaster closeButton position="top-center" />
      <AppRoutes />
    </>
  )
}

export default App
