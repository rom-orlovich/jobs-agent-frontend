import React, { PropsWithChildren } from 'react';
import Dashboard from './Dashbord/Dashboard';
// import Navbar from './Navabar/Navbar';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin']
});
import { Roboto } from '@next/font/google';
import useAuth from '@/hooks/useAuth';

function Layout({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();
  return (
    <main className={roboto.className + ' ' + 'bg-background p-8'}>
      {/* <Navbar isAuthenticated={isAuthenticated} /> */}

      <Dashboard isAuthenticated={isAuthenticated}> {children} </Dashboard>
    </main>
  );
}

export default Layout;
