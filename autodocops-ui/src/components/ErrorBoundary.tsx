import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>¡Oops! Algo salió mal</Text>
        <Text style={styles.message}>
          Ha ocurrido un error inesperado. Por favor, intenta nuevamente.
        </Text>
        
        {__DEV__ && (
          <View style={styles.errorDetails}>
            <Text style={styles.errorTitle}>Detalles del error:</Text>
            <Text style={styles.errorText}>{error.message}</Text>
          </View>
        )}
        
        <TouchableOpacity style={styles.button} onPress={resetErrorBoundary}>
          <Text style={styles.buttonText}>Intentar nuevamente</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export function ErrorBoundary({ children, onError }: ErrorBoundaryProps) {
  const errorBoundaryProps: any = {
    FallbackComponent: ErrorFallback,
    onReset: () => {
      // Reset any global state if needed
      console.log('Error boundary reset');
    },
  };

  if (onError) {
    errorBoundaryProps.onError = onError;
  }

  return (
    <ReactErrorBoundary {...errorBoundaryProps}>
      {children}
    </ReactErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    maxWidth: 400,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc3545',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  errorDetails: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'monospace',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

