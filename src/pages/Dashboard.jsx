import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import ApiClient from "../api/ApiClient";
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions";
import ErrorHandling from "../utils/errors/ErrorHandling";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { ToastStyle } from "../utils/ToastStyle";
import DashboardLoading from "../components/layout/main/DashboardLoading";
import { welcomeText } from "../utils/WelcomeText";
import { FilePlusCorner, FileText, FileUp, FileUser, Plus, Settings, SquareArrowOutUpRight, TriangleAlert } from "lucide-react";
import { fileSizeFormatter } from "../utils/FileSizeFormatter";
import BrowserTabTitle from "../utils/BrowserTabTitle"
import { useHomeListRefresh } from "../contexts/HomeListReloadContext";

const Dashboard = () => {

  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setTitle } = useOutletContext();
  const { userDetails, signout } = useAuth();
  const navigate = useNavigate();
  const { homeListReload } = useHomeListRefresh();

  const getResumeList = async () => {
    const { okay, status, resData, message } = await ApiClient(ApiEndpointExtensions.listOfResumes, {});
    try {
      if (!okay) {
        const result = ErrorHandling(status, signout);
        if (result.toast) {
          result.toast === "error"
            ? toast.error(message, { toasterId: "global", style: ToastStyle.error })
            : toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
        if (result.action)
          navigate(result.action);
      }
      else setResumeList(resData);
    } catch (e) {
      toast.error("Error occured while fetching list of resumes!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getResumeList();
    return () => setIsLoading(true);
  }, [homeListReload]);

  useEffect(() => {
    setTitle("Dashboard");
    return () => setTitle("");
  }, [setTitle]);

  if (isLoading) {
    return <DashboardLoading />
  }

  return (
    <section className="h-fit">
      <BrowserTabTitle title="Dashboard - SkillTuner AI" />
      <div className="sm:p-4 gap-4 flex flex-col items-center max-w-7xl mx-auto my-0">

        {/* Welcome slogan and text */}
        <div className="items-center w-full flex flex-col px-2 pt-8 pb-5 sm:gap-3 gap-1 ">
          <span className="sm:text-4xl text-3xl font-black w-full sm:text-left text-center bg-linear-to-t from-[#dea16787] via-[#dea16787] via-10% to-[#f9d2ad] bg-clip-text text-transparent">
            {welcomeText.greetings} 
            <p className="capitalize inline px-1">
              {userDetails.firstName}
            </p>
          </span>
          <span className="sm:text-xl sm:pl-1 font-bold w-full sm:text-left text-center">{resumeList.length > 0 ? welcomeText.followUpText : welcomeText.noResumeFollowUp}</span>
        </div>

        {/* Cards of all resumes, or text to add new one */}
        {
          resumeList.length > 0
          ?
          <div className="justify-center w-full flex flex-col sm:px-3">

            {/* Button to add new analysis details */}
            <button 
              onClick={() => window.location.hash = "#analysis"} 
              type="button"
              className="btn text-white w-fit h-fit mb-10 mx-auto sm:mx-0 btn-lg border-none bg-linear-to-t from-[#dea16787] via-[#dea16787] via-0% to-[#dea167] transition-all hover:bg-accent/50 shadow-xl/60 shadow-base-300 text-shadow-sm/10 flex items-center justify-center gap-2 text-lg px-4 py-3 rounded-lg"
            >
              <Settings className="text-accent-content size-7 animate-[spin_4.5s_linear_infinite]"/>
              Add new Analysis details
            </button>

            {/* Resume container for title and all resumes */}
            <div className="flex gap-1 items-center w-full py-4 px-2 border-b border-accent-content/10 text-accent-content/45">
              <FileText strokeWidth={1.5} className="sm:size-6 size-5 text-[#808080]"/>
              <span className="text-left tabular-nums uppercase sm:text-lg">Resumes</span>
            </div>
            <div className="flex flex-wrap items-center justify-normal gap-5 p-5 w-full">
              {
                resumeList.map(resume => (
                  <div key={resume.id} id={resume.id} className="relative border sm:p-3 p-2 rounded-lg bg-accent-content/5 sm:size-52 size-42 border-accent-content/5 flex flex-col items-center shadow-lg/40 shadow-base-300">

                    {/* Extension */}
                    <div className="badge badge-soft px-2 py-3 badge-primary absolute top-4 left-3 font-bold border border-primary capitalize">{resume.resumeExtension}</div>

                    {/* Resume title and size */}
                    <div className="w-full h-3/4 flex flex-col p-1 sm:p-2 overflow-hidden">
                      <div className="grow w-full"></div>
                      <FileUser className="hidden sm:flex my-auto mx-0 mb-1"/>
                      <span className="w-full truncate text-left font-bold">{resume.resumeTitle}</span>
                      <span className="w-full text-left sm:text-sm text-xs font-medium text-accent-content/50">Size: {fileSizeFormatter(resume.fileSizeInBytes)}</span>
                    </div>

                    {/* Preview button */}
                    <div className="w-full h-1/4 border-t border-accent-content/5">
                      <a href={resume.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-soft btn-accent shadow-none text-shadow-sm/10 border-accent flex items-center gap-3 p-2 mx-auto my-0 sm:mx-0 sm:my-2">
                        Open Preview
                        <SquareArrowOutUpRight className="size-5"/>
                      </a>
                    </div>
                  </div>
                ))
              }

              {/* Add new resume box */}
              <div onClick={() => window.location.hash = "#settings/resumes"} className="border-2 border-dashed sm:p-3 p-1 rounded-lg bg-accent-content/3 sm:size-52 size-42 border-accent-content/20 flex items-center justify-center shadow-lg/40 shadow-base-300 hover:cursor-pointer hover:bg-accent-content/5 transition-all hover:border-accent-content/10">
                <Plus className="p-3 size-15 rounded-full bg-accent-content/5 opacity-50 border hover:rotate-90 transition-all border-accent-content/10"/>
              </div>

            </div>
          </div>
          :

          // If no resumes are available, or for newly registered user
          <div className="max-w-4xl self-start flex flex-col gap-1 justify-center items-start px-8 sm:px-12 sm:mx-0 mx-5 py-10 border border-accent-content/10 rounded-xl bg-accent-content/5 shadow-xl/35">

            {/* Box button for opening resumes settings */}
            <div 
              onClick={() => window.location.hash = "#settings/resumes"} 
              className="text-secondary p-6 mb-4 rounded-full bg-secondary/10 shadow-lg/25 shadow-base-300 transition-all hover:bg-secondary/15 hover:shadow-lg/60 hover:cursor-pointer hover:animate-pulse"
            >
              <FileUp className="size-8"/>
            </div>
            <h1 className="text-2xl font-bold text-base-content">Upload your resume first</h1>

            {/* Warning text */}
            <p className="text-sm font-medium text-left">
              <TriangleAlert className="inline size-4.5 pr-1"/>
              Job description can only be added and use for analysis if atleast one resume is available.</p>

            {/* Button to open resume settings */}
            <button 
              type="button" 
              onClick={() => window.location.hash = "#settings/resumes"} 
              className="btn btn-accent flex gap-2 shadow-lg/60 active:shadow-lg/0 shadow-base-300 items-center justify-center mt-4 text-base-200 px-7 py-5 rounded-lg"
            >
              <FilePlusCorner strokeWidth={2.5} className="size-5"/>
              <p className="font-black">Add Resume</p>
            </button>
          </div>
        }
        
      </div>
    </section>
  )
}

export default Dashboard