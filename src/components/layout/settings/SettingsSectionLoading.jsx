const SettingsSectionLoading = () => {
  return (
    <section className="w-full h-fit py-4 px-2 flex justify-center">
        <div className="flex p-4 justify-center items-center gap-3 bg-base-300/50 rounded-lg">
            <span className="loading loading-spinner loading-xl"></span>
            <p>loading...</p>
        </div>
    </section>
  )
}

export default SettingsSectionLoading