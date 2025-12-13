import { Eye, EyeClosed, KeyRound } from "lucide-react"
import { useState } from "react";

const PasswordInput = ({ registerIO, error, isSignup }) => {

  const [revealPass, setRevealPass] = useState(false);

  return (
    <div>
        <label className="input input-md h-10 validator w-full">
            <KeyRound className="h-[1em] opacity-50" />
            <input
                type={revealPass ? "text" : "password"}
                {...registerIO("password")}
                placeholder="Password"
                {...(isSignup ?
                    {title: "Must be more than 6 characters, including number, lower and uppercase letter, and special character"} :
                    {title: "Enter your password"}
                )}
            />
            <button type="button" onClick={() => setRevealPass(!revealPass)} className="btn btn-link btn-square">
                {
                    revealPass ?
                    <EyeClosed className="h-[1.3em] opacity-50" /> :
                    <Eye className="h-[1.3em] opacity-50" />
                }
            </button>
        </label>
        { error && <p className="validator-hint">{error.message}</p> }
    </div>
  )
}

export default PasswordInput