import { Trash2, TriangleAlert, X } from "lucide-react";
import { useDelJobModal } from "../../contexts/DelJobModalContext";
import { createPortal } from "react-dom";

const rootOfModals = document.getElementById("root-of-modals");

const JobDeleteDialog = () => {

  const { jobDescription, onDialogClose, onDialogConfirm } = useDelJobModal();

  if (!jobDescription) {
    return null;
  }

  return createPortal(
    <dialog open className="modal modal-middle z-50 backdrop-blur-[2px]">
      <div className="modal-box rounded-lg">
        <form method="dialog">
          {/* Close button */}
          <button type="button" onClick={onDialogClose} className="btn btn-sm btn-circle btn-ghost absolute right-4 top-5">
            <X className="size-6"/>
          </button>
        </form>
        <div className="font-bold text-xl text-error flex items-center gap-2 mb-4">
          <TriangleAlert className="size-6"/>
          <p>
            Data Loss Warning!
          </p>
        </div>
        <div className="py-4 px-2 text-error-content flex flex-col items-center gap-1">
          <span className="">
            Deleting this job description: "<b>{jobDescription.jobTitle}</b>" will result in <b>permanent deletion</b> of the analysed report associated with it.
          </span>
        </div>
        {/* Confirm button */}
        <button 
          onClick={() => {
            onDialogConfirm?.();
            onDialogClose();
          }} 
          type="button" 
          className="btn btn-error shadow-md/40 text-shadow-none flex items-center gap-2 text-accent-content px-7 py-5 mx-auto font-bold rounded-lg"
        >
          <Trash2 className="size-5"/>
          <p>
            Confirm
          </p>
        </button>
      </div>
    </dialog>,
    rootOfModals
  );
}

export default JobDeleteDialog