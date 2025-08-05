import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';
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

// Define AppRouter type interface (this would come from your backend)
interface AppRouter {
  // This would be defined by your tRPC backend
  project: {
    list: {
      input: void;
      output: Project[];
    };
    create: {
      input: CreateProjectInput;
      output: Project;
    };
    byId: {
      input: { id: string };
      output: Project | null;
    };
  };
  auth: {
    login: {
      input: LoginInput;
      output: AuthResponse;
    };
  };
  chat: {
    sendMessage: {
      input: ChatMessage;
      output: ChatResponse;
    };
  };
}

// Create tRPC React hooks with proper typing
export const trpc = createTRPCReact<AppRouter>();

// tRPC client configuration
export const createTRPCClient = () => {
  const apiUrl = 'http://localhost:3000/trpc'; // Default to localhost for development
    
  return trpc.createClient({
    links: [
      httpBatchLink({
        url: apiUrl,
        headers: () => {
          // For now, return empty headers. In production, add auth token
          return {};
          // const { token } = useSession.getState();
          // return {
          //   authorization: token ? `Bearer ${token}` : '',
          // };
        },
      }),
    ],
  });
};

