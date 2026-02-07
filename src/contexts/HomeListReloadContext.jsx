import { createContext, useCallback, useContext, useState } from "react";

const HomeListReloadContext = createContext(null);

export const HomeListReloadProvider = ({ children }) => {
    const [homeListReload, setHomeListReload] = useState(0);

    const triggerHomeListReload = useCallback(() => {
        setHomeListReload(prev => prev + 1);
    }, []);

    return (
        <HomeListReloadContext.Provider value={{ homeListReload, triggerHomeListReload }}>
            {children}
        </HomeListReloadContext.Provider>
    );
};

export const useHomeListRefresh = () => {
    const context = useContext(HomeListReloadContext);
    if (!context) throw new Error("useHomeListRefresh hook is not used inside it's provider!");
    return context;
}