import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import AnalysisResultLoading from "../components/analysis result/AnalysisResultLoading"
import ApiClient from "../api/ApiClient";
import ErrorHandling from "../utils/errors/ErrorHandling";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { ToastStyle } from "../utils/ToastStyle";

const AnalysisResult = () => {

  const { resumeId, jdId } = useParams();
  const navigate = useNavigate();
  const [analysedData, setAnalysedData] = useState({});
  const [isLoading, setIsLoading] = useState({ resume: true, jobDescription: true, result: true });
  const { signout } = useAuth();
  const hasNavigated = useRef(false);

  const getResume = async () => {
    if (hasNavigated.current) return;
    try {
      const { okay, status, resData, message } = await ApiClient(`resumes/${resumeId}`, {});
      console.log(resData);
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
      else setAnalysedData(prevData => ({ ...prevData, ...resData }));
    } catch (e) {
      toast.error("Error occured while fetching resume details!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsLoading(prevLoading => ({ ...prevLoading, resume: false }));
    }
  };
  
  const getJobDescription = async () => {
    if (hasNavigated.current) return;
    try {
      const { okay, status, resData, message } = await ApiClient(`resumes/${resumeId}/job-descriptions/${jdId}`, {});
      console.log(resData);
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
      else setAnalysedData(prevData => ({ ...prevData, ...resData }));
    } catch (e) {
      toast.error("Error occured while fetching job description!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsLoading(prevLoading => ({ ...prevLoading, jobDescription: false }));
    }
  };
  
  const getAnalysisResult = async () => {
    if (hasNavigated.current) return;
    try {
      const { okay, status, resData, message } = await ApiClient(`resumes/${resumeId}/job-descriptions/${jdId}/analysis-result`, {});
      console.log(resData);
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
      else setAnalysedData(prevData => ({ ...prevData, ...resData }));
    } catch (e) {
      toast.error("Error occured while fetching analysed result!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsLoading(prevLoading => ({ ...prevLoading, result: false }));
    }
  };

  useEffect(() => {
    getResume();
    getJobDescription();
    getAnalysisResult();
  }, [resumeId, jdId]);

  if (isLoading.jobDescription || isLoading.resume || isLoading.result) {
    return <AnalysisResultLoading />
  }

  return (
    <div>{JSON.stringify(analysedData)}</div>
  )
}

export default AnalysisResult

// resumes/resumeId/
// resumes/resumeId/job-descriptions/jdId
// resumes/resumeId/job-descriptions/jdId/analysis-result