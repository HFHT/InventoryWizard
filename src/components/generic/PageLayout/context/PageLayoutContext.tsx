import { createContext, useContext, type ReactNode } from "react";
import type { PageLayoutTheme, SearchProps } from "../PageLayout";

export type PageLayoutProps = {
    children: ReactNode,
    themeProps: PageLayoutTheme,
    searchProps: SearchProps,
};

interface PageLayoutContextInterface {
    themeProps: PageLayoutTheme,
    searchProps: SearchProps,
}

const PageLayoutContext = createContext<PageLayoutContextInterface | undefined>(undefined);

export const PageLayoutProvider = ({ children, themeProps, searchProps }: PageLayoutProps) => {
    return (
        <PageLayoutContext.Provider value={{
            themeProps,
            searchProps
        }}>
            {children}
        </PageLayoutContext.Provider>
    );
};


// Util to get the Provider context and throw if missing, ie. hook used outside of the Provider
function useSafePageLayoutContext(): PageLayoutContextInterface {
    const ctx = useContext(PageLayoutContext);
    if (!ctx) {
        throw new Error(
            "This PageLayoutContext hook must be used within a <PageLayoutProvider>"
        );
    }
    return ctx;
}

export function usePageLayoutTheme() {
    const { themeProps } = useSafePageLayoutContext();
    return { ...themeProps };
}

export function usePageLayoutSearch() {
    const { searchProps } = useSafePageLayoutContext();
    return { ...searchProps };
}
// searchSources: DatabaseMeta[]
// searchFn: SearchFnType
// unsavedChanges: boolean
// requestSave: () => void

// "raw" context:
export function usePageLayoutContext() {
    return useSafePageLayoutContext();
}