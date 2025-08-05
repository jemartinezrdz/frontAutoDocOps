import { createTRPCReact } from '@trpc/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import Constants from 'expo-constants';
import { useSession } from '../stores/useSession';

// Types
export interface Project {
  id: string;
  name: string;
  description: string;
  repositoryUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  name: string;
  description: string;
  repositoryUrl: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ChatMessage {
  content: string;
  projectId?: string;
}

export interface ChatResponse {
  id: string;
  content: string;
  timestamp: string;
}

// Define AppRouter type interface (this would come from your backend)
// In a real application, this would be imported from your tRPC backend
// Using 'any' temporarily until the backend router is properly implemented
export type AppRouter = any;

// Create tRPC React hooks with proper typing
export const trpc = createTRPCReact<AppRouter>();

// tRPC client configuration
export const createClient = () => {
  const apiUrl =
    process.env.EXPO_PUBLIC_API_URL ??
    Constants.expoConfig?.extra?.apiUrl ??
    'http://localhost:3000/trpc';

  return createTRPCClient({
    links: [
      httpBatchLink({
        url: apiUrl,
        headers: () => {
          // Get authentication token from session store
          const { token } = useSession.getState();
          return {
            authorization: token ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
          };
        },
      }),
    ],
  });
};

