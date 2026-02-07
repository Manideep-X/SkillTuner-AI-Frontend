import { useFormContext } from "react-hook-form"

const ResumeFormFields = () => {

  const { register, formState: { errors, dirtyFields } } = useFormContext();

  return (
    <div className="flex flex-col">

        {/* Input for resume title as text input */}
        <fieldset className="fieldset w-full">
          <legend className="fieldset-legend text-white">Resume Title</legend>
          <label className={`input input-md h-10 w-full
            ${errors.resumeTitle ? 'input-error' : (dirtyFields.resumeTitle ? 'input-success' : '')}
          `}>
              <input
                type="text"
                {...register("resumeTitle")}
                placeholder="Enter title of resume"
                title="Give the resume a title"
              />
          </label>
          { errors.resumeTitle && <div className="text-error">{errors.resumeTitle.message}</div> }
        </fieldset>

        {/* Input for resume file as file input */}
        <fieldset className="w-full fieldset">
            <legend className="fieldset-legend text-white">Pick a resume</legend>
            <input 
              className={`input file-input input-md h-10 w-full shadow-none text-shadow-none
              ${errors.resumeFile ? 'input-error' : (dirtyFields.resumeFile ? 'input-success text-white' : 'text-base-content/50')}`}
              type="file"
              {...register("resumeFile")}
              title="Upload the resume"
            />
            <label className="label">Max size 4MB</label>
            { errors.resumeFile && <div className="text-error">{errors.resumeFile.message}</div> }
        </fieldset>
    </div>
  )
}

export default ResumeFormFields