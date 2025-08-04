import { createTRPCReact } from '@trpc/react-query';
// import { httpBatchLink } from '@trpc/client';
// import { useSession } from '../stores/useSession';

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

// Create tRPC React hooks with any type for now
export const trpc = createTRPCReact<any>();

// tRPC client configuration (commented out for now)
/*
export const createTRPCClient = () => {
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: 'https://api.autodocops.com/trpc', // This would be your actual API URL
        headers: () => {
          const { token } = useSession.getState();
          return {
            authorization: token ? `Bearer ${token}` : '',
          };
        },
      }),
    ],
  });
};
*/

