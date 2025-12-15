import { Mail } from "lucide-react"
import { useFormContext } from "react-hook-form"

const EmailInput = () => {

  const { register, formState: { errors, dirtyFields } } = useFormContext();

  return (
    <div>
        <label className={`input input-md h-10 w-full 
          ${errors.email ? 'input-error' : (dirtyFields.email ? 'input-success' : '')} 
        `}>
            <Mail className="h-[1em] opacity-50" />
            <input
              type="email"
              {...register("email")}
              placeholder="mail@site.com"
              title="Enter your email"
            />
        </label>
        { errors.email && <div className="text-error">{errors.email.message}</div> }
    </div>
  )
}

export default EmailInput