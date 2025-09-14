'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ProvidersProps } from '@/types/components';
import { store } from '@/store';

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
