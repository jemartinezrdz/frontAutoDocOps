import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';

interface OptimizedImageProps {
  source: string | { uri: string };
  style?: any;
  placeholder?: string;
  contentFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  transition?: number;
  onLoad?: () => void;
  onError?: () => void;
  accessibilityLabel?: string;
}

export function OptimizedImage({
  source,
  style,
  placeholder,
  contentFit = 'cover',
  transition = 200,
  onLoad,
  onError,
  accessibilityLabel,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const imageSource = typeof source === 'string' ? { uri: source } : source;

  const imageProps: any = {
    source: imageSource,
    style: styles.image,
    contentFit,
    transition,
    placeholder: placeholder || null,
    onLoad: handleLoad,
    onError: handleError,
    accessible: !!accessibilityLabel,
    cachePolicy: "memory-disk",
    priority: "normal",
  };

  if (accessibilityLabel) {
    imageProps.accessibilityLabel = accessibilityLabel;
  }

  return (
    <View style={[styles.container, style]}>
      <Image {...imageProps} />
      
      {isLoading && !hasError && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#007AFF" />
        </View>
      )}
      
      {hasError && (
        <View style={styles.errorOverlay}>
          <View style={styles.errorPlaceholder} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  errorOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  errorPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
  },
});

