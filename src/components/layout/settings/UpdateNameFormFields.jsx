import { useFormContext } from "react-hook-form"

const UpdateNameFormFields = () => {

  const { register, formState: { errors, dirtyFields } } = useFormContext();

  return (
    <div className="flex flex-col">

        {/* Input for new first name as text input */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-white">First Name</legend>
          <label className={`input input-md h-10 w-full
            ${errors.firstName ? 'input-error' : (dirtyFields.firstName ? 'input-success' : '')}
          `}>
              <input
                type="text"
                {...register("firstName")}
                placeholder="Enter first name"
                title="Enter the new first name"
              />
          </label>
          { errors.firstName && <div className="text-error">{errors.firstName.message}</div> }
        </fieldset>

        {/* Input for new last name as text input */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-white">Last Name</legend>
          <label className={`input input-md h-10 w-full
            ${errors.lastName ? 'input-error' : (dirtyFields.lastName ? 'input-success' : '')}
          `}>
              <input
                type="text"
                {...register("lastName")}
                placeholder="Enter last name"
                title="Give the new last name"
              />
          </label>
          { errors.lastName && <div className="text-error">{errors.lastName.message}</div> }
        </fieldset>

    </div>
  )
}

export default UpdateNameFormFields