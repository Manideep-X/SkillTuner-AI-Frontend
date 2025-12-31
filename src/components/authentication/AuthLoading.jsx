const AuthLoading = () => {
  return (
    <section className="relative flex h-screen justify-center items-center text-secondary-content
                        bg-linear-to-b from-black/80 via-transparent via-50% to-accent/25
                        ">

      {/* Logo loading skeleton bg-base-300 */}
      <div className="absolute top-0 left-0 flex p-4">
        <div className="flex gap-3 items-center justify-center">
          <div className="size-10 rounded-full skeleton bg-base-300/60"></div>
          <div className="w-40 h-10 rounded-full skeleton bg-base-300/60"></div>
        </div>
      </div>
      
      {/* the box container */}
      <div className="grid md:grid-cols-2 justify-center w-full md:w-11/12 lg:w-2/3 h-5/6 md:h-4/5 lg:h-3/4 border border-[#31393b] bg-[#1a1a1a] rounded-sm shadow-xl">
        
        {/* Sign in and other texts loading skeleton bg-base-300 */}
        <div className="flex flex-row md:flex-col items-center md:items-start justify-center gap-6 p-4 h-full md:px-10 md:py-16 md:pr-0 rounded-l-sm">
          <div className="flex flex-col justify-center md:gap-6 gap-2">
            <div>
              <div className="w-50 h-10 rounded-full skeleton bg-base-300/50"></div>
              <div className="w-80 h-10 rounded-full skeleton bg-base-300/50 mt-2"></div>
            </div>
            <div className="w-60 h-8 rounded-full skeleton bg-base-300/50"></div>
            <div className="hidden md:block w-70 h-6 rounded-full skeleton bg-base-300/50 mt-10"></div>
          </div>
        </div>
  
        {/* loading field for sign in */}
        <div className="bg-[#212121] flex items-center justify-center overflow-x-auto overflow-y-hidden rounded-r-sm">
          <div className="flex flex-col px-6 w-md">
            <div className="w-50 h-10 rounded-full skeleton bg-base-300/40 mb-2"></div>
            <div className="flex flex-col gap-2">
              <div className="w-full h-10 rounded-full skeleton bg-base-300/40"></div>
              <div className="w-full h-10 rounded-full skeleton bg-base-300/40"></div>
            </div>
            <div className="w-full h-10 rounded-full skeleton bg-base-300/40 mt-10"></div>
            <div className="md:hidden w-60 h-6 rounded-full skeleton bg-base-300/40 mt-2 mx-auto"></div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default AuthLoading