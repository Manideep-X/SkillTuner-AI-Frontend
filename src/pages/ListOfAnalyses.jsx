import { useEffect, useMemo, useState } from "react"
import ApiClient from "../api/ApiClient"
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions"
import ErrorHandling from "../utils/errors/ErrorHandling"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import ListOfAnalysesLoading from "../components/layout/main/ListOfAnalysesLoading"
import { toast } from "sonner"
import { ToastStyle } from "../utils/ToastStyle"
import { Building2, CircleFadingArrowUp, EllipsisVertical, FileUser, Trash2 } from "lucide-react"

const ListOfAnalyses = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [listOfResults, setlistOfResults] = useState([]);
  const { signout } = useAuth();
  const navigate = useNavigate();

  // This function fetches list of analysis of results
  const getList = async () => {

    try {
      const { okay, status, resData, message } = await ApiClient(ApiEndpointExtensions.listOfAnalyses, {});
      console.log(resData);
  
      if (!okay) {
        const result = ErrorHandling(status, signout);
        if (result.toast) {
          result.toast == "error"
            ? toast.error(message, { toasterId: "global", style: ToastStyle.error }) 
            : toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
        if (result.action) {
          navigate(result.action);
        }
      }
      else setlistOfResults(resData);

    } catch (e) {
      toast.error("Error occured while fetching analysis details!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsLoading(false);
    }
    
  }
  
  useEffect(() => {
    getList();
  }, []);

  const sortedResults = useMemo(() => {
    return [...listOfResults].sort((a, b) => {
      const dateA = new Date(a.updationTime ?? a.creationTime);
      const dateB = new Date(b.updationTime ?? b.creationTime);
      return dateB - dateA; // newer date first
    })
  }, [listOfResults]);

  if (isLoading) {
    return <ListOfAnalysesLoading />
  }
  
  return (
    <section className="w-full p-0 overflow-y-auto">{
      listOfResults.length > 0 &&
      <ul className="menu w-full grow m-0 p-0">
        {
          sortedResults.map(result => (
            <li 
              key={result.jdId} 
              id={result.jdId} 
              onClick={() => {
                navigate(`/user/analysis/${result.resumeId}/${result.jdId}`);
              }}
            >
              <div className="flex items-center justify-between pl-2 overflow-visible">
                <div>
                  <div className="flex gap-1 w-full items-center">
                    {
                      result.updationTime || 
                      <div className="h-full badge badge-soft badge-error hover:bg-error/15 p-1 rounded-full tooltip tooltip-right tooltip-error" data-tip="Analysis pending">
                        <CircleFadingArrowUp />
                      </div>
                    }
                    <p className="text-left text-lg truncate w-54 text-white font-semibold">
                      {result.jobTitle}
                    </p>
                  </div>
                  <div className="pl-2 pt-1">
                    <span className="flex gap-1 items-center w-56 truncate">
                      <FileUser className="size-5" />
                      <p className="w-56 truncate text-xs">
                        {result.resumeTitle}
                      </p>
                    </span>
                    <span className="flex gap-1 items-center w-56 truncate">
                      <Building2 className="size-5" />
                      <p className="w-56 truncate text-xs">
                        {result.companyName}
                      </p>
                    </span>
                  </div>
                </div>
                
                {/* more option and delete pop-up menu */}
                <div onClick={(e) => e.stopPropagation()} className="relative">
                  <div className="dropdown dropdown-left dropdown-center">
                    <button tabIndex={0} role="button" className="size-8 p-1 rounded-full shadow-none btn btn-soft btn-primary">
                      <EllipsisVertical />
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu absolute z-50 bg-base-100 rounded-box w-52 p-2 shadow-sm">
                      <li>
                        <button type="button" className="flex gap-2">
                          <Trash2 className="p-0.5 text-error" />
                          <p className="truncate">
                            Delete
                          </p>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </li>
          ))
        }
      </ul>
    }</section>
  )
}

export default ListOfAnalyses