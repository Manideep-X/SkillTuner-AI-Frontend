import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"
import z from "zod"
import EmailInput from "../components/authentication/EmailInput";
import PasswordInput from "../components/authentication/PasswordInput";
import FirstAndLastNameInput from "../components/authentication/FirstAndLastNameInput";
import { toast } from "sonner";
import ApiClient from "../api/ApiClient";
import ErrorHandling from "../utils/errors/ErrorHandling";
import { ToastStyle } from "../utils/ToastStyle";
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions";

const SignupSchema = z.object({
  firstName: z.string().min(1, "First name can't be empty!"),

  lastName: z.string().min(1, "Last name can't be empty!"),

  email: z.email("This is not a valid email!"),

  password: z
    .string()
    .min(6, "Must be atleast 6 characters long")
    .regex(/[a-z]/, "Must contain alteast one lower character")
    .regex(/[A-Z]/, "Must contain alteast one upper character")
    .regex(/\d/, "Must contain atleast one digit")
    .regex(/[^A-Za-z0-9]/, "Must contain atleast one special character"),
});

const Signup = () => {

  const navigate = useNavigate();

  const methods = useForm({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: { firstName: "", lastName: "", email: "", password: "" }
  });

  const { handleSubmit, formState: { isValid, isDirty, isSubmitting }, reset } = methods;

  const onFormSubmit = async (data) => {
    try {
      // Calling the specific api endpoint for signup
      const { okay, status, message } = await ApiClient(ApiEndpointExtensions.signup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (!okay) {
        // Error response handling
        const result = ErrorHandling(status);
        if (result.toast) {
          result.toast == "error" ? 
            toast.error(message, { toasterId: "global", style: ToastStyle.error }) :
            toast.warning(message, { toasterId: "global", style: ToastStyle.warning });
        }
        if (result.action) {
          navigate(result.action);
        }
      }
      // For success response
      else {
        toast.success("You have successfully created an account!");
        navigate("/signin");
      }

    } catch (e) {
      toast.error("Error occured while trying reaching the server! Try again", { toasterId: "global", style: ToastStyle.error });
    }
  }

  return (
    <>

      {/* Sign up and other texts */}
      <div className="flex flex-row md:flex-col items-center md:items-start justify-center gap-6 p-4 h-full md:px-10 md:py-16 md:pr-0 rounded-l-sm">
        <div className="flex flex-col justify-center md:gap-6 gap-2">
          <div>
            <p className="text-2xl sm:text-3xl md:text-3xl font-extrabold">Start
              <span className="inline bg-linear-to-b from-white via-white via-20% to-[#dea167] bg-clip-text text-transparent"> Tuning </span>
              Your
            </p>
            <p className="text-2xl sm:text-3xl md:text-3xl font-extrabold">Career with AI.  </p>
          </div>
          <p className="text-sm sm:text-lg md:text-lg md:font-semibold">Register with your email ID</p>
          <p className="hidden md:block text-sm font-light mt-10">
            Already have an account? Then
            <Link to="/signin" className="link link-primary px-1">Sign in &#10532;</Link>
          </p>
        </div>
      </div>

      {/* Form field for sign in */}
      <div className="bg-[#212121] flex items-center justify-center overflow-x-auto overflow-y-hidden rounded-r-sm">
        <FormProvider {...methods} >
          <form onSubmit={handleSubmit(onFormSubmit)} className="fieldset w-md px-6">
            <fieldset className="fieldset rounded-box border-base-300">
              <legend className="fieldset-legend text-2xl font-bold">Sign Up</legend>

              <label className="fieldset">
                <span className="label font-semibold text-neutral-content">Full Name</span>
                <FirstAndLastNameInput />
              </label>

              <label className="fieldset">
                <span className="label font-semibold text-neutral-content">Email</span>
                <EmailInput />
              </label>

              <label className="fieldset">
                <span className="label font-semibold text-neutral-content">Password</span>
                <PasswordInput isSignup={true} />
              </label>

              <button 
                className="btn btn-primary mt-4 shadow-none" 
                type="submit"
                disabled={ !isValid || !isDirty || isSubmitting }
              >{
                isSubmitting
                ? <div className="flex gap-2 w-full-h-full">
                    <span className="loading loading-dots loading-md text-accent-content opacity-40"></span>
                    Signing Up...
                  </div>
                : "Sign Up"
              }</button>
              <button className="btn btn-ghost mt-1" onClick={() => reset()} type="reset">Reset</button>

              <p className="text-center md:hidden">
                Already have an account? Then
                <Link to="/signin" className="link link-primary px-1">Sign in &#10532;</Link>
              </p>
            </fieldset>
          </form>
        </FormProvider>
      </div>

    </>
  )
}

export default Signup