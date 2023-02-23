import { useSession } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';
import Dashboard from './Dashbord/Dashboard';
// import Navbar from './Navabar/Navbar';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin']
});
import { Roboto } from '@next/font/google';

function Layout({ children }: PropsWithChildren) {
  const { status } = useSession({
    required: true
  });

  const isAuthenticated = status === 'authenticated';
  return (
    <main className={roboto.className + ' ' + 'bg-background'}>
      {/* <Navbar isAuthenticated={isAuthenticated} /> */}

      <Dashboard isAuthenticated={isAuthenticated}> {children} </Dashboard>
    </main>
  );
}

export default Layout;
