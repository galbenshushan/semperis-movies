import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { MoviesListPage } from '../pages/MoviesListPage';
import { MovieDetailsPage } from '../pages/MovieDetailsPage';

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MoviesListPage />} />
      <Route path="/movie/:id" element={<MovieDetailsPage />} />
    </Routes>
  );
};
