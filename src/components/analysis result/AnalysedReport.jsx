import { ChartPie, ClipboardList, ClockCheck, FileBadge, FileChartLine, FileExclamationPoint, MessageSquareQuote, Quote, Sparkles } from "lucide-react"
import ListOfDetails from "./ListOfDetails"
import { format, parseISO } from "date-fns"

const AnalysedReport = ({ analysedData }) => {
  return (
    <section>
        <div className="flex flex-wrap flex-col sm:gap-5 sm:p-5 shadow-md bg-base-content/5 rounded-lg items-center justify-center my-0 mx-auto">

            {/* Title for Analysis Report */}
            <div className="flex justify-start items-center gap-2 w-full px-5 pt-5 sm:px-0 sm:pt-0">
                <div className="relative">
                    <ClipboardList className="text-accent size-7"/>
                    <Sparkles fill="#FFFF00" className="absolute bottom-0 right-0 text-[#FFFF00] size-3.5"/>
                </div>
                <span className="text-lg font-semibold">Analysis Report</span>
                <div className="badge badge-soft border border-success text-xs font-medium badge-success py-2.5 ml-1">
                    <p className="hidden sm:flex">Generated with AI</p>
                    <p className="sm:hidden">AI Generated</p>
                    <Sparkles fill="#5fa378" className="inline size-3 p-0 m-0"/>
                </div>
            </div>

            {/* Body of the analysis report */}
            <div className="flex flex-wrap items-center justify-center gap-5 w-full sm:px-8 sm:py-8 px-3 py-6 rounded-lg">

                {/* Match score radial progress */}
                <div className="flex flex-col p-5 bg-base-100/90 shadow-md/50 shadow-base-200 rounded-lg h-fit overflow-hidden grow sm:min-w-0 sm:p-8 gap-4">
                    <div className="w-full flex items-center gap-2">
                        <ChartPie className="text-accent size-7"/>
                        <span className="w-full truncate text-lg font-semibold">Match Score</span>
                    </div>
                    <div 
                        className={`radial-progress mx-auto my-0 
                            ${parseInt(analysedData.matchScore, 10) > 75 ? "text-success" : (parseInt(analysedData.matchScore, 10) < 45 ? "text-error" : "text-primary")}`}
                        style={{ "--value": `${analysedData.matchScore}`, "--size": "12rem", "--thickness": "2rem" }} 
                        aria-valuenow={analysedData.matchScore}
                        role="progressbar"
                    >
                        <p className="text-lg font-black">
                            {analysedData.matchScore}%
                        </p>
                    </div>
                </div>

                {/* Feedback */}
                <div className="p-5 sm:p-8 min-w-0 sm:w-xl h-fit bg-base-100/90 shadow-md/50 shadow-base-200 rounded-lg flex flex-col grow gap-5">
                    <div className="w-full flex items-center gap-2">
                        <MessageSquareQuote className="text-accent size-7"/>
                        <span className="w-full truncate text-lg font-semibold">Feedback</span>
                    </div>
                    <div className="h-47 w-full border border-accent-content/30 bg-accent-content/5 py-5 px-6 rounded-lg overflow-auto">
                        <div className="text-[15px] text-center text-wrap">
                            <Quote fill="#ffe8d2" strokeWidth={1} className="inline mr-2 rotate-180 text-base-content opacity-40"/>
                            {analysedData.feedback}
                            <Quote fill="#ffe8d2" strokeWidth={1} className="inline ml-2 text-base-content opacity-40"/>
                        </div>
                    </div>
                </div>
                
                {/* List of missing skills */}
                <ListOfDetails
                    Icon={FileExclamationPoint}
                    title="Missing Skills"
                    listOfData={analysedData.missingSkills}
                />
                
                {/* List of strengths */}
                <ListOfDetails
                    Icon={FileBadge}
                    title="Strengths"
                    listOfData={analysedData.strengths}
                />
                
                {/* List of improvements */}
                <ListOfDetails
                    Icon={FileChartLine}
                    title="Improvements Needed"
                    listOfData={analysedData.improvements}
                />    

            </div>
            
            {/* Creation time */}
            <div className="font-semibold w-full flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-accent-content/20">
                <ClockCheck className="text-success size-5"/>
                <span className="text-wrap text-sm">
                    Report generated on { format(parseISO(analysedData.creationTime, 10), "dd MMM yyyy, hh:mm a") }
                </span>
            </div>
            
        </div>
    </section>
  )
}

export default AnalysedReport