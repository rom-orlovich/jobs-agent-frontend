// import Spinner from '@/components/Spinner/Spinner';
import useAuth, { ReturnTypeUseAuthProfileExist } from '@/hooks/useAuth';

import { ReturnTypeGetInitialUserProfile } from '@/lib/getInitialUserProfile';

import React, { createContext, PropsWithChildren, useContext } from 'react';

export const context = createContext({} as ReturnTypeUseAuthProfileExist);

//Create the auth provider.
function AuthContext({
  children,
  ...initialUserProfile
}: PropsWithChildren & ReturnTypeGetInitialUserProfile) {
  const auth = useAuth(initialUserProfile); // Pass the initial userProfile data.

  const {
    isAuthenticated
    // isLoading, isValidating
  } = auth;

  if (!isAuthenticated) return <></>;
  // if (isLoading || isValidating) return <Spinner isLoading={isLoading || isValidating} />;

  return <context.Provider value={auth}>{children}</context.Provider>;
}

/**
 *
 * @returns get the context of AuthContext that provides the current login user data.
 */
export function useAuthContext() {
  return useContext(context);
}

export default AuthContext;
