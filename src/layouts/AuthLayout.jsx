import { Link, Outlet } from "react-router-dom"
import logo from "../assets/logo.png"

const AuthLayout = () => {
  return (
    <section className="relative flex h-screen justify-center items-center text-secondary-content
                        bg-linear-to-b from-black/80 via-transparent via-50% to-accent/25
                        ">

      {/* SkillTuner AI logo */}
      <div className="absolute top-0 left-0 flex p-4">
        <Link to="/" className="flex no-underline link gap-3 items-center justify-center">
          <img src={logo} alt="logo" className="sm:size-10 size-9" />
          <p className="text-xl sm:text-2xl font-bold">SkillTuner AI</p>
        </Link>
      </div>
      
      {/* the box container */}
      <div className="grid md:grid-cols-2 justify-center w-full md:w-11/12 lg:w-2/3 h-5/6 md:h-4/5 lg:h-3/4 border border-[#31393b] bg-[#1a1a1a] rounded-sm shadow-xl">

        {/* Outlet for signin and signup pages */}
        <Outlet />
        
      </div>
    </section>
  )
}

export default AuthLayout