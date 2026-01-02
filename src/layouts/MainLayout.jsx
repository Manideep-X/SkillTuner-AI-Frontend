import { Outlet } from "react-router-dom"
import SidebarNav from "../components/layout/main/SidebarNav"
import { useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const MainLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <section className="drawer lg:drawer-open">
      {/* Input for drawer toggle */}
      <input 
        id="my-drawer-4" 
        type="checkbox" 
        className="drawer-toggle"
        checked={isSidebarOpen}
        onChange={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            {
              isSidebarOpen
              ? <PanelRightOpen />
              : <PanelRightClose />
            }
          </label>
          <div className="px-4">Title</div>
        </nav>

        {/* Other pages will be displayed here */}
        <div>
          MainLayout all components
          <Outlet />
        </div>

      </div>

      <SidebarNav isOpen={isSidebarOpen} />

    </section>
  )
}

export default MainLayout