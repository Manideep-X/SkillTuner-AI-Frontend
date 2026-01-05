import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import AnalysisResultLoading from "../components/analysis result/AnalysisResultLoading"
import ApiClient from "../api/ApiClient";

const AnalysisResult = () => {

  const { resumeId, jdId } = useParams();
  const navigate = useNavigate();
  const [analysedData, setAnalysedData] = useState({});
  const [loading, setLoading] = useState(true);

  const getResume = async () => {
    const { okay, status, resData, message } = await ApiClient(`resumes/${resumeId}`, {});
    
  };
  
  const getJobDescription = async () => {
    const { okay, status, resData, message } = await ApiClient(`resumes/${resumeId}/job-descriptions/${jdId}`, {});
    
  };
  
  const getAnalysisResult = async () => {
    const { okay, status, resData, message } = await ApiClient(`resumes/${resumeId}/job-descriptions/${jdId}/analysis-result`, {});
    
  };

  useEffect(() => {
    getResume();
    getJobDescription();
    getAnalysisResult();
  }, [resumeId, jdId]);

  if (loading) {
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