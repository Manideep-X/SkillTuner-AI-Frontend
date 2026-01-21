import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"
import { Info, LogOut } from "lucide-react";

const SessionSignout = () => {

  const { signout } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    await signout();
    navigate("/signin");
  }

  return (
    <section className="m-2">

      {/* Title of session section */}
      <div className="px-1 pb-3 pt-2">
        <h2 className="max-w-72 truncate sm:text-xl text-lg font-bold">End this session</h2>
      </div>

      {/* Signout button for ending the session */}
      <div className="w-full px-6 py-3 bg-base-200 rounded-lg h-full">
        <div className="flex items-center justify-between p-4 h-full">
          <div className="flex flex-col gap-1">
            <span className="text-white text-xl font-bold">Sign Out</span>
            <span className="text-secondary text-xs flex gap-1 items-center">
              <Info className="size-4" />
              <p className="hidden sm:block">Signing out will end this session</p>
              <p className="block sm:hidden truncate">This will end this session</p>
            </span>
          </div>
          <button type="button" onClick={handleSignout} className="btn btn-error btn-soft px-5 py-6 sm:px-8 sm:py-5 border border-error shadow-none hover:text-white flex gap-2 items-center justify-center text-shadow-none ">
            <LogOut className="size-4.5 font-bold" />
            <span className="text-[15px]">
              Signout
            </span>
          </button>
        </div>
      </div>

    </section>
  )
}

export default SessionSignout