"use client";
import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

interface HeaderContextType {
    /**
     * **set the rightContent or trailing content ( ReactNode ) of the ``AutoSiteHeader``.**
     */
    setRightContent: (node: ReactNode) => void;
    headerRightContent: ReactNode;
    /**
     * **clear the rightContent or trailing content ( ReactNode ) of the ``AutoSiteHeader``.**
     */
    clearRightContent: () => void;
}
const HeaderContext = createContext<HeaderContextType | null>(null);


/**
 * **This is the provider for the header context.
 * It provides the right content of the header.**
 */
export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    const [headerRightContent, setRightContentInternal] = useState<ReactNode>(null);

    const setRightContent = useCallback((node: ReactNode) => {
        setRightContentInternal(null);
        setRightContentInternal(node);
    }, []);

    const clearRightContent = useCallback(() => {
        setRightContentInternal(null);
    }, []);

    const contextValue = useMemo(() => {
        return { headerRightContent, setRightContent, clearRightContent };
    }, [headerRightContent, setRightContent, clearRightContent]);


    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
};


/**
 * **This is the hook for the header context.
 * It provides the right content of the header.**
 */
export function useHeader() {
    const context = useContext(HeaderContext);
    if (!context) throw new Error("useHeader must be used within HeaderProvider");
    return context;
}
