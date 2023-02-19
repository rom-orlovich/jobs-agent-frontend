import { UserOptions } from '@/lib/user';
import { useSession } from 'next-auth/react';

import useSwr from 'swr';
function useUser() {
  const { data: userSession } = useSession();
  const { data: userData } = useSwr<{ data: UserOptions }>(`/api/users/${userSession?.user.id}`);
  return {
    user: userData?.data
  };
}

export default useUser;
