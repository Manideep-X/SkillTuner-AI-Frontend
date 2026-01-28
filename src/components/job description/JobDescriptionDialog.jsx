import { BriefcaseBusiness, Building2, NotepadText, X } from "lucide-react"

const JobDescriptionDialog = ({ jobDescription }) => {
  return (
    <dialog id="jobDesModal" className="modal modal-bottom sm:modal-middle backdrop-blur-[2px]">
      <div className="modal-box p-0 sm:rounded-lg rounded-t-2xl w-full sm:w-11/12 md:w-196 max-w-5xl h-full overflow-hidden">

        {/* Job description modal title */}
        <h3 className="flex items-center gap-2 sm:text-2xl text-xl font-bold text-white px-6 py-6">
          <BriefcaseBusiness className="text-accent"/>
          {jobDescription.jobTitle}
        </h3>

        {/* Content of the job description modal */}
        <div className="flex items-center justify-center m-0 h-[86%] w-full bg-base-content/2 sm:p-3">
          <div className="w-full flex flex-col gap-4 text-base-content h-full overflow-auto rounded-lg p-5 bg-base-200 focus-visible:border-none focus-visible:outline-none focus-visible:active:border-none focus-visible:active:outline-none">
            
            {/* Company name */}
            <div className="flex flex-col items-center gap-2">
              <p className="flex items-center w-full truncate gap-1 text-lg font-bold">
                <Building2 className="size-6 text-secondary"/>
                Company Name
              </p>
              <span className="text-secondary-content w-full text-wrap px-5 py-4 border border-accent-content/40 rounded-lg bg-accent-content/5 text-[15px] sm:text-[16px]">{jobDescription.companyName}</span>
            </div>

            {/* Description */}
            <div className="flex flex-col items-center gap-2">
              <p className="flex items-center w-full truncate gap-1 text-lg font-bold">
                <NotepadText className="size-6 text-secondary"/>
                Description
              </p>
              <span className="text-secondary-content w-full text-wrap px-5 py-4 border border-accent-content/40 rounded-lg bg-accent-content/5 text-justify text-[15px] sm:text-[16px]">{jobDescription.description}</span>
            </div>

          </div>
        </div>

        <div className="modal-action m-0">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost size-8 absolute right-5 top-6.5 font-bold text-white">
              <X />
            </button>
          </form>
        </div>

      </div>
      
    </dialog>
  )
}

export default JobDescriptionDialog