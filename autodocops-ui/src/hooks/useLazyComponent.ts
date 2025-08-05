import { useState, useEffect, ComponentType } from 'react';

interface LazyComponentState<T> {
  Component: ComponentType<T> | null;
  loading: boolean;
  error: Error | null;
}

export function useLazyComponent<T = any>(
  importFunction: () => Promise<{ default: ComponentType<T> }>
): LazyComponentState<T> {
  const [state, setState] = useState<LazyComponentState<T>>({
    Component: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const loadComponent = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        
        // Add artificial delay for better UX (optional)
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const module = await importFunction();
        
        if (isMounted) {
          setState({
            Component: module.default,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            Component: null,
            loading: false,
            error: error as Error,
          });
        }
      }
    };

    loadComponent();

    return () => {
      isMounted = false;
    };
  }, [importFunction]);

  return state;
}

// Hook for preloading components
export function usePreloadComponent<T = any>(
  importFunction: () => Promise<{ default: ComponentType<T> }>,
  shouldPreload: boolean = true
): void {
  useEffect(() => {
    if (shouldPreload) {
      // Preload the component in the background
      importFunction().catch(() => {
        // Silently fail for preloading
      });
    }
  }, [importFunction, shouldPreload]);
}

