import { useState } from "react";
import { howItWorkTexts } from "../../utils/HowItWorkTexts";
import PCscreenshootDefault from "../../assets/PCscreenshootDefault.png"
import PCscreenshoot1 from "../../assets/PCscreenshoot1.png"
import PCscreenshoot2 from "../../assets/PCscreenshoot2.png"
import PCscreenshoot3 from "../../assets/PCscreenshoot3.png"
import MOBILEscreenshoot1 from "../../assets/MOBILEscreenshoot1.png"
import MOBILEscreenshoot2 from "../../assets/MOBILEscreenshoot2.png"
import MOBILEscreenshoot3 from "../../assets/MOBILEscreenshoot3.png"
import { ChevronsUpDown } from "lucide-react";
import { AppURL } from "../../utils/AppURL";

const HowItWorks = () => {

  const [ishovering, setIshovering] = useState({ first: false, second: false, third: false });

  return (
    <section id="how-to-use-it" className="flex items-center justify-center bg-linear-to-t from-base-100 via-base-100 via-90% to-[#212121] text-accent-content">
      <div className="flex flex-col px-5 py-24">

        {/* Heading and para */}
        <h1 className="sm:text-[36px] text-3xl font-bold text-accent-content pl-12">{howItWorkTexts.title}</h1>
        <h1 className="sm:text-[15px] text-[14px] text-base-content pl-12">{howItWorkTexts.para}</h1>

        {/* Steps */}
        <div className="flex gap-3 justify-center items-center">

          {/* List of steps */}
          <ul className="steps steps-vertical flex flex-col justify-center transition-all px-5 py-3 text-secondary">
            <li className={`step ${ishovering.first ? "step-primary font-black" : ""} transition-all`} onMouseEnter={() => setIshovering(prevHover => ({ ...prevHover, first: true }))} onMouseLeave={() => setIshovering(prevHover => ({ ...prevHover, first: false }))}>

              {/* Step 1 */}
              <div className={`collapse rounded-xl ${ishovering.first ? "bg-accent-content/5" : ""} w-full transition-all`}>
                <input type="checkbox" />
                <div className="collapse-title flex flex-col">
                  <p className={`text-left text-[20px] text-accent-content ${ishovering.first ? "font-black" : "font-medium"} transition-all`}>{howItWorkTexts.step1Title} <ChevronsUpDown className="inline size-5 lg:hidden"/> </p>
                  <p className="pl-1 grow text-left sm:text-sm text-[13px] font-medium">&gt; {howItWorkTexts.step1Para}</p>
                </div>
                <div className="collapse-content flex items-center justify-center lg:hidden">
                  <img src={MOBILEscreenshoot1} alt="mobile screenshot" className="flex sm:w-60 w-50 sm:rounded-xl rounded-2xl border-4 border-accent-content/10 shadow-md/30" />
                </div>
              </div>

            </li>
            <li className={`step ${ishovering.second ? "step-primary font-black" : ""} transition-all`} onMouseEnter={() => setIshovering(prevHover => ({ ...prevHover, second: true }))} onMouseLeave={() => setIshovering(prevHover => ({ ...prevHover, second: false }))}>

              {/* Step 2 */}
              <div className={`collapse rounded-xl ${ishovering.second ? "bg-accent-content/5" : ""} w-full transition-all`}>
                <input type="checkbox" />
                <div className="collapse-title flex flex-col">
                  <p className={`text-left text-[20px] text-accent-content ${ishovering.second ? "font-black" : "font-medium"} transition-all`}>{howItWorkTexts.step2Title} <ChevronsUpDown className="inline size-5 lg:hidden"/> </p>
                  <p className="pl-1 grow text-left sm:text-sm text-[13px] font-medium">&gt; {howItWorkTexts.step2Para}</p>
                </div>
                <div className="collapse-content flex items-center justify-center lg:hidden">
                  <img src={MOBILEscreenshoot2} alt="mobile screenshot" className="flex sm:w-60 w-50 sm:rounded-xl rounded-2xl border-4 border-accent-content/10 shadow-md/30" />
                </div>
              </div>

            </li>
            <li className={`step ${ishovering.third ? "step-primary font-black" : ""} transition-all`} onMouseEnter={() => setIshovering(prevHover => ({ ...prevHover, third: true }))} onMouseLeave={() => setIshovering(prevHover => ({ ...prevHover, third: false }))}>

              {/* Step 3 */}
              <div className={`collapse rounded-xl ${ishovering.third ? "bg-accent-content/5" : ""} w-full transition-all`}>
                <input type="checkbox" />
                <div className="collapse-title flex flex-col">
                  <p className={`text-left text-[20px] text-accent-content ${ishovering.third ? "font-black" : "font-medium"} transition-all`}>{howItWorkTexts.step3Title} <ChevronsUpDown className="inline size-5 lg:hidden"/> </p>
                  <p className="pl-1 text-left sm:text-sm text-[13px] font-medium">&gt; {howItWorkTexts.step3Para1}</p>
                  <p className="pl-1 grow text-left sm:text-sm text-[13px] font-medium">&gt; {howItWorkTexts.step3Para2}</p>
                </div>
                <div className="collapse-content flex items-center justify-center lg:hidden">
                  <img src={MOBILEscreenshoot3} alt="mobile screenshot" className="flex sm:w-60 w-50 sm:rounded-xl rounded-2xl border-4 border-accent-content/10 shadow-md/30" />
                </div>

              </div>
            </li>
          </ul>

          {/* Dynamic screenshot */}
          <div className="mockup-browser border-2 border-accent-content/10 bg-base-300 shadow-lg/60 h-fit rounded-lg my-auto hidden lg:block">
            <div className="mockup-browser-toolbar">
              <div className="input">{AppURL}</div>
            </div>
            <div className="grid place-content-center max-w-2xl">
              <div className="grow max-w-2xl items-center justify-center">
                <img 
                  src={ ishovering.third ? PCscreenshoot3 : 
                    (ishovering.second ? PCscreenshoot2 : 
                      (ishovering.first ? PCscreenshoot1 : PCscreenshootDefault))
                  } 
                  alt="desktop screnshoot" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default HowItWorks