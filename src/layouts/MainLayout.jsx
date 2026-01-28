import { Outlet } from "react-router-dom"
import SidebarNav from "../components/layout/main/SidebarNav"
import { useEffect, useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";

const initialSidebarValue = () => {
  if (typeof window === false) {
    return;
  }
  return window.matchMedia("(min-width: 1024px)").matches;
}

const MainLayout = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(initialSidebarValue);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const mediaWidth = window.matchMedia("(min-width: 1024px)");

    const handler = (e) => {
      setIsSidebarOpen(e.matches);
    };

    mediaWidth.addEventListener("change", handler);
    
    return () => {
      mediaWidth.removeEventListener("change", handler);
    }
  }, []);

  return (
    <section className="drawer md:drawer-open">
      {/* Input for drawer toggle */}
      <input 
        id="my-drawer-4" 
        type="checkbox" 
        className="drawer-toggle"
        checked={isSidebarOpen}
        onChange={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="drawer-content flex flex-col w-full h-screen">
        <nav className="navbar bg-base-300 shadow-xl/95 shadow-base-300">
          <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
            {/* Sidebar toggle icon */}
            {
              isSidebarOpen
              ? <PanelRightOpen />
              : <PanelRightClose />
            }
          </label>
          <div className="px-4 font-bold text-lg truncate w-full">{ title }</div>
        </nav>

        {/* Other pages will be displayed here */}
        <div className="overflow-y-auto grow text-white">
          <Outlet context={{ setTitle, isSidebarOpen }} />
        </div>

      </div>

      <SidebarNav isOpen={isSidebarOpen} />

    </section>
  )
}

export default MainLayout