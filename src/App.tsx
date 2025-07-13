import { Button, useMantineTheme } from "@mantine/core"
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react"
import { Home, Receipt } from "./pages"
import { PageLayout, useSearch, type PageLayoutTheme, type SearchProps } from "./components/generic"
import { Computer } from "./assets/icons"
import { useMediaQuery } from "@mantine/hooks"
import { AzureContextProvider } from "./components/generic/auth/context/AzureContext"
import { SettingsContextProvider } from "./components/generic/settings/context/SettingsContext"

const { search: searchFn } = useSearch(`${import.meta.env.VITE_INVENTORY_API}/search`, [{ db: 'Office', collection: 'Computers', idx: 'computers' }, { db: 'Homes', collection: 'Parcels', idx: 'parcels' }])

function App() {
  const { instance } = useMsal();

  const navStructure = [
    {
      label: 'Home',
      page: <Home />,
      key: 'Home'
    },
    {
      label: 'Receipt',
      page: <Receipt />,
      key: 'Receipt'
    }
  ];
  // Define your breakpoints here (example: Mantine default breakpoints)
  const BREAKPOINT = 'md'
  const theme = useMantineTheme();
  const maxWidth = theme.breakpoints[BREAKPOINT]; // e.g. '48em'
  // Mantine's useMediaQuery expects a CSS media query string
  const isMobileOrTablet = useMediaQuery(`(max-width: ${maxWidth})`);

  // const phoneMaxWidth = 600; // px
  // const tabletMaxWidth = 1024; // px
  const themeProps: PageLayoutTheme = { hiddenFrom: 'md', isMobileOrTablet: isMobileOrTablet }

  const searchProps: SearchProps = {
    unsavedChanges: false,
    requestSave: () => { },
    searchFn: searchFn,
    searchSources: [
      { db: 'Office', collection: 'Computers', idx: 'computers', title: 'Computers', icon: <Computer /> },
      { db: 'Homes', collection: 'Parcels', idx: 'parcels', title: 'Parcels', icon: <Computer /> }
    ]
  }

  return (
    <>
      <AuthenticatedTemplate>
        <AzureContextProvider >
          <SettingsContextProvider>
            <PageLayout navigationTree={navStructure}
              themeProps={themeProps}
              searchProps={searchProps}
            />
          </SettingsContextProvider>
        </AzureContextProvider>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Button onClick={() => instance.loginRedirect()}>Sign In</Button>
      </UnauthenticatedTemplate>
    </>
  )
}

export default App
