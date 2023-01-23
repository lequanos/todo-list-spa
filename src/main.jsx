import React from 'react';
import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Home from './views/Home/Home';
import Lists from './views/Lists/Lists';
import Unauthorized from './components/Unauthorized/Unauthorized';
import NotFound from './components/NotFound/NotFound';

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
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={import.meta.env.BASENAME}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/401" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
