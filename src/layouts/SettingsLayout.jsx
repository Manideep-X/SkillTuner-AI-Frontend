import { useEffect, useRef, useState } from "react";
import { SettingPaths } from "../utils/SettingPaths"
import Resumes from "../pages/Resumes"
import UsernameChange from "../pages/UsernameChange"
import PasswordChange from "../pages/PasswordChange"
import SessionSignout from "../pages/SessionSignout"
import { AlarmClock, ChevronRight, FilePenLine, ShieldEllipsis, UserPen, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SettingsSectionLoading from "../components/layout/settings/SettingsSectionLoading";

const SettingsLayout = () => {

  const [activePage, setActivePage] = useState(null); // null means modal is closed
  const dialogRef = useRef(null);
  const location = useLocation();
  const { authStatus } = useAuth();

  // Hash changes
  const handleHash = () => {
    const hash = window.location.hash;
    const modal = dialogRef.current;

    // Irrelevant hash will result in closure of the modal
    if (!hash.startsWith("#settings/")) {
      setActivePage(null);
      if (modal?.open) modal.close();
      return;
    }

    // Settings default hash as resumes
    if (hash === "#settings" || hash === "#settings/") {
      window.location.hash = "#settings/resumes";
      return;
    }

    // Extracts the page from the hash
    const page = hash.replace("#settings/", "");

    // Checks if page is present in the hash, and only then it will be displayed
    if (Object.values(SettingPaths).includes(page)) {
      setActivePage(page);
      if (modal && !modal.open) {
        modal.showModal();
      }
    }
  }

  // This will clear the hash
  const closeModal = () => {
    window.location.hash = "";
  }

  // adding event listener for hash and modal close, removing it on unmount, and handling hash
  useEffect(() => {
    const modal = dialogRef.current;
    if (!modal) return;

    // Adds event listener for hash change and closing modal
    window.addEventListener("hashchange", handleHash);
    modal.addEventListener("close", closeModal);
    
    // Function call to handle hash in URL
    handleHash();
    
    // Removes all event listener while unmount
    return () => {
      window.removeEventListener("hashchange", handleHash);
      modal.removeEventListener("close", closeModal);
    }
  }, []);

  // Modal forcibly closed when react navigates
  useEffect(() => {
    const modal = dialogRef.current;
    if(!modal) return;

    if (location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/") {
      setActivePage(null);
      if (modal?.open) 
        modal.close();
      window.location.hash = "";
    }
  }, [location.pathname]);

  if (authStatus === "unauthenticated") {
    const modal = dialogRef.current;
    if (modal?.open) 
      modal.close();
    window.location.hash = "";
    return "";
  }

  return (
    <dialog id="settingsModal" ref={dialogRef} className="modal modal-bottom sm:modal-middle backdrop-blur-[2px]">
      {
        authStatus === "loading"
        ?
          <div className="modal-box p-10 sm:rounded-lg rounded-t-2xl w-full sm:w-11/12 md:w-196 max-w-5xl overflow-y-hidden h-130 text-white">
            <SettingsSectionLoading />
          </div>
        :
          <div className="modal-box p-0 sm:rounded-lg rounded-t-2xl w-full sm:w-11/12 md:w-196 max-w-5xl overflow-y-hidden">

            {/* Title of the setting's modal */}
            <h3 className="flex items-center sm:text-2xl text-xl font-bold text-white px-6 py-6">
              Settings
              <ChevronRight />
              {
                activePage === "resumes" 
                  ? "Resumes" 
                  : (activePage === "user-name" 
                      ? "User Name" 
                      : (activePage === "password" ? "Password" : "Session")
                    )
              }
            </h3>
            
            {/* Contents of the setting's modal */}
            <div className="flex sm:flex-row flex-col m-0 p-0 w-full">
            
              {/* Sidebar navigation of the setting's modal */}
              <div className="bg-base-300/40 sm:w-fit w-full">
                <nav className="menu flex sm:flex-col flex-row sm:w-fit w-full sm:justify-start justify-center sm:gap-2 gap-1">
                  <a href="#settings/resumes" className={`flex sm:gap-1.5 gap-1 sm:px-3 px-2 py-2 items-center font-semibold rounded-sm hover:bg-base-content/15 transition-all border-base-content/20 border sm:border-none ${activePage === "resumes" ? "bg-base-content/15" : ""} `}>
                    <FilePenLine className="text-accent size-5" />
                    <p className="truncate sm:w-36 w-32 text-accent-content">
                      Resumes
                    </p>
                  </a>
                  <a href="#settings/user-name" className={`flex sm:gap-1.5 gap-1 sm:px-3 px-2 py-2 items-center font-semibold rounded-sm hover:bg-base-content/15 transition-all border-base-content/20 border sm:border-none ${activePage === "user-name" ? "bg-base-content/15" : ""} `}>
                    <UserPen className="text-accent size-5" />
                    <p className="truncate sm:w-36 w-32 text-accent-content">
                      Update Name
                    </p>
                  </a>
                  <a href="#settings/password" className={`flex sm:gap-1.5 gap-1 sm:px-3 px-2 py-2 items-center font-semibold rounded-sm hover:bg-base-content/15 transition-all border-base-content/20 border sm:border-none ${activePage === "password" ? "bg-base-content/15" : ""} `}>
                    <ShieldEllipsis className="text-accent size-5" />
                    <p className="truncate sm:w-36 w-32 text-accent-content">
                      Update Password
                    </p>
                  </a>
                  <a href="#settings/session" className={`flex sm:gap-1.5 gap-1 sm:px-3 px-2 py-2 items-center font-semibold rounded-sm hover:bg-base-content/15 transition-all border-base-content/20 border sm:border-none ${activePage === "session" ? "bg-base-content/15" : ""} `}>
                    <AlarmClock className="text-accent size-5" />
                    <p className="truncate sm:w-36 w-32 text-accent-content">
                      Session
                    </p>
                  </a>
                </nav>
              </div>
            
              {/* Different setting's section switching */}
              <div className="grow h-130 overflow-y-auto bg-base-content/2">
                { activePage === "resumes" && <Resumes /> }
                { activePage === "user-name" && <UsernameChange /> }
                { activePage === "password" && <PasswordChange /> }
                { activePage === "session" && <SessionSignout /> }
              </div>
            
            </div>
            
            {/* Close button for the setting's modal */}
            <div className="modal-action m-0">
              <button onClick={closeModal} className="btn btn-sm btn-circle btn-ghost size-8 absolute right-5 top-6.5 font-bold text-white">
                <X />
              </button>
            </div>
            
          </div>
      }
    </dialog>
  )
}

export default SettingsLayout