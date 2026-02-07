import { Link, useNavigate } from "react-router-dom"
import PasswordInput from "../components/authentication/PasswordInput"
import EmailInput from "../components/authentication/EmailInput"
import z from "zod"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { ToastStyle } from "../utils/ToastStyle"
import ApiClient from "../api/ApiClient"
import ErrorHandling from "../utils/errors/ErrorHandling"
import { useAuth } from "../contexts/AuthContext"
import { ApiEndpointExtensions } from "../api/ApiEndpointExtensions"
import BrowserTabTitle from "../utils/BrowserTabTitle"

const SigninSchema = z.object({
  
  email: z.email("This is not a valid email!"),
  password: z.string().min(1, "Password can't be empty!"),

});

const Signin = () => {

  const methods = useForm({
    resolver: zodResolver(SigninSchema),
    mode: "onChange",
    defaultValues: { email: "", password: "" }
  });
  const { handleSubmit, formState: { isValid, isDirty, isSubmitting }, reset } = methods;

  const navigate = useNavigate();
  const { signout, signin,  } = useAuth();

  const onFormSubmit = async (data) => {
    try {
      // Calling the specific api endpoint for signup
      const { okay, status, resData, message } = await ApiClient(ApiEndpointExtensions.signin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      
      if (!okay) {
        // Error response handling
        const result = ErrorHandling(status, signout);
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
        signin(resData);
        toast.success("You have successfully signed in!");
      }

    } catch (e) {
      toast.error("Can't reach the server! Try again", { toasterId: "global", style: ToastStyle.error });
    }
  }

  return (
    <>

      <BrowserTabTitle title="Signin - SkillTuner AI" />
      {/* Sign in and other texts */}
      <div className="flex flex-row md:flex-col items-center md:items-start justify-center gap-6 p-4 h-full md:px-10 md:py-16 md:pr-0 rounded-l-sm">
        <div className="flex flex-col justify-center md:gap-6 gap-2">
          <div>
            <p className="text-2xl sm:text-3xl md:text-3xl font-extrabold">Continue Your</p>
            <p className="text-2xl sm:text-3xl md:text-3xl font-extrabold">Career 
              <span className="inline bg-linear-to-b from-white via-white via-20% to-[#dea167] bg-clip-text text-transparent"> Tuning </span> 
              Journey.</p>
          </div>
          <p className="text-sm sm:text-lg md:text-lg md:font-semibold">Use your registered email</p>
          <p className="hidden md:block text-sm font-light mt-10">
            Don't have an account? 
            <Link to="/signup" className="link link-primary px-1">Sign up &#10532;</Link>
            first</p>
        </div>
      </div>

      {/* Form field for sign in */}
      <div className="bg-[#212121] flex items-center justify-center overflow-x-auto overflow-y-hidden rounded-r-sm">
        <FormProvider {...methods} >
          <form onSubmit={handleSubmit(onFormSubmit)} className="fieldset w-md px-6">
            <fieldset className="fieldset rounded-box border-base-300">
              <legend className="fieldset-legend text-2xl font-bold">Sign In</legend>

              <label className="fieldset">
                <span className="label font-semibold text-neutral-content">Email</span>
                <EmailInput />
              </label>

              <label className="fieldset">
                <span className="label font-semibold text-neutral-content">Password</span>
                <PasswordInput isSignup={false} />
              </label>

              <button 
                className="btn btn-primary mt-4 shadow-none" 
                type="submit"
                disabled={ !isValid || !isDirty || isSubmitting }
              >{
                isSubmitting
                ? <div className="flex gap-2 w-full-h-full">
                    <span className="loading loading-dots loading-md text-accent-content opacity-40"></span>
                    Signing In...
                  </div>
                : "Sign In"
              }</button>
              <button className="btn btn-ghost mt-1" onClick={() => reset()} type="reset">Reset</button>

              <p className="text-center md:hidden">
                Don't have an account? 
                <Link to="/signup" className="link link-primary px-1">Sign up &#10532;</Link>
                first
              </p>
            </fieldset>
          </form>
        </FormProvider>
      </div>

    </>
  )
}

export default Signin