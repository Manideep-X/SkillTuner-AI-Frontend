import { useEffect, useState } from "react"
import ApiClient from "../api/ApiClient"
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions"
import ErrorHandling from "../utils/errors/ErrorHandling"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import ListOfAnalysesLoading from "../components/layout/main/ListOfAnalysesLoading"
import { toast } from "sonner"
import { ToastStyle } from "../utils/ToastStyle"

const ListOfAnalyses = () => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [listOfResults, setlistOfResults] = useState([]);
  const { signout } = useAuth();
  const navigate = useNavigate();

  // This function fetches list of analysis of results
  const getList = async () => {

    try {
      const { okay, status, resData, message } = await ApiClient(ApiEndpointExtensions.listOfAnalyses, {});
  
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
  }, [listOfResults]);

  if (isLoading) {
    return <ListOfAnalysesLoading />
  }
  
  return (
    <section className="w-full hover:cursor-auto hover:bg-inherit hover:text-inherit">
      <ul className="menu w-full grow">
        {
          listOfResults.forEach(result => {
            
          });
        }
      </ul>
    </section>
  )
}

export default ListOfAnalyses