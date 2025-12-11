import { Mail } from "lucide-react"

const EmailInput = ({ registerIO, error }) => {
  return (
    <div>
        <label className="input input-md h-10 validator w-full">
            <Mail className="h-[1em] opacity-50" />
            <input
              type="email"
              {...registerIO('email')}
              placeholder="mail@site.com"
              required
            />
        </label>
        { error && <div className="validator-hint">{error.message}</div> }
    </div>
  )
}

export default EmailInput