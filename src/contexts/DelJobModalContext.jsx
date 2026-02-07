import { createContext, useContext, useState } from "react"

const DelJobModalContext = createContext(null);

export const DelJobModalProvider = ({ children }) => {
    const [modalData, setModalData] = useState({
        jobDescription: null,
        onConfirm: null
    });

    return (
        <DelJobModalContext.Provider value={{
            jobDescription: modalData.jobDescription,
            onDialogOpen: ({ jobDescription, onConfirm }) => setModalData({ jobDescription, onConfirm }),
            onDialogClose: () => setModalData({ jobDescription: null, onConfirm: null }),
            onDialogConfirm: modalData.onConfirm
        }}>
            {children}
        </DelJobModalContext.Provider>
    )
}

export const useDelJobModal = () => {
    const context = useContext(DelJobModalContext);
    if (!context) throw new Error("useDelJobModal hook is not used inside it's provider!");
    return context;
};