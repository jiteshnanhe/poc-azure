import React from 'react';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./styles/theme";

import { BrowserRouter } from "react-router-dom";

import App from './App';

import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
    auth: {
        clientId: '51ab0f37-0dfe-48f9-8134-1154165aa03c',
        authority: 'https://WSDHCLN.b2clogin.com/WSDHCLN.onmicrosoft.com/609d960e-dd91-4b9c-97a9-594f71108127',
        redirectUri: '/',
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPII) => {
                console.log(message)
            },
            logLevel: "Info",
        }

    }
});

pca.addEventCallback(event => {
    if (event.eventType === EventType.LOGIN_SUCCESS) {
        console.log(event);
        pca.setActiveAccount(event.payload.account);
    }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <App msalInstance={pca}/>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
