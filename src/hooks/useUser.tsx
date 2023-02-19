import { UserOptions } from '@/lib/user';
import { useSession } from 'next-auth/react';

import useSwr from 'swr';
function useUser() {
  const { data: userSession } = useSession();
  const { data: userDB } = useSwr<{ data: UserOptions }>(`/api/users/${userSession?.user.id}`);

  return {
    user: userDB?.data
  };
}

export default useUser;
