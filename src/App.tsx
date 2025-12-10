import React from 'react';
import { useAppSelector } from './store/hooks';
import { AppLayout } from './components/layout/AppLayout';
import { AppRouter } from './routes/AppRouter';
import { ConfigErrorPage } from './pages/ConfigErrorPage';

const App: React.FC = () => {
  const configError = useAppSelector((state) => state.movies.configError);

  if (configError) {
    return (
      <AppLayout>
        <ConfigErrorPage message={configError} />
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <AppRouter />
    </AppLayout>
  );
};

export default App;
