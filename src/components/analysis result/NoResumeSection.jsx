import { ChevronRight, FileXCorner } from "lucide-react"

const NoResumeSection = () => {
  return (
    <section className="w-full py-12 h-fit flex items-center justify-center">
      <div className="px-6 py-5 flex flex-col items-center justify-center bg-base-100 border border-accent-content/10 rounded-lg text-white">
        <div className="p-6 flex items-center rounded-full mb-3 bg-accent/10">
          <FileXCorner className="size-12 text-accent"/>
        </div>
        <span className="w-full text-center text-xl font-bold">No Available Resume(s)</span>
        <span className="w-full text-center font-bold pb-4 text-base-content">Add a new resume to continue</span>
        <span className="w-full text-center text-sm font-medium text-accent-content/50">To add new resume:</span>
        <span className="w-full text-center text-sm font-medium text-accent-content/50">
          Dashboard <ChevronRight className="inline size-4"/> Settings <ChevronRight className="inline size-4"/> Resumes <ChevronRight className="inline size-4"/> Add a new resume
        </span>
      </div>
    </section>
  )
}

export default NoResumeSection