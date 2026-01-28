const ListOfDetails = ({ Icon, title, listOfData = [] }) => {
  return (
    <article className="p-4 sm:p-8 min-w-0 sm:w-md h-fit bg-base-100/90 shadow-md/50 shadow-base-200 rounded-lg flex flex-col grow gap-5">
        <div className="w-full flex items-center gap-2">
            <Icon className="text-accent size-7"/>
            <span className="w-full truncate text-lg font-semibold">{title}</span>
        </div>
        <div className="h-56 w-full border border-accent-content/30 bg-accent-content/5 sm:py-5 sm:px-6 rounded-lg overflow-auto sm:inset-shadow-sm inset-shadow-none shadow-lg/60 sm:shadow-none shadow-base-300">
            <ul className="list bg-base-300/70 rounded-box shadow-lg/50 shadow-base-300 text-base-content">
                {
                    listOfData.map((data, index) => (
                        <li key={index} id={index} className="list-row w-fit">
                            <div className="sm:text-4xl text-3xl font-thin opacity-30 tabular-nums">{index+1}</div>
                            <div className="list-col-grow text-wrap">
                                <div>{data}</div>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    </article>
  )
}

export default ListOfDetails