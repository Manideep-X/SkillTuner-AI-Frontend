import { Cog, Mail } from "lucide-react"
import logo from "../../assets/logo.png"
import Github from "../../assets/Github.svg"
import Linkedin from "../../assets/Linkedin.svg"

const Footer = () => {
  return (
    <footer id="contacts" className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">

      {/* Copyright and credit texts */}
      <aside>
        <img src={logo} alt="logo" className="lg:size-16 size-14" />
        <span className="flex flex-col gap-1">
          <p>Skilltuner AI ©</p>
          <p>Developed and maintained by <a href="https://github.com/Manideep-X" target="_blank" rel="noopener noreferrer" className="inline link link-hover link-accent opacity-80">Manideep Bhattacharyya <Cog className="size-5 inline animate-[spin_2s_linear_infinite]"/> </a></p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved.</p>
        </span>
      </aside>

      {/* Linkes for social medias */}
      <nav>
        <h6 className="footer-title">Socials</h6>
        <div className="grid grid-flow-col gap-4">
          <a href="https://github.com/Manideep-X" target="_blank" rel="noopener noreferrer" className="btn btn-square btn-ghost">
            <img src={Github} alt="github" aria-label="GitHub" className="size-8" />
          </a>
          <a href="https://www.linkedin.com/in/manideep-bhattacharyya-9ab78b20b/" target="_blank" rel="noopener noreferrer" className="btn btn-square btn-ghost">
            <img src={Linkedin} alt="linkedin" aria-label="LinkedIn" className="size-8" />
          </a>
          <a href="mailto:manideepbhattacharyya2002@gmail.com" className="btn btn-square btn-ghost">
            <Mail aria-label="Email" className="size-8 text-base-content" />
          </a>
        </div>
      </nav>
    </footer>
  )
}

export default Footer