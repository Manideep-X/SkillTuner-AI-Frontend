import { Eye, EyeClosed, KeyRound } from "lucide-react"
import { useState } from "react";

const PasswordInput = () => {

  const [revealPass, setRevealPass] = useState(false);

  return (
    <div>
        <label className="input input-md h-10 validator w-full">
            <KeyRound className="h-[1em] opacity-50" />
            <input
                type={revealPass ? "text" : "password"}
                required
                placeholder="Password"
                minLength="8"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
            <button type="button" onClick={() => setRevealPass(!revealPass)} className="btn btn-link btn-square">
                {
                    revealPass ?
                    <EyeClosed className="h-[1.3em] opacity-50" /> :
                    <Eye className="h-[1.3em] opacity-50" />
                }
            </button>
        </label>
        <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
        </p>
    </div>
  )
}

export default PasswordInput