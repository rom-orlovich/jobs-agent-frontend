import React, { PropsWithChildren, ReactNode } from 'react';
import Dashboard from './Dashboard/Dashboard';

import { ReturnTypeUseAuthProfileExist } from '@/hooks/useAuth';

import AuthContext from '@/context/AuthContext';
import Main from './Main/Main';

export type ChildrenWithAuthData = { children: (props: ReturnTypeUseAuthProfileExist) => ReactNode };

export function Layout(props: PropsWithChildren) {
  return (
    <Main>
      <AuthContext>
        <Dashboard>{props.children}</Dashboard>
      </AuthContext>
    </Main>
  );
}

export default Layout;
