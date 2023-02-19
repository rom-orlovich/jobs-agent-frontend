import { useSession, signIn, signOut } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

function Layout({ children }: PropsWithChildren) {
  const { status } = useSession({
    required: true
  });
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

  return status === 'authenticated' ? userIsLoginLayout : userNotLoginLayout;
}

export default Layout;
