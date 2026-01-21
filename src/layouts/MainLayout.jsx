import { Outlet } from "react-router-dom"
import SidebarNav from "../components/layout/main/SidebarNav"
import { useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const MainLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");

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
      <div className="drawer-content w-full">
        <nav className="navbar bg-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            {
              isSidebarOpen
              ? <PanelRightOpen />
              : <PanelRightClose />
            }
          </label>
          <div className="px-4">{ title }</div>
        </nav>

        {/* Other pages will be displayed here */}
        <div className="overflow-x-hidden overflow-y-auto grow text-white">
          <Outlet context={{ setTitle }} />
        </div>

      </div>

      <SidebarNav isOpen={isSidebarOpen} />

    </section>
  )
}

export default MainLayout