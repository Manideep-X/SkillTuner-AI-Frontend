import { ChevronsDownUp, ChevronsUpDown, Cog, FolderTree, House, LogOut, Mail, Sparkles, User } from "lucide-react"
import logo from "../../../assets/logo.png"
import { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import ListOfAnalyses from "../../../pages/ListOfAnalyses";
import { NavLink, useNavigate } from "react-router-dom";

const SidebarNav = ({ isOpen }) => {

    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const { userDetails, signout } = useAuth();
    const navigate = useNavigate();

    const handleSignout = async () => {
        await signout();
        navigate("/signin");
    }

  return (
    <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-18 is-drawer-open:w-84">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
                {/* SkillTuner AI Logo */}
                <li>
                    <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn-square w-full is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Toggle Sidebar">
                        {/* Sidebar toggle icon */}
                        <img src={logo} alt="logo" className="ml-2 sm:size-10 size-9"/>
                        <span className="flex items-center gap-2 is-drawer-close:hidden text-white font-bold text-xl truncate">
                            SkillTuner 
                            <div className="flex gap-0.5 items-center badge badge-soft badge-accent px-2 py-3">
                                <p className="text-sm font-black">AI</p>
                                <Sparkles fill="#f6b273" stroke="#f6b273" className="size-3.5" />
                            </div>
                        </span>
                    </label>
                </li>

                {/* Profile Details */}
                <li className="w-full py-2">
                    <div className={`flex flex-col items-center gap-2 w-full is-drawer-close:tooltip is-drawer-close:tooltip-right hover:cursor-auto rounded-sm ${isOpen ? 'border border-[#2c2927] px-2 pt-2' : 'px-0 py-0'} transition-all`} data-tip={`${userDetails?.firstName} ${userDetails?.lastName}`}>
                        {/* Profile avatar and name */}
                        <button 
                            onClick={() => isOpen && setIsMoreOpen(!isMoreOpen)}
                            className={`flex gap-1 px-1 items-center w-full hover:cursor-pointer rounded-md ${isMoreOpen && 'border border-[#2c2927] py-2 hover:bg-primary/10'} transition-all `}
                        >
                            <div className="avatar avatar-placeholder">
                                <div className="bg-neutral text-neutral-content w-12 rounded-full font-black">
                                    <span>{userDetails?.firstName[0]}{userDetails?.lastName[0]}</span>
                                </div>
                            </div>
                            <div className="is-drawer-close:hidden flex flex-col justify-center grow">
                                <span className={`max-w-48 truncate text-left font-bold transition-all ${isMoreOpen && 'text-[16px]'} `}>
                                    {
                                        isMoreOpen
                                        ? <>Hi, {userDetails?.firstName}</>
                                        : <>{userDetails?.firstName} {userDetails?.lastName}</>
                                    }
                                </span>
                                { !isMoreOpen && 
                                    <span className="max-w-48 truncate text-left text-xs">{userDetails?.email}</span>
                                }
                            </div>
                            <span className="is-drawer-close:hidden block">{
                                isMoreOpen
                                ? <ChevronsDownUp />
                                : <ChevronsUpDown />
                            }</span>
                        </button>
                        {/* Full profile details and more options */}
                        {
                            isMoreOpen &&
                            <ul className="flex flex-col is-drawer-close:hidden w-full gap-2 m-0 px-2 pb-2 border-none">
                                <li className="flex flex-row w-full">
                                    <div className="flex gap-1 w-full hover:cursor-auto hover:bg-inherit">
                                        <User className="size-5" />
                                        <p className="truncate max-w-56">{userDetails?.firstName} {userDetails?.lastName}</p>
                                    </div>
                                </li>
                                <li className="flex flex-row gap-1 w-full">   
                                    <div className="flex gap-1 w-full hover:cursor-auto hover:bg-inherit">
                                        <Mail className="size-5" />
                                        <p className="truncate max-w-56">{userDetails?.email}</p>
                                    </div>                        
                                </li>
                                <li onClick={handleSignout}>
                                    <div className="flex gap-1 btn btn-outline btn-error shadow-none">
                                        <LogOut className="size-5" />
                                        Signout
                                    </div>
                                </li>
                            </ul>
                        }
                    </div>
                </li>

                {/* New analysis option */}
                <li>
                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="New Analysis">
                        {/* New Analysis icon */}
                        <Sparkles className="ml-1 text-accent" />
                        <span className="is-drawer-close:hidden text-white truncate">New Analysis</span>
                    </button>
                </li>

                {/* Dashboard navigation option */}
                <li>
                    <NavLink to="/user/home" className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" data-tip="Dashboard">
                        {/* Dashboard icon */}
                        <House className="ml-1 text-accent" />
                        <span className="is-drawer-close:hidden text-white">Dashboard</span>
                    </NavLink>
                </li>

                {/* Settings option */}
                <li>
                    <button 
                        className="is-drawer-close:tooltip is-drawer-close:tooltip-right py-2" 
                        data-tip="Settings"
                        onClick={() => document.getElementById('settingsModal').showModal()}
                    >
                        {/* Settings icon */}
                        <Cog className="ml-1 text-accent" />
                        <span className="is-drawer-close:hidden text-white">Settings</span>
                    </button>
                </li>

                <li></li>

                {/* List of Analysed results */}
                <li>
                    <div className="flex flex-col gap-0 is-drawer-open:hover:cursor-auto is-drawer-close:hover:cursor-pointer is-drawer-open:hover:text-inherit is-drawer-close:tooltip is-drawer-close:tooltip-right py-2 is-drawer-open:pl-0 is-drawer-open:active:bg-inherit is-drawer-open:active:text-inherit is-drawer-open:focus-visible:bg-inherit is-drawer-open:hover:bg-inherit" data-tip="Analyses List">
                        <label htmlFor="my-drawer-4" aria-label="close sidebar">
                            <FolderTree className="is-drawer-open:hidden border rounded-sm border-accent p-1 size-8 text-primary" />
                        </label>
                        <span className="w-full is-drawer-close:hidden text-primary text-left font-semibold">Analyses List</span>
                        <div className="is-drawer-close:hidden w-full">
                            <ListOfAnalyses />
                        </div>
                    </div>
                </li>

            </ul>
        </div>
    </div>
  )
}

export default SidebarNav