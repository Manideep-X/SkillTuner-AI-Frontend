import { ChevronsDownUp, ChevronsUpDown, Cog, House, Sparkles } from "lucide-react"
import logo from "../../../assets/logo.png"
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

const SidebarNav = ({ isOpen, setIsOpen }) => {

    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const { authStatus, userDetails, signout } = useAuth();

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64 overflow-hidden">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
                {/* List item */}
                <li>
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost w-full is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Toggle Sidebar">
                        {/* Sidebar toggle icon */}
                        <img src={logo} alt="logo" className="sm:size-10 size-9"/>
                        <span className="is-drawer-close:hidden">SkillTuner AI</span>
                    </label>
                </li>

                <li>
                    <button onClick={() => setIsMoreOpen(!isMoreOpen)} className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Profile">
                        {/* Home icon */}
                        <div className="">
                            <div className="avatar avatar-placeholder">
                                <div className="bg-neutral text-neutral-content w-12 rounded-full">
                                    <span>PF</span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-center">
                                <span className="is-drawer-close:hidden truncate">Profile Half Name</span>
                                { !isMoreOpen 
                                    ? <div className="flex flex-col items-center">
                                        <span className="is-drawer-close:hidden truncate">Profile Email Address</span>
                                      </div> 
                                    : ''
                                }
                            </div>
                            <span className="is-drawer-close:hidden">{
                                isMoreOpen
                                ? <ChevronsDownUp />
                                : <ChevronsUpDown />
                            }</span>
                        </div>
                        <ul className="flex is-drawer-close:hidden">
                            <li>
                                Lorem ipsum dolor sit.
                            </li>
                        </ul>
                    </button>
                </li>

                <li>
                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Dashboard">
                        {/* Home icon */}
                        <House />
                        <span className="is-drawer-close:hidden">Dashboard</span>
                    </button>
                </li>

                <li>
                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="New Analysis">
                        {/* Home icon */}
                        <Sparkles />
                        <span className="is-drawer-close:hidden">New Analysis</span>
                    </button>
                </li>

                <li>
                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Settings">
                        {/* Settings icon */}
                        <Cog />
                        <span className="is-drawer-close:hidden">Settings</span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SidebarNav