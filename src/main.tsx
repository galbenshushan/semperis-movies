import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { GlobalStyles } from './theme/GlobalStyles';
import { muiTheme } from './theme/muiTheme';
import { store } from './store/store';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/semperis-movies/">
        <ThemeProvider theme={muiTheme}>
          <GlobalStyles />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
