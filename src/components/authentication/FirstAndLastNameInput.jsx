import { useFormContext } from "react-hook-form"

const FirstAndLastNameInput = () => {

  const { register, formState: { errors, dirtyFields } } = useFormContext();

  return (
    <div className="flex">
        <div className="w-1/2">
            <label className={`input input-md h-10 w-full
              ${errors.firstName ? 'input-error' : (dirtyFields.firstName ? 'input-success' : '')}
            `}>
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="First Name"
                  title="Enter your first name"
                />
            </label>
            { errors.firstName && <div className="text-error">{errors.firstName.message}</div> }
        </div>
        <div className="w-1/2">
            <label className={`input input-md h-10 w-full
              ${errors.lastName ? 'input-error' : (dirtyFields.lastName ? 'input-success' : '')}
            `}>
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Last Name"
                  title="Enter your last name"
                />
            </label>
            { errors.lastName && <div className="text-error">{errors.lastName.message}</div> }
        </div>
    </div>
  )
}

export default FirstAndLastNameInput