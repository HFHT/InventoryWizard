import { createContext, useState, useContext, type ReactNode, type SetStateAction, type Dispatch, type JSX } from "react";
import { Home } from "../../../../pages";

export type NavigationType = {
  page: JSX.Element;
  filter: string | null;
  key: string;
};

interface NavigationContextInterface {
  navigation: NavigationType;
  setNavigation: Dispatch<SetStateAction<NavigationType>>;
}

const defaultNavigation = { page: <Home />, key: "Home", filter: null };

const NavigationContext = createContext<NavigationContextInterface | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [navigation, setNavigation] = useState<NavigationType>(defaultNavigation);

  return (
    <NavigationContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  const { navigation, setNavigation } = context;
  return { navigation, setNavigation } as const;
}

/** @deprecated, obtaining filter from CategoryProvider */
export function useNavigationFilter() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  const { navigation } = context;

  return navigation.filter
}

export const isPage = (navigation: NavigationType, key: string) =>
  navigation.key === key;