import React, { PropsWithChildren, ReactNode } from 'react';
import Dashboard from './Dashbord/Dashboard';
const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin']
});
import { Roboto } from '@next/font/google';
import useAuth, { ReturnTypeUseAuthProfileExist } from '@/hooks/useAuth';
import Spinner from '../Spinner/Spinner';
import AuthContext from '@/context/AuthContext';
export type ChildrenWithAuthData = { children: (props: ReturnTypeUseAuthProfileExist) => ReactNode };

export function Layout(props: PropsWithChildren) {
  const auth = useAuth();
  const Main = ({ children }: PropsWithChildren) => (
    <main className={roboto.className + ' ' + 'bg-background' + ' min-h-[100vh]'}>{children}</main>
  );
  const { isAuthenticated, userProfileData, isLoading } = auth;
  if (!isAuthenticated) return <></>;
  if (!userProfileData)
    return (
      <Main>
        <Spinner isLoading={isLoading || !userProfileData} />;
      </Main>
    );
  const authData = {
    ...auth,
    userProfileData
  };
  return (
    <Main>
      <AuthContext authData={authData}>
        <Dashboard>{props.children}</Dashboard>
      </AuthContext>
    </Main>
  );
}

export default Layout;
