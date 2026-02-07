import { createContext, useCallback, useContext, useState } from "react";

const AnalysisListReloadContext = createContext(null);

export const AnalysisListReloadProvider = ({ children }) => {
    const [reloadList, setReloadList] = useState(0);

    const triggerListReload = useCallback(() => {
        setReloadList(prev => prev + 1);
    }, []);

    return (
        <AnalysisListReloadContext.Provider value={{ reloadList, triggerListReload }}>
            {children}
        </AnalysisListReloadContext.Provider>
    );
};

export const useAnalysisRefresh = () => {
    const context = useContext(AnalysisListReloadContext);
    if (!context) throw new Error("useAnalysisRefresh hook is not used inside it's provider!");
    return context;
}