import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { GlobalStyles } from './theme/GlobalStyles';
import { muiTheme } from './theme/muiTheme';
import { MoviesProvider } from './context/MoviesContext';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={muiTheme}>
        <MoviesProvider>
          <GlobalStyles />
          <App />
        </MoviesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
