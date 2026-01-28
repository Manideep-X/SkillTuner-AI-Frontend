import { useEffect, useState } from "react";
import DashboardLoading from "./DashboardLoading";

const initialSidebarValue = () => {
  if (typeof window === false) {
    return;
  }
  return window.matchMedia("(min-width: 1024px)").matches;
}

const HomeLayoutLoading = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(initialSidebarValue);
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
    <section className={`drawer md:drawer-open ${isSidebarOpen && "drawer-open"}`}>
      {/* Input for drawer toggle */}
      <input 
        id="my-drawer-4" 
        type="checkbox" 
        className="drawer-toggle"
        checked={isSidebarOpen}
        onChange={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="drawer-content flex flex-col w-full h-screen">
        <nav className="navbar bg-base-300 shadow-xl/95 shadow-base-300 px-3 sm:px-7">
          <div className="p-4 skeleton bg-accent-content/5 rounded-full size-12 mr-3"></div>
          <div className="px-4 skeleton bg-accent-content/5 rounded-full h-12 w-44"></div>
        </nav>

        {/* Other pages will be displayed here */}
        <div className="overflow-y-auto grow text-white">
          <DashboardLoading />
        </div>

      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-18 is-drawer-open:w-80">
          <ul className="menu w-full grow flex gap-5 is-drawer-open:px-6 is-drawer-close:px-3">
            {/* Heading list item */}
            <li className="flex flex-row gap-3 items-center pt-0.5 pb-5 btn-disabled bg-inherit">
              <div className="skeleton bg-accent-content/5 size-12 rounded-full"></div>
              <div className="skeleton bg-accent-content/5 h-12 rounded-full grow is-drawer-close:hidden"></div>
            </li>

            {/* List item */}
            <li className="flex flex-row gap-3 items-center btn-disabled bg-inherit">
              <div className="skeleton bg-accent-content/5 size-12 rounded-full"></div>
              <div className="skeleton bg-accent-content/5 h-10 w-44 rounded-full grow is-drawer-close:hidden"></div>
            </li>
            
            {/* List item */}
            <li className="flex flex-row gap-3 items-center btn-disabled bg-inherit">
              <div className="skeleton bg-accent-content/5 size-12 rounded-full"></div>
              <div className="skeleton bg-accent-content/5 h-10 w-44 rounded-full grow is-drawer-close:hidden"></div>
            </li>

            {/* List item */}
            <li className="flex flex-row gap-3 items-center btn-disabled bg-inherit">
              <div className="skeleton bg-accent-content/5 size-12 rounded-full"></div>
              <div className="skeleton bg-accent-content/5 h-10 w-44 rounded-full grow is-drawer-close:hidden"></div>
            </li>

            {/* List item */}
            <li className="flex flex-row gap-3 items-center btn-disabled bg-inherit">
              <div className="skeleton bg-accent-content/5 size-12 rounded-full"></div>
              <div className="skeleton bg-accent-content/5 h-10 w-44 rounded-full grow is-drawer-close:hidden"></div>
            </li>
          </ul>
        </div>
      </div>

    </section>
  )
}

export default HomeLayoutLoading