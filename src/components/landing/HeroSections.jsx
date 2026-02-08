import { Cog } from "lucide-react"
import { Link } from "react-router-dom"

const TopHeroSection = () => {
  return (
    <section>
      <div className="hero min-h-screen bg-linear-to-b from-black via-base-300 via-50% to-[#212121]">
        <div className="hero-content text-center">
          <div className="max-w-2xl">

            {/* Top hero title */}
            <h1 className="text-5xl sm:text-6xl font-bold">
              <div className="flex flex-col items-center justify-center">
                <span className="flex items-center justify-center">
                  <div className="relative flex h-18 w-22 text-accent">
                    <Cog strokeWidth={2.5} className="size-14 animate-[spin_7s_linear_infinite]"/>
                    <div className="rotate-x-180 absolute right-0.5 -bottom-0.5">
                      <Cog strokeWidth={2.5} className="size-10 animate-[spin_5s_linear_infinite]"/>
                    </div>
                    <div className="rotate-x-180 absolute right-1 top-0">
                      <Cog strokeWidth={2.5} className="size-8 animate-[spin_3.5s_linear_infinite]"/>
                    </div>
                  </div>
                  <p className="bg-linear-to-b from-[#dea167] via-[#dea167] sm:via-60% via-50% to-white bg-clip-text text-transparent">Tune Your</p>
                </span>
                <p className="bg-linear-to-t from-white via-white sm:via-20% via-30% to-[#dea167] bg-clip-text text-transparent">Career with AI</p>
              </div>
            </h1>

            {/* Top hero text */}
            <div className="py-6 text-white sm:text-[16px] text-sm">
              <i className="text-base-content">SkillTuner AI</i> 
              <p className="sm:inline hidden"> analyse your resume with the job description to increase your chance of getting selected</p> <p className="sm:hidden inline"> analyse your resume with the job description to increase your chance of selection</p>
            </div>
            <div className="flex flex-wrap sm:flex-row flex-col items-center justify-center gap-3">
              <Link to="/signin" className="btn btn-accent text-base-100 sm:text-[15px] text-xs sm:px-7 px-9 py-5 font-bold shadow-md/60 hover:shadow-none transition-all text-shadow-none rounded-full">Upload Resume</Link>
              <a href="#how-to-use-it" className="btn btn-soft border sm:border-accent/50 border-accent/20 text-accent sm:text-[15px] text-xs sm:px-7 px-9 py-5 font-bold shadow-md/60 hover:shadow-none transition-all text-shadow-none rounded-full">See how to use it</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const LastHeroSection = () => {
  return (
    <section className="border-t border-accent-content/10">
      <div className="hero bg-[#212121] text-accent-content">
        <div className="hero-content text-center py-36">
          <div className="max-w-xl">

            {/* Text for bottom hero */}
            <h1 className="sm:text-[36px] text-3xl font-bold"><p className="inline bg-linear-to-t from-[#dea167] via-[#dea167] via-0% to-white bg-clip-text text-transparent">SkillTuner AI</p> will handle it!</h1>
            <p className="py-6 sm:text-[15px] text-[14px]">
              Let <i className="text-base-content">SkillTuner AI</i> handle the guesswork and refinement from your job search
            </p>

            {/* Button for bottom hero */}
            <Link to="/signin" className="btn btn-accent text-base-100 text-[15px] px-7 py-5 font-bold shadow-md/60 hover:shadow-none transition-all text-shadow-none rounded-full">Get Started</Link>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export { TopHeroSection, LastHeroSection }