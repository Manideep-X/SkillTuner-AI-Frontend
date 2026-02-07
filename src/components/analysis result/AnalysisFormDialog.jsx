import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SettingsSectionLoading from "../layout/settings/SettingsSectionLoading";
import { FlaskConical, X } from "lucide-react";
import NewAnalysisDetails from "../../pages/NewAnalysisDetails";

const AnalysisFormDialog = () => {

  const dialogRef = useRef(null);
  const location = useLocation();
  const { authStatus } = useAuth();

  // Hash changes
  const handleModal = () => {
    const hash = window.location.hash;
    const modal = dialogRef.current;
    if (!modal) return;

    // Force close if the user is unauthenticated
    if (location.pathname === "/signin" || location.pathname === "/signup" || location.pathname === "/" || authStatus === "unauthenticated") {
      if (modal?.open) 
        modal.close();
      window.location.hash = "";
      return;
    }

    // Opens the modal if the hash is correct and modal is closed
    if (hash === "#analysis" && !modal.open) {
      modal.showModal();
    }
    
    // Irrelevant hash will result in closure of the modal
    if (!(hash === "#analysis") && modal.open) {
      modal.close();
    }
  }

  // This will clear the hash
  const closeModal = () => {
    window.location.hash = "";
  }

  // Handles modal based on hash path and authentication status
  useEffect(() => {
    if (authStatus !== "authenticated") return;
    handleModal();
  }, [authStatus, location.pathname, location.hash]);

  return (
    <dialog id="analysisModal" ref={dialogRef} onClose={closeModal} className="modal modal-bottom sm:modal-middle backdrop-blur-[2px] z-40">
      {
        authStatus === "loading"
        ?
          <div className="modal-box p-10 sm:rounded-lg rounded-t-2xl w-full sm:w-11/12 md:w-196 max-w-5xl overflow-y-hidden h-130 text-white">
            {/* Loading section for pending authentication */}
            <SettingsSectionLoading />
          </div>
        :
          <div className="modal-box p-0 sm:rounded-lg rounded-t-2xl w-full sm:w-11/12 md:w-196 max-w-5xl overflow-y-hidden">
        
            {/* Title of the analysis form modal */}
            <h3 className="flex items-center sm:text-[22px] text-xl font-bold text-white px-6 py-6 gap-2">
              <FlaskConical className="size-6.5 text-accent"/>
              Add details for analysis
            </h3>

            {/* Contents of the analysis's modal */}
            <div className="flex sm:flex-row flex-col m-0 p-0 w-full grow h-130 overflow-y-auto bg-base-content/2">
              <NewAnalysisDetails />
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
  );
}

export default AnalysisFormDialog