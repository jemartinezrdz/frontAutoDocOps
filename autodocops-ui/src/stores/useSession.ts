import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

interface User {
  id: string;
  email: string;
  name: string;
}

interface SessionState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

// Storage adapter for Expo SecureStore
const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(name);
    }
    try {
      return await SecureStore.getItemAsync(name);
    } catch {
      // Fallback to AsyncStorage if SecureStore fails
      return await AsyncStorage.getItem(name);
    }
  },
  setItem: async (name: string, value: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.setItem(name, value);
    } else {
      try {
        await SecureStore.setItemAsync(name, value);
      } catch {
        // Fallback to AsyncStorage if SecureStore fails
        await AsyncStorage.setItem(name, value);
      }
    }
  },
  removeItem: async (name: string): Promise<void> => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(name);
    } else {
      try {
        await SecureStore.deleteItemAsync(name);
      } catch {
        // Fallback to AsyncStorage if SecureStore fails
        await AsyncStorage.removeItem(name);
      }
    }
  },
};

export const useSession = create<SessionState>()(
  persist(
    (set, _get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, _password: string): Promise<void> => {
        set({ isLoading: true });
        try {
          // TODO: Replace with actual tRPC call
          // const result = await trpc.auth.login.mutate({ email, password });
          
          // Simulated login for development - NOT FOR PRODUCTION
          const mockUser: User = {
            id: '1',
            email,
            name: 'Usuario Demo',
          };
          // Generate a secure random mock token (doesn't encode user data)
          const mockToken = `mock-token-${Math.random().toString(36).substring(2, 18)}-${Date.now()}`;
          
          set({
            user: mockUser,
            token: mockToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setUser: (user: User) => {
        set({ user, isAuthenticated: true });
      },

      setToken: (token: string) => {
        set({ token });
      },
    }),
    {
      name: 'autodocops-session',
      storage: createJSONStorage(() => secureStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

