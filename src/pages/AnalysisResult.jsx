import { useEffect, useRef, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import AnalysisResultLoading from "../components/analysis result/AnalysisResultLoading"
import ApiClient from "../api/ApiClient";
import ErrorHandling from "../utils/errors/ErrorHandling";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { ToastStyle } from "../utils/ToastStyle";
import { BriefcaseBusiness, Building2, FileText, FileTypeCorner, Sparkles, SquareArrowOutUpRight, TextSelect, TriangleAlert } from "lucide-react";
import { fileSizeFormatter } from "../utils/FileSizeFormatter";
import AnalysedReport from "../components/analysis result/AnalysedReport";
import JobDescriptionDialog from "../components/job description/JobDescriptionDialog";
import BrowserTabTitle from "../utils/BrowserTabTitle";

const AnalysisResult = () => {

  const { resumeId, jdId } = useParams();
  const navigate = useNavigate();
  const [analysedData, setAnalysedData] = useState({ resume: {}, jobDescription: {}, result: {} });
  const [isLoading, setIsLoading] = useState({ resume: true, jobDescription: true, result: true });
  const [isGenerating, setIsGenerating] = useState(false);
  const { authStatus, signout } = useAuth();
  const hasNavigated = useRef(false);
  const { setTitle, isSidebarOpen } = useOutletContext();

  const getResume = async () => {
    if (hasNavigated.current) return;
    setIsLoading(prevLoading => ({ ...prevLoading, resume: true }));
    try {
      const { okay, status, resData, message } = await ApiClient(`resumes/${resumeId}`, {});
      if (!okay) {
        const result = ErrorHandling(status, signout);
        if (result.toast) {
          result.toast === "error" 
          ? toast.error(message, { toasterId: "global", style: ToastStyle.error })
          : toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
        if (result.action && !hasNavigated.current) {
          hasNavigated.current = true;
          navigate(result.action);
        }
      }
      else setAnalysedData(prevData => ({ ...prevData, resume: resData }));
    } catch (e) {
      toast.error("Error occured while fetching resume details!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsLoading(prevLoading => ({ ...prevLoading, resume: false }));
    }
  };
  
  const getJobDescription = async () => {
    if (hasNavigated.current) return;
    setIsLoading(prevLoading => ({ ...prevLoading, jobDescription: true }));
    try {
      const { okay, status, resData, message } = await ApiClient(`resumes/${resumeId}/job-descriptions/${jdId}`, {});
      if (!okay) {
        const result = ErrorHandling(status, signout);
        if (result.toast) {
          result.toast === "error" 
          ? toast.error(message, { toasterId: "global", style: ToastStyle.error })
          : toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
        if (result.action && !hasNavigated.current) {
          hasNavigated.current = true;
          navigate(result.action);
        }
      }
      else setAnalysedData(prevData => ({ ...prevData, jobDescription: resData }));
    } catch (e) {
      toast.error("Error occured while fetching job description!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsLoading(prevLoading => ({ ...prevLoading, jobDescription: false }));
    }
  };
  
  const getAnalysisResult = async () => {
    if (hasNavigated.current) return;
    setIsLoading(prevLoading => ({ ...prevLoading, result: true }));
    try {
      const { okay, status, resData, message } = await ApiClient(`resumes/${resumeId}/job-descriptions/${jdId}/analysis-result`, {});
      if (!okay) {
        const result = ErrorHandling(status, signout);
        if (result.toast) {
          result.toast === "error" 
          ? toast.error(message, { toasterId: "global", style: ToastStyle.error })
          : toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
        if (result.action && !hasNavigated.current) {
          hasNavigated.current = true;
          navigate(result.action);
        }
      }
      else setAnalysedData(prevData => ({ ...prevData, result: resData }));
    } catch (e) {
      toast.error("Error occured while fetching analysed result!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsLoading(prevLoading => ({ ...prevLoading, result: false }));
    }
  };

  const generateResult = async () => {
    setIsGenerating(true);
    try {
      const { okay, status, resData, message } = await ApiClient(`resumes/${resumeId}/job-descriptions/${jdId}/analysis-result`, {
        method: "POST"
      });
      if (!okay) {
        const result = ErrorHandling(status, signout);
        if (result.toast) {
          result.toast === "error"
          ? toast.error(message, { toasterId: "global", style: ToastStyle.error })
            : toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
        if (result.action && !hasNavigated.current) {
          hasNavigated.current = true;
          navigate(result.action);
        }
      }
      else setAnalysedData(prevData => ({ ...prevData, result: resData }));
    } catch (e) {
      toast.error("Error occured while trying to generate report!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsGenerating(false);
    }
  }

  useEffect(() => {
    if (authStatus !== "authenticated") return;
    setTitle("");
    getResume();
    getJobDescription();
    getAnalysisResult();
  }, [resumeId, jdId]);
  
  useEffect(() => {
    if (analysedData?.jobDescription && analysedData?.jobDescription.jobTitle) 
      setTitle(analysedData.jobDescription.jobTitle);
    return () => {
      setTitle("");
    }
  }, [analysedData?.jobDescription?.jobTitle, setTitle]);

  if (isLoading.jobDescription || isLoading.resume || isLoading.result) {
    return <AnalysisResultLoading />
  }

  return (
    <section className="h-fit">
      <BrowserTabTitle title={`Analysis: ${analysedData.jobDescription.jobTitle} - SkillTuner AI`} />
      <div className="sm:p-4 gap-4 flex flex-col items-center max-w-7xl mx-auto my-0">

        {/* Preview section */}
        <div className="flex flex-wrap flex-col sm:gap-5 sm:p-5 shadow-md bg-base-content/5 rounded-lg items-center justify-center my-0 mx-auto w-full">

          {/* Preview title */}
          <div className="flex justify-start items-center gap-2 w-full px-5 pt-5 sm:px-0 sm:pt-0">
            <TextSelect className="text-accent size-7"/>
            <span className="text-lg font-semibold">Preview</span>
            {
              !analysedData.result
              ? 
                <div className="badge badge-soft border border-error text-xs font-medium badge-error py-2.5 ml-1">Analysis Pending</div>
              :
                <div className="badge badge-soft border border-success text-xs font-medium badge-success py-2.5 ml-1">Report Attached</div>
            }
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 w-full sm:px-8 sm:py-8 px-3 py-6 rounded-lg">
            {/* Resume card */}
            <div className="flex flex-col items-center justify-between p-5 bg-base-100/90 shadow-md/50 shadow-base-200 rounded-lg h-fit overflow-hidden grow sm:min-w-0 sm:p-8 gap-4 sm:h-64">
              <div className="flex items-center justify-between w-full p-1">
                <div className="flex gap-2 justify-between items-center">
                  <FileText className="text-accent size-7"/>
                  <p className="max-w-56 min-w-10 mr-2 truncate font-semibold text-lg">{analysedData.resume.resumeTitle}</p>
                </div>
                <a 
                  href={analysedData.resume.resumeUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-1 btn btn-soft rounded-lg btn-square"
                >
                  <SquareArrowOutUpRight />
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-around gap-2 grow w-full">

                {/* File extension card */}
                <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-accent-content/30 bg-accent-content/5 grow h-full sm:min-w-42 w-full">
                  <p className="hidden sm:inline truncate max-w-full min-w-0 font-semibold">File Extension</p>
                  <p className="sm:hidden truncate max-w-full min-w-0 font-semibold">Extension</p>
                  <span className="flex items-center justify-center gap-1">
                    <FileTypeCorner strokeWidth={1.5} className="opacity-40 size-7"/>
                    <div className="text-[26px] font-thin opacity-40 tabular-nums uppercase">{analysedData.resume.resumeExtension}</div>
                  </span>
                </div>

                {/* File size card */}
                <div className="flex flex-col h-full items-center justify-center p-4 rounded-lg border border-accent-content/30 bg-accent-content/5 grow sm:min-w-42 w-full">
                  <p className="truncate max-w-full min-w-0 font-semibold">File Size</p>
                  <span className="flex items-center justify-center gap-1">
                    <div className="text-2xl font-thin opacity-40 tabular-nums uppercase">{fileSizeFormatter(analysedData.resume.fileSizeInBytes)}</div>
                  </span>
                </div>

              </div>
            </div>

            {/* Job description card */}
            <div className="p-5 sm:p-8 min-w-0 sm:w-xl h-64 bg-base-100/90 shadow-md/50 shadow-base-200 rounded-lg flex flex-col grow gap-5">
              
              {/* Title including job title and company name */}
              <div className="flex items-center gap-2 px-1">
                <BriefcaseBusiness className="text-accent size-7"/>
                <div className="flex flex-col grow">
                  <span className="text-lg font-semibold truncate w-full">{analysedData.jobDescription.jobTitle}</span>
                  <div className="flex items-center text-base-content gap-1">
                    <Building2 className="text-secondary size-4"/>
                    <span className="text-xs font-medium truncate w-full">{analysedData.jobDescription.companyName}</span>
                  </div>
                </div>
              </div>

              {/* Short description and button for read more */}
              <div className="relative">
                <div className="h-32 w-full text-wrap text-justify border border-accent-content/30 bg-accent-content/5 py-5 px-6 rounded-lg overflow-hidden">
                  <div className="text-[14px]">{analysedData.jobDescription.description}</div>
                </div>
                <div className="absolute w-full left-0 bottom-0 h-15 bg-linear-to-t from-base-200 via-base-200/65 to-base-200/0"></div>
                <div className="divider w-full absolute left-0 -bottom-5">
                  <div 
                    className="px-5 py-3 rounded-full btn btn-soft"
                    onClick={()=>document.getElementById('jobDesModal').showModal()}
                  >
                    Read more
                  </div>
                  <JobDescriptionDialog jobDescription={analysedData.jobDescription}/>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Analysed result report section */}
        {
          analysedData.result
          ?
            <AnalysedReport analysedData={analysedData.result} />
          :
            <button onClick={generateResult} disabled={isGenerating} type="button" className="btn btn-accent btn-soft btn-lg hover:bg-accent/60 shadow-none text-shadow-none mx-auto my-0 px-10 py-6 rounded-lg relative">
              {
                !isGenerating
                ?
                  <div className="flex items-center justify-center gap-2 w-full">
                    <Sparkles className="size-5"/>
                    <p className="text-semibold">Generate Report</p>
                    <span className="size-3 rounded-full bg-secondary absolute -top-1 -right-1"></span>
                    <span className="size-3 rounded-full bg-secondary absolute -top-1 -right-1 animate-ping"></span>
                  </div>
                :
                  <div className="flex items-center justify-center gap-2 w-full">
                    <span className="loading loading-spinner loading-lg"></span>
                    <p className="text-semibold text-accent-content/15 skeleton skeleton-text">AI is thinking...</p>
                  </div>
              }
            </button>
        }

      </div>

      {/* Caution text */}
      <div className="mx-auto my-0 pb-3 flex gap-1 items-center justify-center">
        <TriangleAlert className="size-3.5"/>
        <span className="text-xs">AI can make mistakes, so double-check it.</span>
      </div>

    </section>
  )
}

export default AnalysisResult