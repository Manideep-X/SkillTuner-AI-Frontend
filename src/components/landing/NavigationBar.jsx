import { Compass, Phone, Sparkles, TextAlignEnd } from "lucide-react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"

const NavigationBar = () => {
  return (
    <nav className="w-full fixed bg-transparent text-accent-content z-30">
      <div className="navbar justify-center bg-transparent shadow-xl/30 backdrop-blur-[6px]">
        <div className="navbar-start">

          {/* SkillTuner AI logo */}
          <a href="/" className="btn btn-link text-accent-content no-underline text-xl">
            <img src={logo} alt="logo" className="lg:size-10 md:size-9 size-8" />
            <span className="flex items-center gap-2 text-xl sm:text-2xl font-bold">
              SkillTuner
              <div className="flex gap-0.5 items-center badge badge-soft badge-accent px-2 py-3.5">
                <p className="font-black md:text-sm text-xs">AI</p>
                <Sparkles fill="#f6b273" stroke="#f6b273" className="size-3 md:size-4 lg:size-4.5" />
              </div>
            </span>
          </a>

        </div>
        
        <div className="navbar-end gap-4">

          {/* Navigation menus for larger display */}
          <ul className="menu menu-horizontal px-1 hidden lg:flex font-semibold">
            <li><a href="#how-to-use-it">How to use it?</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#contacts">Contacts</a></li>
          </ul>
          
          {/* Button for "Get Started" */}
          <Link to="/signin" className="btn btn-accent text-base-100 text-[15px] font-semibold shadow-none text-shadow-none rounded-full md:flex hidden px-6 py-4.5">Get Started</Link>

          {/* Dropdown for smaller display */}
          <div className="dropdown dropdown-end">

            {/* Dropdown button */}
            <div tabIndex={0} role="button" className="btn btn-square btn-ghost lg:hidden">
              <TextAlignEnd className="size-6"/>
            </div>

            {/* Dropdown list */}
            <ul
              tabIndex="-1"
              className="menu menu-md dropdown-content bg-[#212121] font-semibold rounded-lg z-1 mt-3 w-52 p-2 shadow-lg/50"
            >
              <li><a href="#how-to-use-it" className="flex items-center gap-2">
                <Compass className="size-4.5 text-secondary"/>
                <p>How to use it?</p>
              </a></li>
              <li><a href="#features" className="flex items-center gap-2">
                <Sparkles className="size-4.5 text-secondary"/>
                <p>Features</p>
              </a></li>
              <li><a href="#contacts" className="flex items-center gap-2">
                <Phone className="size-4.5 text-secondary"/>
                <p>Contacts</p>
              </a></li>
            </ul>
            
          </div>

        </div>
      </div>
    </nav>
  )
}

export default NavigationBar