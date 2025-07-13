import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchSettings } from "../services/fetchSettings";

interface SettingsContextInterface {
    _categories: any[]
    _locations: any[]
    _prompts: any[]
    _selects: any[]
    _users: any[]
}

const SettingsContext = createContext<SettingsContextInterface | undefined>(undefined);

interface SettingsContextProps {
    children: ReactNode
}
export const SettingsContextProvider = ({ children }: SettingsContextProps) => {
    const [settings, setSettings] = useState<SettingsContextInterface | undefined>()
    useEffect(() => {
        getSettings()
    }, [])
    const getSettings = async () => {
        setSettings(await fetchSettings())
    }
    return (
        <SettingsContext.Provider value={settings}>
            {children}
        </SettingsContext.Provider>
    );
}

// Util to get the Provider context and throw if missing, ie. hook used outside of the Provider
function useSafeSettingsContext(): SettingsContextInterface {
    const ctx = useContext(SettingsContext);
    if (!ctx) {
        throw new Error(
            "This SettingsContext hook must be used within a <SettingsProvider>"
        );
    }
    return ctx;
}

// "raw" context:
export function useSettingsContext() {
    return useSafeSettingsContext();
}