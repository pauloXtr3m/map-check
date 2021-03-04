import React from 'react';
import { LocationProvider } from './location';

export const AppProvider: React.FC = ({ children }) => (
  <LocationProvider>{children}</LocationProvider>
);
