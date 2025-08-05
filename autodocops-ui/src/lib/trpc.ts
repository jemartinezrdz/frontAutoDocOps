import { createTRPCReact } from '@trpc/react-query';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from '~/server/router';
import { useSession } from '../stores/useSession';

export type { AppRouter };

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

// Create tRPC React hooks with proper typing
export const trpc = createTRPCReact<AppRouter>();

// tRPC client configuration
export const createClient = () => {
  const apiUrl = 'http://localhost:3000/trpc'; // Default to localhost for development

  return createTRPCClient<AppRouter>({
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

