import { BrainCircuit, Group, MousePointerClick } from "lucide-react"
import { whyToUseItTexts } from "../../utils/WhyToUseItTexts"

const WhyToUseIt = () => {
  return (
    <section id="features">
      <div className="hero bg-linear-to-b from-base-100 via-base-100 via-50% to-[#212121] text-accent-content">
        <div className="hero-content text-center py-20 sm:py-32 md:py-36">
          <div className="max-w-full">

            {/* Title of why to use */}
            <h1 className="sm:text-[36px] text-3xl font-bold">{whyToUseItTexts.title}<p className="inline bg-linear-to-t from-[#dea167] via-[#dea167] via-0% to-white bg-clip-text text-transparent">{whyToUseItTexts.titleHighlight}</p>{whyToUseItTexts.titleRemaining}</h1>

            {/* Para of why to use */}
            <p className="py-6 sm:text-[15px] text-[14px]">
              {whyToUseItTexts.para1}<i className="text-base-content">{whyToUseItTexts.titleHighlight}</i>{whyToUseItTexts.para2}
            </p>

            {/* Cards of features */}
            <div className="flex flex-wrap gap-5 items-center justify-center">

              {/* Feature 1 */}
              <div className="flex flex-col gap-3 px-6 py-10 text-center items-center max-w-88 rounded-xl bg-base-content/5 shadow-xl/40 min-h-64">
                  <span className="text-2xl font-bold text-center gap-2 grow"> <Group className="shrink-0 inline my-auto mx-auto text-accent size-8"/> {whyToUseItTexts.featureTitle1}</span>
                <div className="flex items-center gap-2">
                  
                </div>
                <span className="text-center grow sm:text-sm text-[13px] px-4 text-base-content">{whyToUseItTexts.featurePara1}</span>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col gap-3 px-6 py-10 text-center items-center max-w-88 rounded-xl bg-base-content/5 shadow-xl/40 min-h-64">
                  <span className="text-2xl font-bold text-center gap-2 grow"> <BrainCircuit className="shrink-0 inline my-auto mx-auto text-accent size-8"/> {whyToUseItTexts.featureTitle2}</span>
                <div className="flex items-center gap-2">
                  
                </div>
                <span className="text-center grow sm:text-sm text-[13px] px-4 text-base-content">{whyToUseItTexts.featurePara2}</span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col gap-3 px-6 py-10 text-center items-center max-w-88 rounded-xl bg-base-content/5 shadow-xl/40 min-h-64">
                  <span className="text-2xl font-bold text-center gap-2 grow"> <MousePointerClick className="shrink-0 inline my-auto mx-auto text-accent size-8.5"/> {whyToUseItTexts.featureTitle3}</span>
                <div className="flex items-center gap-2">
                  
                </div>
                <span className="text-center grow sm:text-sm text-[13px] px-4 text-base-content">{whyToUseItTexts.featurePara3}</span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyToUseIt