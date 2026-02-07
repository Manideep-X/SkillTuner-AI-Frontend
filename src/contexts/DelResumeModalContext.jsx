import { createContext, useContext, useState } from "react"

const DelResumeModalContext = createContext(null);

export const DelResumeModalProvider = ({ children }) => {
    const [modalData, setModalData] = useState({
        resume: null,
        onConfirm: null
    });

    return (
        <DelResumeModalContext.Provider value={{
            resume: modalData.resume,
            onDialogOpen: ({ resume, onConfirm }) => setModalData({ resume, onConfirm }),
            onDialogClose: () => setModalData({ resume: null, onConfirm: null }),
            onDialogConfirm: modalData.onConfirm
        }}>
            {children}
        </DelResumeModalContext.Provider>
    )
}

export const useDelResumeModal = () => {
    const context = useContext(DelResumeModalContext);
    if (!context) throw new Error("useDelResumeModal hook is not used inside it's provider!");
    return context;
}