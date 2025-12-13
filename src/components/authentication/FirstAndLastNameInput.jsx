const FirstAndLastNameInput = ({ registerIO, errorFirst, errorLast }) => {
  return (
    <div className="flex">
        <div className="w-1/2">
            <label className="input input-md h-10 validator w-full">
                <input
                  type="text"
                  {...registerIO("firstName")}
                  placeholder="First Name"
                  title="Enter your first name"
                />
            </label>
            { (errorFirst || console.log(errorFirst)) && <div className="validator-hint">{errorFirst}</div> }
        </div>
        <div className="w-1/2">
            <label className="input input-md h-10 validator w-full">
                <input
                  type="text"
                  {...registerIO("lastName")}
                  placeholder="Last Name"
                  title="Enter your last name"
                />
            </label>
            { errorLast && <div className="validator-hint">{errorLast}</div> }
        </div>
    </div>
  )
}

export default FirstAndLastNameInput