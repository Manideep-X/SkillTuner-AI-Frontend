import { useEffect, useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom"
import ApiClient from "../api/ApiClient";
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions";
import ErrorHandling from "../utils/errors/ErrorHandling";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";
import { ToastStyle } from "../utils/ToastStyle";
import DashboardLoading from "../components/layout/main/DashboardLoading";

const Dashboard = () => {

  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { setTitle } = useOutletContext();
  const { signout } = useAuth();
  const navigate = useNavigate();

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
  }, []);

  useEffect(() => {
    setTitle("Dashboard");
    return () => setTitle("");
  }, [setTitle]);

  if (isLoading) {
    return <DashboardLoading />
  }

  return (
    <div>{JSON.stringify(resumeList)}</div>
  )
}

export default Dashboard