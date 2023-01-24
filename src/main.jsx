import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider as StoreProvider } from 'react-redux';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import store from './store/store';
import router from './router/router';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3964A5',
    },
    secondary: {
      main: '#FFF',
    },
    error: {
      main: '#F05442',
      dark: '#ED311D',
      light: '#F37668',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
);
