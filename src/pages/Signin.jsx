import { Link } from "react-router-dom"
import PasswordInput from "../components/authentication/PasswordInput"
import EmailInput from "../components/authentication/EmailInput"

const Signin = () => {
  return (
    <>

      {/* Sign in and other texts */}
      <div className="flex flex-row md:flex-col items-center md:items-start justify-center gap-6 p-4 h-full md:px-10 md:py-16 md:pr-0 rounded-l-sm">
        <div className="flex flex-col justify-center md:gap-6 gap-2">
          <div>
            <p className="text-2xl sm:text-3xl md:text-3xl font-extrabold">Continue Your</p>
            <p className="text-2xl sm:text-3xl md:text-3xl font-extrabold">Career 
              <span className="inline bg-linear-to-b from-white via-white via-20% to-[#dea167] bg-clip-text text-transparent"> Tuning </span> 
              Journey</p>
          </div>
          <p className="text-sm sm:text-lg md:text-lg md:font-semibold">Use your registered email</p>
          <p className="hidden md:block text-sm font-light mt-10">
            Don't have an account? 
            <Link to="/signup" className="link link-primary px-1">Sign up &#10532;</Link>
            first</p>
        </div>
      </div>

      {/* Form field for sign in */}
      <div className="bg-base-200 flex items-center justify-center overflow-x-auto overflow-y-hidden rounded-r-sm">
        <form action="#" method="post" className="fieldset w-md px-6">
          <fieldset className="fieldset rounded-box border-base-300">
            <legend className="fieldset-legend text-2xl font-bold">Sign In</legend>

            <label className="fieldset">
              <span className="label font-semibold text-neutral-content">Email</span>
              <EmailInput />
            </label>

            <label className="fieldset">
              <span className="label font-semibold text-neutral-content">Password</span>
              <PasswordInput />
            </label>

            <button className="btn btn-primary mt-4 shadow-none" type="submit">Sign In</button>
            <button className="btn btn-ghost mt-1" type="reset">Reset</button>

            <p className="text-center md:hidden">
              Don't have an account? 
              <Link to="/signup" className="link link-primary px-1">Sign up &#10532;</Link>
              first
            </p>
          </fieldset>
        </form>
      </div>

    </>
  )
}

export default Signin