import { Eye, EyeClosed, KeyRound } from "lucide-react"
import { useState } from "react";
import { useFormContext } from "react-hook-form";

const PasswordInput = ({ isSignup }) => {

  const [revealPass, setRevealPass] = useState(false);

  const { register, formState: { errors, dirtyFields } } = useFormContext();

  return (
    <div>
        <label className={`input input-md h-10 w-full
            ${errors.password ? 'input-error' : (dirtyFields.password ? 'input-success' : '')}
        `}>
            <KeyRound className="h-[1em] opacity-50" />
            <input
                type={revealPass ? "text" : "password"}
                {...register("password")}
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
        { errors.password && <p className="text-error">{errors.password.message}</p> }
    </div>
  )
}

export default PasswordInput