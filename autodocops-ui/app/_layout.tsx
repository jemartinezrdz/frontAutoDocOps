import React from 'react';
import { Stack } from 'expo-router';
import { Providers } from '../src/lib/providers';
import { ErrorBoundary } from '../src/components/ErrorBoundary';

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <Providers>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="projects" options={{ title: 'Projects' }} />
        </Stack>
      </Providers>
    </ErrorBoundary>
  );
}

