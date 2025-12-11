import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"
import z from "zod"

const SignupSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name can't be empty!"),

  lastName: z
    .string()
    .min(1, "Last name can't be empty!"),

  email: z
    .email("This is not a valid email!"),

  password: z
    .string()
    .min(8, "Must be atleast 8 characters long")
    .regex(/[a-z]/, "Must contain alteast one lower character")
    .regex(/[A-Z]/, "Must contain alteast one upper character")
    .regex(/\d/, "Must contain atleast one digit")
    .regex(/[^A-Za-z0-9]/, "Must contain atleast one special character")
});

const Signup = () => {

  const { register, handleSubmit, formState: { errors, isValid, isDirty } } = useForm({
    resolver: zodResolver(SignupSchema),
    mode: "onChange",
    defaultValues: { firstName: "", lastName: "", email: "", password: "" }
  });

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
            <p className="text-2xl sm:text-3xl md:text-3xl font-extrabold">Career with AI</p>
          </div>
          <p className="text-sm sm:text-lg md:text-lg md:font-semibold">Registered with your email</p>
          <p className="hidden md:block text-sm font-light mt-10">
            Already have an account? Then
            <Link to="/signin" className="link link-primary px-1">Sign in &#10532;</Link>
          </p>
        </div>
      </div>

      {/* Form field for sign in */}
      <div className="bg-base-200 flex items-center justify-center overflow-x-auto overflow-y-hidden rounded-r-sm">
        <form onSubmit={handleSubmit(onFormSubmit)} method="post" className="fieldset w-md px-6">
          <fieldset className="fieldset rounded-box border-base-300">
            <legend className="fieldset-legend text-2xl font-bold">Sign In</legend>

            <label className="fieldset">
              <span className="label font-semibold text-neutral-content">Email</span>
              <EmailInput
                registerIO={register}
                error={errors.email}
              />
            </label>

            <label className="fieldset">
              <span className="label font-semibold text-neutral-content">Password</span>
              <PasswordInput
                registerIO={register}
                error={errors.password}
              />
            </label>

            <button 
              className="btn btn-primary mt-4 shadow-none" 
              type="submit"
              disabled={ !isValid || !isDirty }
            >
              Sign In
            </button>
            <button className="btn btn-ghost mt-1" type="reset">Reset</button>

            <p className="text-center md:hidden">
              Already have an account? Then
              <Link to="/signin" className="link link-primary px-1">Sign in &#10532;</Link>
            </p>
          </fieldset>
        </form>
      </div>

    </>
  )
}

export default Signup