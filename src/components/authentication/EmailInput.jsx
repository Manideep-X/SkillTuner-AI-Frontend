import { Mail } from "lucide-react"

const EmailInput = () => {
  return (
    <div>
        <label className="input input-md h-10 validator w-full">
            <Mail className="h-[1em] opacity-50" />
            <input type="email" placeholder="mail@site.com" required />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
    </div>
  )
}

export default EmailInput