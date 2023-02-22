import { useSession } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';
import Navbar from './Navabar/Navbar';

function Layout({ children }: PropsWithChildren) {
  const { status } = useSession({
    required: true
  });
  const isAuthenticated = status === 'authenticated';
  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      {isAuthenticated && children}
    </>
  );
}

export default Layout;
