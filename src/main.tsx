import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary';
import { MsalProvider } from '@azure/msal-react';
import { createTheme, MantineProvider } from '@mantine/core'
import App from './App.tsx'
import { TopLevelError } from './components/custom/index.ts';
import { PublicClientApplication, type Configuration } from '@azure/msal-browser';

const theme = createTheme({
  /** Put your mantine theme override here */
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});
const configuration: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MSALCLIENTID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AUTH}`,
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false
  }
};
const pca = new PublicClientApplication(configuration);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <ErrorBoundary FallbackComponent={TopLevelError} onError={() => console.log('Top Level Error Boundary')}>
        <MsalProvider instance={pca}>
          <App />
        </MsalProvider>
      </ErrorBoundary>
    </MantineProvider>
  </StrictMode>,
)
