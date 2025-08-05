import React, { ComponentType } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLazyComponent } from '../hooks/useLazyComponent';

interface LazyWrapperProps<T> {
  importFunction: () => Promise<{ default: ComponentType<T> }>;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  componentProps?: T;
}

export function LazyWrapper<T = any>({
  importFunction,
  fallback,
  errorFallback,
  componentProps,
}: LazyWrapperProps<T>) {
  const { Component, loading, error } = useLazyComponent<T>(importFunction);

  if (loading) {
    return (
      fallback || (
        <View style={styles.fallbackContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.fallbackText}>Cargando...</Text>
        </View>
      )
    );
  }

  if (error) {
    return (
      errorFallback || (
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Error al cargar componente</Text>
          <Text style={styles.errorText}>
            No se pudo cargar el componente. Intenta nuevamente.
          </Text>
        </View>
      )
    );
  }

  if (!Component) {
    return null;
  }

  return <Component {...(componentProps || {} as any)} />;
}

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  fallbackText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#dc3545',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});

