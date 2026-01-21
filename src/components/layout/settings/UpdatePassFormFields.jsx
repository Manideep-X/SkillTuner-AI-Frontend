import { Eye, EyeClosed, KeyRound } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form"

const UpdatePassFormFields = () => {

  const [revealPass, setRevealPass] = useState({
    existing: false,
    new: false,
    repeatNew: false
  });
  const { register, formState: { errors, dirtyFields } } = useFormContext();

  return (
    <div className="flex flex-col">

        {/* Input for Existing password */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-white">Existing Password</legend>
          <div>
            <label className={`input input-md h-10 w-full
              ${errors.existingPassword ? 'input-error' : (dirtyFields.existingPassword ? 'input-success' : '')}
            `}>
              <KeyRound className="h-[1em] opacity-50" />
              <input 
                type={revealPass.existing ? "text" : "password"}
                {...register("existingPassword")}
                placeholder="Enter existing password"
                title="Enter your existing password"
              />
              <button type="button" aria-label="Toggle password visibility" onClick={() => setRevealPass(prevReveal => ({ ...prevReveal, existing: !prevReveal.existing }))} className="btn btn-link btn-square">
                {
                  revealPass.existing ?
                  <EyeClosed className="h-[1.3em] opacity-50" /> :
                  <Eye className="h-[1.3em] opacity-50" />
                }
              </button>
            </label>
          </div>
          { errors.existingPassword && <div className="text-error">{errors.existingPassword.message}</div> }
        </fieldset>

        {/* Input for New password */}
        <fieldset className="fieldset w-full mt-5">
          <legend className="fieldset-legend text-white">New Password</legend>
          <div>
            <label className={`input input-md h-10 w-full
              ${errors.newPassword ? 'input-error' : (dirtyFields.newPassword ? 'input-success' : '')}
            `}>
              <KeyRound className="h-[1em] opacity-50" />
              <input 
                type={revealPass.new ? "text" : "password"}
                {...register("newPassword")}
                placeholder="Enter new password"
                title="Enter the new password"
              />
              <button type="button" aria-label="Toggle password visibility" onClick={() => setRevealPass(prevReveal => ({ ...prevReveal, new: !prevReveal.new }))} className="btn btn-link btn-square">
                {
                  revealPass.new ?
                  <EyeClosed className="h-[1.3em] opacity-50" /> :
                  <Eye className="h-[1.3em] opacity-50" />
                }
              </button>
            </label>
          </div>
          { errors.newPassword && <div className="text-error">{errors.newPassword.message}</div> }
        </fieldset>

        {/* Input for Repeat new password */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-white">Repeat New Password</legend>
          <div>
            <label className={`input input-md h-10 w-full
              ${errors.repeatNewPassword ? 'input-error' : (dirtyFields.repeatNewPassword ? 'input-success' : '')}
            `}>
              <KeyRound className="h-[1em] opacity-50" />
              <input 
                type={revealPass.repeatNew ? "text" : "password"}
                {...register("repeatNewPassword")}
                placeholder="Repeat the new password"
                title="Repeat the new password"
              />
              <button type="button" aria-label="Toggle password visibility" onClick={() => setRevealPass(prevReveal => ({ ...prevReveal, repeatNew: !prevReveal.repeatNew }))} className="btn btn-link btn-square">
                {
                  revealPass.repeatNew ?
                  <EyeClosed className="h-[1.3em] opacity-50" /> :
                  <Eye className="h-[1.3em] opacity-50" />
                }
              </button>
            </label>
          </div>
          { errors.repeatNewPassword && <div className="text-error">{errors.repeatNewPassword.message}</div> }
        </fieldset>

    </div>
  )
}

export default UpdatePassFormFields