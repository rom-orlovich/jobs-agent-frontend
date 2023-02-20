import { API_ENDPOINTS } from '@/lib/endpoints';
import { UserOptions } from '@/lib/user.types';
import { useSession } from 'next-auth/react';

import useSwr from 'swr';
function useUser() {
  const { data: userSession } = useSession();
  const { data: userDB } = useSwr<{ data: UserOptions }>(
    `/${API_ENDPOINTS.USERS}/${userSession?.user.id}`
  );
  console.log(userDB?.data);
  return {
    user: userDB?.data
  };
}

export default useUser;
