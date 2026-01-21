import { useAuth } from "../contexts/AuthContext"
import { FormProvider, useForm } from "react-hook-form"
import { changeNameFormSchema } from "../utils/ChangeNameFormSchema";
import ApiClient from "../api/ApiClient";
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions";
import ErrorHandling from "../utils/errors/ErrorHandling";
import { ToastStyle } from "../utils/ToastStyle";
import { toast } from "sonner";
import UpdateNameFormFields from "../components/layout/settings/UpdateNameFormFields";
import { zodResolver } from "@hookform/resolvers/zod";

const UsernameChange = () => {

  const { userDetails, signout } = useAuth();

  const methods = useForm({
    resolver: zodResolver(changeNameFormSchema),
    mode: "onChange",
    defaultValues: { firstName: userDetails?.firstName || "", lastName: userDetails?.lastName || "" }
  });
  
  const { handleSubmit, formState: { isValid, isDirty, isSubmitting }, reset } = methods;

  const onFormSubmit = async (data) => {
    try {
      const { okay, status, message } = await ApiClient(ApiEndpointExtensions.settings.rename, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      if (!okay) {
        const result = ErrorHandling(status, signout);
        if (result.toast) {
          result.toast == "error" ? 
            toast.error(message, { toasterId: "global", style: ToastStyle.error }) :
            toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
      }
      else {
        toast.success("Name is successfully updated!", { toasterId: "global", style: ToastStyle.success });
      }
    } catch (e) {
      toast.error("Error occured while trying to rename the user!", { toasterId: "global", style: ToastStyle.error });
    }
  }

  return (
    <section className="m-2">

      {/* Title of updating username section */}
      <div className="px-1 pb-3 pt-2">
        <h2 className="max-w-72 truncate sm:text-xl text-lg font-bold">Update your name</h2>
      </div>

      {/* Form for updating user's name */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFormSubmit)} className="fieldset w-full px-6 bg-base-200 rounded-lg">
          <fieldset className="fieldset rounded-box border-base-300 px-7 py-3">

            <UpdateNameFormFields />

            <button 
              className="btn btn-primary mt-4 shadow-none" 
              type="submit"
              disabled={ !isValid || !isDirty || isSubmitting }
            >{
              isSubmitting
              ? <div className="flex gap-2 w-full-h-full">
                  <span className="loading loading-spinner loading-md text-accent-content opacity-40"></span>
                  Updating...
                </div>
              : "Update Name"
            }</button>
            <button className="btn btn-ghost mt-1 text-white" onClick={() => reset()} type="reset">Reset</button>

          </fieldset>
        </form>
      </FormProvider>

    </section>
  )
}

export default UsernameChange