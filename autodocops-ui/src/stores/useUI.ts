import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

type Theme = 'light' | 'dark' | 'system';

interface UIState {
  theme: Theme;
  isLoading: boolean;
  notifications: boolean;
  sidebarOpen: boolean;
  setTheme: (theme: Theme) => void;
  setLoading: (loading: boolean) => void;
  setNotifications: (enabled: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

// Simple storage for UI preferences
const uiStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(name);
    }
    // For mobile, use AsyncStorage
    try {
      return await AsyncStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(name, value);
    } else {
      try {
        await AsyncStorage.setItem(name, value);
      } catch {
        // Silently fail for UI preferences
      }
    }
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(name);
    } else {
      try {
        await AsyncStorage.removeItem(name);
      } catch {
        // Silently fail for UI preferences
      }
    }
  },
};

export const useUI = create<UIState>()(
  persist(
    (set, _get) => ({
      theme: 'system',
      isLoading: false,
      notifications: true,
      sidebarOpen: false,

      setTheme: (theme: Theme) => {
        set({ theme });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setNotifications: (enabled: boolean) => {
        set({ notifications: enabled });
      },

      toggleSidebar: (): void => {
        set((state) => ({ sidebarOpen: !state.sidebarOpen }));
      },

      setSidebarOpen: (open: boolean) => {
        set({ sidebarOpen: open });
      },
    }),
    {
      name: 'autodocops-ui',
      storage: createJSONStorage(() => uiStorage),
      partialize: (state) => ({
        theme: state.theme,
        notifications: state.notifications,
      }),
    }
  )
);

