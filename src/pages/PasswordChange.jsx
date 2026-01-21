import { FormProvider, useForm } from "react-hook-form";
import { ChangePassFormSchema } from "../utils/ChangePassFormSchema";
import ApiClient from "../api/ApiClient";
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions";
import ErrorHandling from "../utils/errors/ErrorHandling";
import { ToastStyle } from "../utils/ToastStyle";
import { toast } from "sonner";
import UpdatePassFormFields from "../components/layout/settings/UpdatePassFormFields";
import { zodResolver } from "@hookform/resolvers/zod";

const PasswordChange = () => {

  const methods = useForm({
    resolver: zodResolver(ChangePassFormSchema),
    mode: "onChange",
    defaultValues: { existingPassword: "", newPassword: "", repeatNewPassword: "" }
  });

  const { handleSubmit, formState: { isValid, isDirty, isSubmitting }, reset } = methods;

  const onFormSubmit = async (data) => {
    try {
      const { okay, status, message } = await ApiClient(ApiEndpointExtensions.settings.updatePassword, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!okay) {
        const result = ErrorHandling(status);
        if (result.toast) {
          result.toast == "error" ? 
            toast.error(message, { toasterId: "global", style: ToastStyle.error }) :
            toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
      }
      else {
        toast.success("Password is successfully updated!", { toasterId: "global", style: ToastStyle.success });
      }
    } catch (e) {
      toast.error("Error occured while trying to update password!", { toasterId: "global", style: ToastStyle.error });
    }
  }

  return (
    <section className="m-2">

      {/* Title of updating password section */}
      <div className="px-1 pb-3 pt-2">
        <h2 className="max-w-72 truncate sm:text-xl text-lg font-bold">Update your password</h2>
      </div>

      {/* Form for updating user's password */}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onFormSubmit)} className="fieldset w-full px-6 bg-base-200 rounded-lg">
          <fieldset className="fieldset rounded-box border-base-300 px-7 py-3">

            <UpdatePassFormFields />

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
              : "Update Password"
            }</button>
            <button className="btn btn-ghost mt-1 text-white" onClick={() => reset()} type="reset">Reset</button>

          </fieldset>
        </form>
      </FormProvider>

    </section>
  )
}

export default PasswordChange