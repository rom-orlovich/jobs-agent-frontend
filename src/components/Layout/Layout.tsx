import { useSession, signIn, signOut } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  const { data } = useSession();
  const userIsLoginLayout = (
    <>
      <header>{<button onClick={() => signOut()}>Logout</button>}</header> {children}
    </>
  );

  const userNotLoginLayout = (
    <>
      <header> {<button onClick={() => signIn()}>Login</button>} </header>
    </>
  );

  return data?.user ? userIsLoginLayout : userNotLoginLayout;
}

export default Layout;
