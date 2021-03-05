import React from 'react';
import { LocationProvider } from './location';
import { NotesProvider } from './notes';

export const AppProvider: React.FC = ({ children }) => (
  <LocationProvider>
    <NotesProvider>{children}</NotesProvider>
  </LocationProvider>
);
