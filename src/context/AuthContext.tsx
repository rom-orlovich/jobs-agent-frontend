import Spinner from '@/components/Spinner/Spinner';
import useAuth, { ReturnTypeUseAuthProfileExist } from '@/hooks/useAuth';
import React, { createContext, PropsWithChildren, useContext } from 'react';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin']
});
import { Roboto } from '@next/font/google';

export const context = createContext({} as ReturnTypeUseAuthProfileExist);

//Create the auth provider.
function AuthContext(props: PropsWithChildren) {
  const auth = useAuth();
  const Main = ({ children }: PropsWithChildren) => (
    <main className={roboto.className + ' ' + 'bg-background' + ' min-h-[100vh]'}>{children}</main>
  );
  const { isAuthenticated, isLoading, isValidating } = auth;

  if (!isAuthenticated) return <></>;
  if (isLoading || isValidating)
    return (
      <Main>
        <Spinner isLoading={isLoading || isValidating} />;
      </Main>
    );

  return (
    <Main>
      <context.Provider value={auth}>{props.children}</context.Provider>;
    </Main>
  );
}

/**
 *
 * @returns get the context of AuthContext that provides the current login user data.
 */
export function useAuthContext() {
  return useContext(context);
}

export default AuthContext;
