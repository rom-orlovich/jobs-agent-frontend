import { useSession } from 'next-auth/react';
export default function useAuth() {
  const { data, status } = useSession({
    required: true
  });

  return {
    isAuthenticated: status === 'authenticated',
    ...data
  };
}
