import React, { PropsWithChildren, ReactNode } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Dashboard from './Dashboard/Dashboard';

import { ReturnTypeUseAuthProfileExist } from '@/hooks/useAuth';

import AuthContext from '@/context/AuthContext';
import Main from './Main/Main';
import ScannerContext from '@/context/ScannerContext';

import { ReturnTypeGetInitialUserProfile } from '@/lib/getInitialUserProfile';

export type ChildrenWithAuthData = { children: (props: ReturnTypeUseAuthProfileExist) => ReactNode };

export function Layout(props: PropsWithChildren & ReturnTypeGetInitialUserProfile) {
  return (
    <Main>
      <AuthContext data={props.data}>
        <ScannerContext>
          <Dashboard>{props.children}</Dashboard>
        </ScannerContext>
      </AuthContext>
      <Analytics />
    </Main>
  );
}

export default Layout;
