const AnalysisResultLoading = () => {
  return (
    <section className="p-5 gap-4 flex flex-col items-center max-w-6xl mx-auto my-0">

      {/* Upper/Preview section */}
      <div className="sm:px-8 sm:py-8 px-3 py-6 flex flex-wrap gap-5 items-center justify-center w-full rounded-lg border border-accent-content/10">
        
        {/* Resume loading */}
        <div className="flex flex-col grow sm:min-w-0 sm:p-8 p-5 gap-5 bg-base-300/55 border border-accent-content/10 rounded-lg">
          <div className="flex gap-2 p-2 items-center">
            <div className="skeleton size-13 rounded-full bg-accent-content/5"></div>
            <div className="skeleton h-12 sm:w-48 w-40 rounded-full bg-accent-content/5"></div>
          </div>
          <div className="skeleton h-10 w-full rounded-full bg-accent-content/5"></div>
          <div className="skeleton h-10 w-full rounded-full bg-accent-content/5"></div>
        </div>

        {/* Job description loading */}
        <div className="flex flex-col grow min-w-0 sm:w-xl sm:p-8 p-5 gap-5 bg-base-300/55 border border-accent-content/10 rounded-lg">
          <div className="flex gap-2 p-2 items-center">
            <div className="skeleton size-13 rounded-full bg-accent-content/5"></div>
            <div className="skeleton h-12 sm:w-48 w-40 rounded-full bg-accent-content/5"></div>
          </div>
          <div className="skeleton h-10 w-full rounded-full bg-accent-content/5"></div>
          <div className="skeleton h-10 w-full rounded-full bg-accent-content/5"></div>
        </div>
        
      </div>

      {/* Lower/Report section */}
      <div className="sm:px-8 sm:py-8 px-3 py-6 flex flex-wrap gap-5 items-center justify-center w-full rounded-lg border border-accent-content/10">
        
        <div className="flex flex-col grow sm:min-w-0 sm:p-7 p-5 gap-2 bg-base-300/55 border border-accent-content/10 rounded-lg">
          <div className="flex gap-2 items-center">
            <div className="skeleton size-13 rounded-full bg-accent-content/5"></div>
            <div className="skeleton h-12 sm:w-48 w-40 rounded-full bg-accent-content/5"></div>
          </div>
          <div className="skeleton size-34 rounded-full bg-accent-content/5 mx-auto my-0"></div>
        </div>

        <div className="flex flex-col grow min-w-0 sm:w-xl sm:p-8 p-5 gap-5 bg-base-300/55 border border-accent-content/10 rounded-lg">
          <div className="flex gap-2 p-2 items-center">
            <div className="skeleton size-13 rounded-full bg-accent-content/5"></div>
            <div className="skeleton h-12 sm:w-48 w-40 rounded-full bg-accent-content/5"></div>
          </div>
          <div className="skeleton h-10 w-full rounded-full bg-accent-content/5"></div>
          <div className="skeleton h-10 w-full rounded-full bg-accent-content/5"></div>
        </div>
        
      </div>

    </section>
  )
}

export default AnalysisResultLoading