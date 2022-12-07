import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../src/utils/SSO/authConfig";
import { Provider } from 'react-redux';
import { store } from '../src/Redux/store'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const msalInstance = new PublicClientApplication(msalConfig);

const Theme = createTheme({
  typography: {
    'fontFamily': [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'system-ui',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Web"',
      'sans-serif',
    ].join(',')
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={Theme}>
    <MsalProvider instance={msalInstance}>
      <Provider store={store}>
        <App />
      </Provider>
    </MsalProvider>
  </ThemeProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
