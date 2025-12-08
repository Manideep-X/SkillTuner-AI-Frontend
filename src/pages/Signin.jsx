import logo from "../assets/logo.png"
import { Link } from "react-router-dom"
import PasswordInput from "../components/authentication/PasswordInput"
import EmailInput from "../components/authentication/EmailInput"

const Signin = () => {
  return (
    <section className="relative flex h-screen justify-center items-center text-secondary-content
                        bg-linear-to-b from-transparent via-transparent via-70% to-[#f2c08a21]
                        ">

      {/* SkillTuner AI logo */}
      <div className="absolute top-0 left-0 flex gap-3 p-4 items-center justify-center">
        <img src={logo} alt="logo" className="sm:size-10 size-9" />
        <p className="text-xl sm:text-2xl font-bold">SkillTuner AI</p>
      </div>
      
      {/* the box container */}
      <div className="grid md:grid-cols-2 justify-center w-full md:w-11/12 lg:w-2/3 h-5/6 md:h-4/5 lg:h-3/4 border border-[#31393b] bg-[#1a1a1a] rounded-sm shadow-xl">

        {/* Sign in and other texts */}
        <div className="flex flex-row md:flex-col items-center md:items-start justify-center gap-6 p-4 h-full md:px-10 md:py-16 md:pr-0 rounded-l-sm">
          <div className="flex flex-col justify-center md:gap-6 gap-2">
            <div className="">
              <p className="text-2xl sm:text-3xl md:text-3xl font-extrabold">Continue Your</p>
              <p className="text-2xl sm:text-3xl md:text-3xl font-extrabold">Career Tuning Journey</p>
            </div>
            <p className="text-sm sm:text-lg md:text-lg md:font-semibold">Use your registered email</p>
            <p className="hidden md:block text-sm font-light mt-8">
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
        
      </div>
    </section>
  )
}

export default Signin