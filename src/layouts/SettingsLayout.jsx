import { useEffect, useRef, useState } from "react";
import { SettingPaths } from "../utils/SettingPaths"
import Resumes from "../pages/Resumes"
import UsernameChange from "../pages/UsernameChange"
import PasswordChange from "../pages/PasswordChange"
import { ChevronRight, CircleX } from "lucide-react";

const SettingsLayout = () => {

  const [activePage, setActivePage] = useState(null); // null means modal is closed
  const dialogRef = useRef(null);

  // Hash changes
  const handleHash = () => {
    const hash = window.location.hash;
    const modal = dialogRef.current;

    // Parsing the hash
    if (!hash.startsWith("#settings/")) {
      setActivePage(null);
      if (modal?.open) modal.close();
      return;
    }

    // Settings default hash as resumes
    if (hash !== "#settings" || hash !== "#settings/") {
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

  return (
    <dialog id="settingsModal" ref={dialogRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Settings <ChevronRight /> {activePage} </h3>
        <div className="py-4">
          <nav className="menu flex sm:flex-col flex-row">
            <a href="#settings/resumes">Resumes</a>
            <a href="#settings/user-name">Update Name</a>
            <a href="#settings/password">Update Password</a>
          </nav>
          { activePage === "resume" && <Resumes /> }
          { activePage === "user-name" && <UsernameChange /> }
          { activePage === "password" && <PasswordChange /> }
        </div>
        <div className="modal-action">
          <button onClick={closeModal} className="btn">
            <CircleX />
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default SettingsLayout