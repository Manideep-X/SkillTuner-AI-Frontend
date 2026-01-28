import { toast } from "sonner";
import ApiClient from "../api/ApiClient";
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions";
import SettingsSectionLoading from "../components/layout/settings/SettingsSectionLoading"
import { useAuth } from "../contexts/AuthContext";
import ErrorHandling from "../utils/errors/ErrorHandling";
import { ToastStyle } from "../utils/ToastStyle";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addNewAnalysisSchema } from "../utils/AddNewAnalysisSchema"
import NoResumeSection from "../components/analysis result/NoResumeSection"
import { useNavigate } from "react-router-dom";

const NewAnalysisDetails = () => {

  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { authStatus, signout } = useAuth();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(addNewAnalysisSchema),
    mode: "onChange",
    defaultValues: { jobTitle: "", companyName: "", description: "", resumeId: "" }
  });

  const { handleSubmit, register, formState: { isValid, isDirty, isSubmitting, errors, dirtyFields }, reset } = methods;

  const onFormSubmit = async (data, e) => {

    // extracting the name of the submit button
    const toGenerate = e.nativeEvent.submitter?.name === "addAndGenerate" ? true : false;
    
    // Adding the job description
    let submittedIDs = { resId: null, jdId: null };
    const { resumeId, ...formData } = data;
    try {
      const { okay, status, resData, message } = await ApiClient(`${ApiEndpointExtensions.listOfResumes}/${resumeId}/job-descriptions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!okay) {
        const result = ErrorHandling(status, signout);
        if (result.toast) {
          result.toast == "error" ? 
            toast.error(message, { toasterId: "global", style: ToastStyle.error }) :
            toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
      }
      else if (resData.id && resData.resumeId) {
        submittedIDs.jdId = resData.id;
        submittedIDs.resId = resData.resumeId;
        setIsGenerating(true);
        if (!toGenerate) {
          toast.success("Analysis details are successfully added!", { toasterId: "global", style: ToastStyle.success });
          navigate(`/user/analysis/${submittedIDs.resId}/${submittedIDs.jdId}`);
        }
      }
    } catch (e) {
      toast.error("Error occured while trying to add details!", { toasterId: "global", style: ToastStyle.error });
    }

    // for generating results if user clicked Add and generate
    if (toGenerate) {
      if (submittedIDs.jdId && submittedIDs.resId) {
        setIsGenerating(true);
        try {
          const { okay, status, message } = await ApiClient(`${ApiEndpointExtensions.listOfResumes}/${submittedIDs.resId}/job-descriptions/${submittedIDs.jdId}`, {
            method: "POST"
          });
          if (!okay) {
            const result = ErrorHandling(status, signout);
            if (result.toast) {
              result.toast == "error" ? 
                toast.error(message, { toasterId: "global", style: ToastStyle.error }) :
                toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
            }
            return;
          }
          else {
            toast.success("Analysis report is successfully generated!", { toasterId: "global", style: ToastStyle.success });
            navigate(`/user/analysis/${submittedIDs.resId}/${submittedIDs.jdId}`);
          }
        } catch (e) {
          toast.error("Error occured while trying to generate results!", { toasterId: "global", style: ToastStyle.error });
        } finally {
          setIsGenerating(false);
        }
      }
      else {
        toast.error("Can't find the added details!", { toasterId: "global", style: ToastStyle.error });
      }
    }

  }

  const getResumes = async () => {
    setIsLoading(true);
    try {
      const { okay, status, resData, message } = await ApiClient(ApiEndpointExtensions.listOfResumes, {});
      if (!okay) {
        const result = ErrorHandling(status, signout);
        if (result.toast) {
          result.toast === "error"
            ? toast.error(message, { toasterId: "global", style: ToastStyle.error })
            : toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
      }
      else setResumes(resData);
    } catch (e) {
      toast.error("Error occured while fetching list of resumes!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (authStatus !== "authenticated") return;
    getResumes();
  }, []);

  if (isLoading) {
    return <SettingsSectionLoading />
  }

  return (
    <section className="m-4 bg-base-300/70 py-8 px-10 rounded-lg grow h-fit">
      {
        resumes.length > 0 ?
        <form onSubmit={handleSubmit(onFormSubmit)} className="fieldset w-full h-fit sm:px-4 bg-base-300/0 rounded-lg">
          <fieldset className="fieldset rounded-box border-base-300 md:px-7 sm:px-5 px-0 py-3 h-fit">

            {/* Input field for job title */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-white">Job Title</legend>
              <label className={`input input-md h-12 w-full rounded-lg
                ${errors.jobTitle ? 'input-error' : (dirtyFields.jobTitle ? 'input-success' : '')}
              `}>
                  <input
                    type="text"
                    {...register("jobTitle")}
                    placeholder="Enter job title"
                    title="Enter the job title"
                  />
              </label>
              { errors.jobTitle && <div className="text-error">{errors.jobTitle.message}</div> }
            </fieldset>

            {/* Input field for company name */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-white">Company Name</legend>
              <label className={`input input-md h-12 w-full rounded-lg
                ${errors.companyName ? 'input-error' : (dirtyFields.companyName ? 'input-success' : '')}
              `}>
                  <input
                    type="text"
                    {...register("companyName")}
                    placeholder="Enter company name"
                    title="Enter the company name"
                  />
              </label>
              { errors.companyName && <div className="text-error">{errors.companyName.message}</div> }
            </fieldset>

            {/* Textarea for job description */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-white">Job Description</legend>
              <textarea 
                className={`textarea h-32 w-full rounded-lg
                  ${errors.description ? 'input-error' : (dirtyFields.description ? 'input-success' : '')} 
                `}
                {...register("description")} 
                placeholder="Paste the job description here (min. 40 words)"
              ></textarea>
              { errors.description && <div className="text-error">{errors.description.message}</div> }
            </fieldset>

            {/* Select options for choosing resume */}
            <fieldset className="fieldset w-full">
              <legend className="fieldset-legend text-white">Link a Resume</legend>
              <select 
                defaultValue="Pick a resume"
                {...register("resumeId")} 
                title="select a resume to link" 
                className={`select w-full rounded-lg h-12 ${errors.resumeId ? 'input-error' : (dirtyFields.resumeId ? 'input-success' : '')} `}
              >
                <option value="" disabled={true}>Pick a resume</option>
                {
                  resumes.map(resume => (
                    <option value={resume.id} key={resume.id} id={resume.id} className="text-accent-content">{resume.resumeTitle}</option>
                  ))
                }
              </select>
              { errors.resumeId && <div className="text-error">{errors.resumeId.message}</div> }
            </fieldset>

            {/* All submit and reset buttons */}
            <div className="flex md:flex-row flex-col gap-2 items-center justify-between w-full mt-5 h-fit">
              
              {/* Form reset button */}
              <button 
                className="btn btn-soft mt-1 h-full md:w-fit w-full min-h-12 rounded-lg text-[15px] px-6 text-shadow-none hover:text-accent-content" 
                onClick={() => reset()} 
                type="reset"
                disabled={ isSubmitting || isGenerating }
              >
                Reset
              </button>

              <div className="flex items-center justify-end gap-2 h-fit w-full">
                {/* Add details button */}
                <button 
                  className="btn btn-accent btn-soft shadow-none h-full rounded-lg text-[15px] px-6 text-shadow-none w-[49%] md:w-fit min-h-12" 
                  type="submit"
                  name="add"
                  disabled={ !isValid || !isDirty || isSubmitting || isGenerating }
                >{
                  isSubmitting
                  ? <div className="flex items-center gap-2 w-full h-full">
                      <span className="loading loading-spinner loading-md text-accent-content opacity-40"></span>
                      Adding...
                    </div>
                  : "Add Details"
                }</button>

                {/* Add details and generate result button */}
                <button 
                  className="btn btn-success btn-soft shadow-none h-full text-shadow-none hover:text-accent-content rounded-lg text-[15px] px-6 w-[49%] md:w-fit min-h-12" 
                  type="submit"
                  name="addAndGenerate"
                  disabled={ !isValid || !isDirty || isSubmitting || isGenerating }
                >{
                  (isSubmitting && !isGenerating)
                  ? <div className="flex w-full h-full">
                      <span className="flex items-center gap-1 skeleton skeleton-text text-accent-content/20">
                        &#10024; Adding details...
                      </span>
                    </div>
                  : (
                    isGenerating 
                    ? <div className="flex items-center w-full h-full">
                        <span className="flex items-center gap-1 skeleton skeleton-text text-accent-content/20">
                          &#10024; AI is thinking...
                        </span>
                      </div>
                    : <>&#10024; Add and Generate</>
                  )
                }</button>
              </div>
            </div>

          </fieldset>
        </form>
        :
        <NoResumeSection />
      }
    </section>
  )
}

export default NewAnalysisDetails