import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from './apolloClient'

import App from './App.tsx'
import './index.css'
import { ThemeConfigProvider } from './providers/themeProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>

      <BrowserRouter>
        <ThemeConfigProvider>
          <App />
        </ThemeConfigProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)
