'use client';
import { QueryClientProvider as Provider, QueryClient } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();

export const QueryClientProvider = ({ children }: React.PropsWithChildren) => {
  return <Provider client={queryClient}>{children}</Provider>;
};
