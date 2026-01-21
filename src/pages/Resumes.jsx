import { useEffect, useState } from "react";
import ApiClient from "../api/ApiClient";
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions";
import { toast } from "sonner";
import { ToastStyle } from "../utils/ToastStyle";
import ErrorHandling from "../utils/errors/ErrorHandling";
import { useNavigate } from "react-router-dom";
import SettingsSectionLoading from "../components/layout/settings/SettingsSectionLoading";
import { fileSizeFormatter } from "../utils/FileSizeFormatter";
import { FileCog, FileTypeCorner, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resumeFormSchema } from "../utils/ResumeFormSchema";
import ResumeFormFields from "../components/resume/ResumeFormFields";
import { useAuth } from "../contexts/AuthContext";

const Resumes = () => {

  const [resumes, setResumes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { authStatus, signout } = useAuth();

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
        if (result.action)
          navigate(result.action);
      }
      else setResumes(resData);
    } catch (e) {
      toast.error("Error occured while fetching list of resumes!", { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsLoading(false);
    }
  }

  const onDelete = async (id) => {
    setIsDeleting(true);
    try {
      await ApiClient(`${ApiEndpointExtensions.listOfResumes}/${id}`, {
        method: "DELETE"
      });
      toast.success("Resume deleted successfully!", { toasterId: "global", style: ToastStyle.success });
      getResumes();
    } catch (e) {
      toast.error(`Error occured while deleting a resume!`, { toasterId: "global", style: ToastStyle.error });
    } finally {
      setIsDeleting(false);
    }
  }

  const methods = useForm({
    resolver: zodResolver(resumeFormSchema),
    mode: "onChange",
    defaultValues: { resumeTitle: "", resumeFile: [] }
  });

  const { handleSubmit, formState: { isValid, isDirty, isSubmitting }, reset } = methods;

  const onFormSubmit = async (data) => {

    const formData = new FormData();
    formData.append("resumeTitle", data.resumeTitle);
    formData.append("resumeFile", data.resumeFile[0]);

    try {
      const { okay, status, message } = await ApiClient(ApiEndpointExtensions.listOfResumes, {
        method: "POST",
        // Not setting content type manually as browser will it correctly
        // headers: {
        //   "Content-Type": "multipart/form-data"
        // },
        body: formData
      });
      if (!okay) {
        const result = ErrorHandling(status, signout);
        if (result.toast) {
          result.toast === "error"
            ? toast.error(message, { toasterId: "global", style: ToastStyle.error })
            : toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
      }
      else
        toast.success("The resume is successfully added!", { toasterId: "global", style: ToastStyle.success });
    } catch (e) {
      toast.error("Error occured while trying to save the resume!", { toasterId: "global", style: ToastStyle.error });
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
    <section className="m-2">

      {/* Title of resume section */}
      <div className="px-1 pb-3 pt-2">
        <h2 className="max-w-72 truncate sm:text-xl text-lg font-bold">Add a new resume</h2>
      </div>

      {/* Form for adding a new resume */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFormSubmit)} className="fieldset w-full px-6 bg-base-200 rounded-lg">
          <fieldset className="fieldset rounded-box border-base-300 px-7 py-3">

            <ResumeFormFields />

            <button 
              className="btn btn-primary mt-4 shadow-none" 
              type="submit"
              disabled={ !isValid || !isDirty || isSubmitting }
            >{
              isSubmitting
              ? <div className="flex gap-2 w-full-h-full">
                  <span className="loading loading-spinner loading-md text-accent-content opacity-40"></span>
                  Adding...
                </div>
              : "Add resume"
            }</button>
            <button className="btn btn-ghost mt-1 text-white" onClick={() => reset()} type="reset">Reset</button>

          </fieldset>
        </form>
      </FormProvider>

      {/* List of resumes along with preview and delete options */}
      <div className="px-1 pb-3 pt-4">
        <h2 className="max-w-72 truncate sm:text-xl text-lg font-bold">Update saved resumes</h2>
      </div>
      {
        resumes.map(resume => (
          <div id={resume.id} key={resume.id} className="collapse collapse-arrow bg-base-100 border border-base-300 rounded-lg">
            <input type="radio" name="my-accordion-2" />
            <div className="flex items-center gap-4 collapse-title font-semibold">
              <div className="text-4xl font-thin opacity-30 tabular-nums">{resume.id}</div>
              <div className="list-col-grow text-lg text-white">
                <div>{resume.resumeTitle}</div>
                <div className="text-xs font-semibold opacity-60 flex gap-1 items-center">
                  <FileCog className="size-4.5" />
                  <p className="max-w-48 truncate">
                    Resume Size: {fileSizeFormatter(resume.fileSizeInBytes)}
                  </p>
                </div>
              </div>
            </div>
            <div className="collapse-content text-sm flex items-center justify-center gap-6 bg-base-300/50 pt-2 px-6">
              <div className="flex flex-col bg-base-content/10 w-fit h-full items-center gap-1 py-5 px-10 rounded-lg">
                <p className="max-w-38 truncate text-white font-bold ">
                  File Extension
                </p>
                <div className="flex items-center gap-1 opacity-80">
                  <FileTypeCorner />
                  <p className="uppercase text-2xl font-thin tabular-nums">{resume.resumeExtension}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-col grow">
                <a href={resume.resumeUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1 btn btn-primary btn-soft btn-block border border-primary/40 p-5 shadow-none text-shadow-none ${isDeleting ? 'btn-disabled' : ''} `}>
                  <SquareArrowOutUpRight className="size-4.5" />
                  <p className="max-w-22 truncate">
                    Preview
                  </p>
                </a>
                <button onClick={() => onDelete(resume.id)} type="button" className={`flex items-center gap-1 btn btn-error btn-soft btn-block border border-error/40 p-5 shadow-none text-shadow-none ${isDeleting ? 'btn-disabled' : ''} `}>
                  <Trash2 className="size-4.5" />
                  <p className="max-w-22 truncate">
                    Delete
                  </p>
                </button>
              </div>
            </div>
          </div>
        ))
      }

    </section>
  )
}

export default Resumes