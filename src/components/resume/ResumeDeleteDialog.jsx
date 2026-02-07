import { Trash2, TriangleAlert, X } from "lucide-react";
import { useDelResumeModal } from "../../contexts/DelResumeModalContext";
import { toast } from "sonner";
import { createPortal } from "react-dom";

const rootOfModals = document.getElementById("root-of-modals");

const ResumeDeleteDialog = () => {

  const { resume, onDialogClose, onDialogConfirm } = useDelResumeModal();

  if (!resume) {
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
            Deleting this resume: "<b>{resume.resumeTitle}</b>" will result in <b>deletion</b> of all <b>analysed history</b> and <b>job description</b> associated with it.
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

export default ResumeDeleteDialog