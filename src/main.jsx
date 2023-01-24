import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider as StoreProvider } from 'react-redux';

import './main.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Loader from '@/components/Loader/Loader';
import store from './plugins/store/store';
import router from './plugins/router/router';
import './plugins/lang/i18n';

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
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
);
